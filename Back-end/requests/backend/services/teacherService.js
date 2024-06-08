const db = require('../config/database');

class TeacherService {
  async getStudent(studentID) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT userID, firstname, surname, email, connectionMethod, credit, tickets, subscriptionEnd, photo FROM Users 
        WHERE userID = ? AND userType = 'student'
      `;

      db.query(sql, [studentID], (err, result) => {
        if (err) {
          return reject(err);
        }
        if (result.length === 0) {
          return reject(new Error('No student found with the given ID'));
        }
        resolve(result);
      });
    });
  }

  async newStudent(firstname, surname, email, password, connectionMethod, credit, photo) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO Users (firstname, surname, email, password, connectionMethod, userType, credit, photo)
        VALUES (?, ?, ?, ?, ?, 'student', ?, ?)
      `;

      db.query(sql, [firstname, surname, email, password, connectionMethod, credit, photo], (err, result) => {
        if (err) {
          return reject(err);
        }

        // Récupérer l'ID de l'utilisateur nouvellement inséré
        const newUserID = result.insertId;

        // Sélectionner les informations complètes de l'utilisateur nouvellement inséré
        const selectSql = 'SELECT userID, firstname, surname, email, connectionMethod, credit, tickets, subscriptionEnd, photo FROM Users WHERE userID = ?';
        db.query(selectSql, [newUserID], (err, rows) => {
          if (err) {
            return reject(err);
          }

          // Renvoi de la ligne nouvellement insérée
          resolve(rows);
        });
      });
    });
  }

  async modifyStudent(studentID, values, fieldsToUpdate) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Users
        SET ${fieldsToUpdate.join(', ')}
        WHERE userID = ?
      `;

      db.query(sql, values, (err, result) => {
        if (err) {
          return reject(err);
        }

        // Si la mise à jour a réussi, récupérer les informations mises à jour de l'utilisateur
        if (result.affectedRows > 0) {
          const selectSql = 'SELECT userID, firstname, surname, email, connectionMethod, credit, tickets, subscriptionEnd, photo FROM Users WHERE userID = ?';
          db.query(selectSql, [studentID], (err, rows) => {
            if (err) {
              return reject(err);
            }

            // Renvoi de la ligne mise à jour
            resolve(rows);
          });
        } else {
          return reject(err);
        }
      });
    });
  }

  async removeStudent(userID, courseID, studentID) {
    return new Promise((resolve, reject) => {
        // Vérification du userType de l'utilisateur
        const checkUserTypeSql = `
            SELECT userType
            FROM Users
            WHERE userID = ?
        `;

        db.query(checkUserTypeSql, [userID], (err, rows) => {
            if (err) {
                return reject(err);
            }

            if (rows.length === 0) {
                return reject(new Error('Utilisateur non trouvé.'));
            }

            const userType = rows[0].userType;

            // Si l'utilisateur est un enseignant, vérifier qu'il est dans teachersID du cours
            if (userType === 'teacher') {
                const checkTeacherSql = `
                    SELECT COUNT(*) AS count
                    FROM Courses
                    WHERE courseID = ? AND JSON_CONTAINS(teachersID, CAST(? AS JSON))
                `;

                db.query(checkTeacherSql, [courseID, JSON.stringify(userID)], (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    if (result[0].count === 0) {
                        return reject(new Error("Vous n'êtes pas autorisé à retirer des étudiants de ce cours."));
                    }

                    // Retirer l'étudiant après la vérification
                    this.executeRemoveStudent(courseID, studentID)
                        .then(resolve)
                        .catch(reject);
                });
            } else {
                // Si l'utilisateur est un admin, retirer directement l'étudiant
                this.executeRemoveStudent(courseID, studentID)
                    .then(resolve)
                    .catch(reject);
            }
        });
    });
  }

  executeRemoveStudent(courseID, studentID) {
      return new Promise((resolve, reject) => {
          const selectSql = 'SELECT studentsID FROM Courses WHERE courseID = ?';
          db.query(selectSql, [courseID], (err, rows) => {
              if (err) {
                  return reject(err);
              }

              let studentsID = [];
              if (rows.length > 0) {
                  studentsID = JSON.parse(rows[0].studentsID);
              }

              // Retirer l'étudiant de la liste
              const index = studentsID.indexOf(parseInt(studentID));

              if (index !== -1) {
                  studentsID.splice(index, 1);

                  // Mettre à jour la liste des étudiants dans la base de données
                  const updateSql = 'UPDATE Courses SET studentsID = ? WHERE courseID = ?';
                  const updatedStudentsID = JSON.stringify(studentsID);
                  db.query(updateSql, [updatedStudentsID, courseID], (err, result) => {
                      if (err) {
                          return reject(err);
                      }
                      resolve(result);
                  });
              } else {
                  return reject(new Error('Etudiant non trouvé dans ce cours.'));
              }
          });
      });
  }


  async affectStudent(teacherID, studentID, courseID) {
    return new Promise((resolve, reject) => {
      const selectSql = 'SELECT studentsID, teachersID FROM Courses WHERE courseID = ?';
      db.query(selectSql, [courseID], (err, rows) => {
        if (err) {
          return reject(err);
        }

        let studentsID = [];
        let teachersID = [];
        if (rows.length > 0) {
          studentsID = JSON.parse(rows[0].studentsID);
          teachersID = JSON.parse(rows[0].teachersID);
        }

        // Vérifier si le teacherID est dans la liste des teachersID
        if (!teachersID.includes(parseInt(teacherID))) {
          return reject(new Error('Le professeur n\'est pas autorisé à modifier ce cours'));
        }

        // Vérifier si l'étudiant est déjà dans la liste
        if (studentsID.includes(parseInt(studentID))) {
          return reject(err);
        }

        // Ajouter l'étudiant à la liste
        studentsID.push(parseInt(studentID));

        // Mettre à jour la liste des étudiants dans la base de données
        const updateSql = 'UPDATE Courses SET studentsID = ? WHERE courseID = ?';
        const updatedStudentsID = JSON.stringify(studentsID);
        db.query(updateSql, [updatedStudentsID, courseID], (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    });
  }

  async searchStudent(firstname = null, surname = null, email = null) {
    return new Promise((resolve, reject) => {
      let conditions = [];
      let values = [];

      if (firstname) {
        conditions.push('firstname LIKE ?');
        values.push(`%${firstname}%`);
      }
      if (surname) {
        conditions.push('surname LIKE ?');
        values.push(`%${surname}%`);
      }
      if (email) {
        conditions.push('email LIKE ?');
        values.push(`%${email}%`);
      }

      if (conditions.length === 0) {
        return reject(new Error('Au moins un critère de recherche doit être fourni.'));
      }

      const whereClause = conditions.join(' AND ');
      const sql = `
            SELECT userID, firstname, surname, email, connectionMethod, credit, tickets, subscriptionEnd, photo 
            FROM Users 
            WHERE ${whereClause}
        `;

      db.query(sql, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.length === 0) {
          return resolve(false);
        }
        resolve(results);
      });
    });
  }

  async cancelCourse(courseID, teacherID) {
    return new Promise((resolve, reject) => {
      const selectSql = 'DELETE FROM Courses WHERE startDate > CURRENT_DATE AND courseID = ? AND JSON_CONTAINS(teachersID, CAST(? AS JSON));';
      db.query(selectSql, [courseID, teacherID], (err, result) => {
        if (err) {
          return reject(err);
        }
        if (result.affectedRows === 0) {
          return reject(new Error('No courses found or course already started'));
        }
        resolve(result);
      });
    })
  }

  async getTeacherPlaces(teacherID, startDate, endDate) {
    return new Promise((resolve, reject) => {
      const selectSql = 'SELECT SUM(JSON_LENGTH(studentsID)) AS teacherPlaces FROM Courses WHERE JSON_CONTAINS(teachersID, ?) AND startDate BETWEEN ? AND ?';
      db.query(selectSql, [teacherID, startDate, endDate], (err, rows) => {
        if (err) {
          return reject(err);
        }
        const teacherPlaces = rows[0].teacherPlaces > 0 ? rows[0].teacherPlaces : 0;
        console.log("getTeacherPlaces : ", teacherPlaces);
        resolve(teacherPlaces);
      });
    });
  }

  async modifyCourse(teacherID, courseID, values, fieldsToUpdate, teachers, students, links, tags) {
    return new Promise((resolve, reject) => {
      // Vérifier si le teacherID fait partie des teachersID du cours
      const verifyTeacherSql = 'SELECT COUNT(*) AS count FROM Courses WHERE courseID = ? AND JSON_CONTAINS(teachersID, CAST(? AS JSON))';
      db.query(verifyTeacherSql, [courseID, teacherID], (err, rows) => {
        if (err) {
          return reject(err);
        }

        const checkUserTypeSql = "SELECT userType FROM Users WHERE userID = ?";
        db.query(checkUserTypeSql, [teacherID], (err, result) => {
          if (err) {
            return reject(err);
          }
          if(result.length == 0) {
            return reject(new Error("L'utilisateur n'existe pas"));
          }

          // Si c'est un admin ou un teacher valide
          if (rows[0].count > 0 || result[0].userType == "admin") {
            // Obtenez les IDs des étudiants et des professeurs à partir des adresses e-mail fournies
            Promise.all([
              this.getUserIDsByEmails(students),
              this.getUserIDsByEmails(teachers)
            ])
              .then(([studentIDs, teacherIDs]) => {
                // Ajouter les studentIDs et teacherIDs aux valeurs de la requête
                if (studentIDs) {
                  fieldsToUpdate.push("studentsID = ?");
                  values.push(JSON.stringify(studentIDs));
                }
                if (teacherIDs) {
                  fieldsToUpdate.push("teachersID = ?");
                  values.push(JSON.stringify(teacherIDs));
                }

                // Convertir les listes links et tags en chaînes JSON
                if (links && links.length > 0) {
                  fieldsToUpdate.push("links = ?");
                  values.push(JSON.stringify(links));
                }
                if (tags && tags.length > 0) {
                  const tagArray = tags.split(',').map(tag => tag.trim());
                  fieldsToUpdate.push("tags = ?");
                  values.push(JSON.stringify(tagArray));
                }

                // Mettre à jour le cours
                const sql = `
                  UPDATE Courses
                  SET ${fieldsToUpdate.join(', ')}
                  WHERE courseID = ?
              `;

                const queryValues = [...values, courseID];
                db.query(sql, queryValues, (err, result) => {
                  if (err) {
                    return reject(err);
                  }
                  console.log("modifyCourse result : ", result);
                  // Si la mise à jour a réussi, récupérer les informations mises à jour du cours
                  if (result.affectedRows > 0) {
                    const selectSql = 'SELECT * FROM Courses WHERE courseID = ?';
                    db.query(selectSql, [courseID], (err, rows) => {
                      if (err) {
                        return reject(err);
                      }

                      // Renvoyer la ligne mise à jour
                      resolve(rows[0]);
                    });
                  } else {
                    return reject(new Error('La mise à jour du cours a échoué.'));
                  }
                });
              })
              .catch(reject);
          }
          else {
            return reject(new Error('Vous n\'êtes pas autorisé à modifier ce cours.'));
          }
        });





      });
    });
  }

  async getUserIDsByEmails(emails) {
    return new Promise((resolve, reject) => {
      if (!emails) {
        return resolve();
      }
      // Sélectionner les IDs correspondant aux adresses e-mail fournies
      const selectSql = 'SELECT userID FROM Users WHERE email IN (?)';
      db.query(selectSql, [emails], (err, rows) => {
        if (err) {
          return reject(err);
        }

        // Extraire les IDs des résultats
        const ids = rows.map(row => row.userID);

        resolve(ids);
      });
    });
  }

  async getStudentsInCourse(userID, courseID) {
    return new Promise((resolve, reject) => {
        // Vérification du rôle de l'utilisateur
        const checkUserTypeSql = `
            SELECT userType
            FROM Users
            WHERE userID = ?
        `;

        db.query(checkUserTypeSql, [userID], (err, rows) => {
            if (err) {
                return reject(err);
            }

            if (rows.length === 0) {
                return reject(new Error('Utilisateur non trouvé.'));
            }

            const userType = rows[0].userType;

            // Si l'utilisateur est un enseignant, vérifier qu'il est dans teachersID du cours
            if (userType === 'teacher') {
                const checkTeacherSql = `
                    SELECT COUNT(*) AS count
                    FROM Courses
                    WHERE courseID = ? AND JSON_CONTAINS(teachersID, CAST(? AS JSON))
                `;

                db.query(checkTeacherSql, [courseID, JSON.stringify(userID)], (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    if (result[0].count === 0) {
                        return reject(new Error('Vous n\'êtes pas autorisé à accéder à cette information.'));
                    }

                    // Récupérer les étudiants après la vérification
                    this.fetchStudents(courseID)
                        .then(resolve)
                        .catch(reject);
                });
            } else if (userType === 'admin') {
                // Si l'utilisateur est un admin, récupérer directement les étudiants
                this.fetchStudents(courseID)
                    .then(resolve)
                    .catch(reject);
            }
            else {
              return reject(err);
            }
        });
    });
}

fetchStudents(courseID) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT studentsID
            FROM Courses
            WHERE courseID = ?
        `;

        db.query(sql, [courseID], (err, rows) => {
            if (err) {
                return reject(err);
            }

            if (rows.length === 0) {
                return reject(new Error('Cours non trouvé.'));
            }

            const studentsID = JSON.parse(rows[0].studentsID);

            if (studentsID.length === 0) {
                return resolve([]);
            }

            const getStudentsSql = `
                SELECT userID, firstname, surname, email, connectionMethod, photo, description
                FROM Users
                WHERE userID IN (?)
            `;

            db.query(getStudentsSql, [studentsID], (err, students) => {
                if (err) {
                    return reject(err);
                }

                resolve(students);
            });
        });
    });
}

async addPlaceStudent(userID, studentID, type, number) {
  return new Promise((resolve, reject) => {
    let priceQuery;
    if (type === "card") {
      priceQuery = 'SELECT price FROM Places WHERE type = ? AND number = ?';
    } else {
      priceQuery = 'SELECT price FROM Places WHERE type = ?';
    }

    // Récupération du prix
    db.query(priceQuery, [type, number], (err, result) => {
      if (err) {
        return reject(err);
      }

      if (result.length == 0) {
        return reject(new Error('Place not found'));
      }

      let price = result[0].price;
      if (type !== "card") {
        price *= number; // Prix proportionnel au nombre de tickets ou de mois d'abonnement achetés
      }

      let sql;
      switch (type) {
        case 'ticket':
          sql = 'UPDATE Users SET tickets = tickets + ? WHERE userID = ?';
          db.query(sql, [number, studentID], (err, result) => {
            if (err) {
              return reject(err);
            }
            if (result.affectedRows === 0) {
              return reject(new Error('StudentID does not exist'));
            }
            resolve(result);
          });
          break;
        case 'card':
          sql = 'INSERT INTO Cards (userID, number, maxNumber) VALUES (?, 0, ?)';
          db.query(sql, [studentID, number], (err, result) => {
            if (err) {
              return reject(err);
            }
            if (result.affectedRows === 0) {
              return reject(new Error('User does not exist'));
            }
            resolve(result);
          });
          break;
        case 'subscription':
          const days = number * 30; // Nombre de jours proportionnel au nombre de mois
          sql = 'UPDATE Users SET subscriptionEnd = DATE_ADD(subscriptionEnd, INTERVAL ? DAY) WHERE userID = ?';
          db.query(sql, [days, studentID], (err, result) => {
            if (err) {
              return reject(err);
            }
            if (result.affectedRows === 0) {
              return reject(new Error('User does not exist'));
            }
            resolve(result);
          });
          break;
      }

      const paymentSql = "INSERT INTO Payments (userID, price, type, quantity, date, paymentType, sourceID) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, 'cash', ?);"
      db.query(paymentSql, [studentID, price, type, number, userID], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  });
}

async removeLink(courseID, userID, link) {
  return new Promise((resolve, reject) => {
      const checkUserTypeSql = "SELECT userType FROM Users WHERE userID = ?";
      db.query(checkUserTypeSql, [userID], (err, result) => {
          if (err) {
              return reject(err);
          }

          if(result.length == 0) {
              return reject(new Error("This userID doesn't exist"));
          }

          userID = userID.toString();
          

          // Si c'est un étudiant
          if (result.length > 0 && result[0].userType == "student") {
              return reject(new Error('User is a student'));
          } 
          // On vérifie si c'est un professeur
          else if (result.length > 0 && result[0].userType == "teacher") {
              // SQL pour vérifier si le professeur est inscrit au cours
              const checkTeacherSql = `
              SELECT JSON_CONTAINS(teachersID, ?) AS isParticipant
              FROM Courses
              WHERE courseID = ?
              `;
              db.query(checkTeacherSql, [userID, courseID], (err, result) => {
                  if (err) {
                      return reject(err);
                  }
                  // Si le professeur n'est pas inscrit au cours
                  if (result.length === 0 || result[0].isParticipant === 0) {

                      return reject(new Error("Erreur : teacher or course doesn't exist"));
                  }
                  // Continuer le processus de suppression du lien
                  proceedWithLinkRemoval();

                  
              });
          } 
          else if (result.length > 0 && result[0].userType == "admin") {
              proceedWithLinkRemoval();

          } 
          else {
              return reject(new Error("UserID invalid or course doesn't exist"));
          }

          

          function proceedWithLinkRemoval() {
              const selectSql = "SELECT links FROM Courses WHERE courseID = ? AND JSON_CONTAINS(links, ?, '$')";
              db.query(selectSql, [courseID, `"${link}"`], (err, rows) => {
                  if (err) {
                      return reject(err);
                  }
                  if (rows.length === 0) {
                      return reject(new Error('Invalid parameters or link not found'));
                  }

                  let links = [];
                  if (rows.length > 0) {
                      links = JSON.parse(rows[0].links);
                  }

                  // Retirer le lien de la liste
                  const index = links.indexOf(link);

                  if (index !== -1) {
                      links.splice(index, 1);

                      // Mettre à jour la liste des liens dans la base de données
                      const updateSql = 'UPDATE Courses SET links = ? WHERE courseID = ?';
                      const updatedLinks = JSON.stringify(links);
                      db.query(updateSql, [updatedLinks, courseID], (err, result) => {
                          if (err) {
                              return reject(err);
                          }
                          if(result.affectedRows == 0) {
                              return reject(new Error("This course doesn't exist"));
                          }


                          resolve({ success: true, result });
                      });
                  } else {
                      return reject(new Error('Link not found in the course'));
                  }
              });
          }
      });
  });
}

async addTag(userID, courseID, tag) {
return new Promise(async (resolve, reject) => {
    const checkUserTypeSql = "SELECT userType FROM Users WHERE userID = ?";
    const selectTagsSql = "SELECT tags FROM Courses WHERE courseID = ?";
    const updateTagSql = "UPDATE Courses SET tags = JSON_ARRAY_APPEND(tags, '$', ?) WHERE courseID = ?";

    db.query(checkUserTypeSql, [userID], (err, result) => {
        userID = userID.toString();
        if (err) {
            return reject(err);
        }

        if (result.length > 0 && result[0].userType == "student") {
            return reject(new Error("Students are not allowed to add tags to courses."));
        } else if (result.length > 0 && result[0].userType == "teacher") {
            const checkTeacherSql = "SELECT JSON_CONTAINS(teachersID, ?) AS isParticipant FROM Courses WHERE courseID = ?";
            db.query(checkTeacherSql, [userID, courseID], (err, result) => {
                if (err) {
                    return reject(err);
                }

                if (result.length > 0 && result[0].isParticipant) {
                    db.query(selectTagsSql, [courseID], (err, result) => {
                        if (err) {
                            return reject(err);
                        }

                        const tags = JSON.parse(result[0].tags);
                        if (tags.includes(tag)) {
                            return resolve({ success: false, message: "Tag already exists for this course." });
                        } else {
                            db.query(updateTagSql, [tag, courseID], (err, result) => {
                                if (err) {
                                    return reject(err);
                                }
                                resolve(result);
                            });
                        }
                    });
                } else {
                    return resolve({ success: false, message: "Teacher not enrolled in course" });
                }
            });
        } else if (result.length > 0 && result[0].userType == "admin") { // Si l'utilisateur est un admin
            db.query(selectTagsSql, [courseID], (err, result) => {
                if (err) {
                    return reject(err);
                }

                const tags = JSON.parse(result[0].tags);
                if (tags.includes(tag)) {
                    return resolve({ success: false, message: "Tag already exists for this course." });
                } else {
                    db.query(updateTagSql, [tag, courseID], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(result);
                    });
                }
            });
        }
        else {
          return reject(err);
        }
    });
});
}

async removeTag(courseID, userID, tag) {
return new Promise((resolve, reject) => {
  const checkUserTypeSql = "SELECT userType FROM Users WHERE userID = ?";
  db.query(checkUserTypeSql, [userID], (err, result) => {
      if (err) {
          return reject(err);
      }

      if(result.length == 0) {
          return reject(new Error("This userID doesn't exist"));
      }

      userID = userID.toString();
      

      // Si c'est un étudiant
      if (result.length > 0 && result[0].userType == "student") {
          return reject(new Error('User is a student'));
      } 
      // On vérifie si c'est un professeur
      else if (result.length > 0 && result[0].userType == "teacher") {
          // SQL pour vérifier si le professeur est inscrit au cours
          const checkTeacherSql = `
          SELECT JSON_CONTAINS(teachersID, ?) AS isParticipant
          FROM Courses
          WHERE courseID = ?
          `;
          db.query(checkTeacherSql, [userID, courseID], (err, result) => {
              if (err) {
                  return reject(err);
              }
              // Si le professeur n'est pas inscrit au cours
              if (result.length === 0 || result[0].isParticipant === 0) {
                  return reject(new Error("Erreur : teacher or course doesn't exist"));
              }
              // Continuer le processus de suppression du lien
              proceedWithTagRemoval();

              
          });
      } 
      else if (result.length > 0 && result[0].userType == "admin") {
          proceedWithTagRemoval();

      } 
      else {
          return reject(new Error("UserID invalid or course doesn't exist"));
      }

      

      function proceedWithTagRemoval() {
          const selectSql = "SELECT tags FROM Courses WHERE courseID = ? AND JSON_CONTAINS(tags, ?, '$')";
          db.query(selectSql, [courseID, `"${tag}"`], (err, rows) => {
              if (err) {
                  return reject(err);
              }
              if (rows.length === 0) {
                  return reject(new Error('Invalid parameters or tag not found'));
              }

              let tags = [];
              if (rows.length > 0) {
                tags = JSON.parse(rows[0].tags);
              }

              // Retirer le lien de la liste
              const index = tags.indexOf(tag);

              if (index !== -1) {
                tags.splice(index, 1);

                  // Mettre à jour la liste des liens dans la base de données
                  const updateSql = 'UPDATE Courses SET tags = ? WHERE courseID = ?';
                  const updatedTags = JSON.stringify(tags);
                  db.query(updateSql, [updatedTags, courseID], (err, result) => {
                      if (err) {
                          return reject(err);
                      }
                      if(result.affectedRows == 0) {
                          return reject(new Error("This course doesn't exist"));
                      }


                      resolve({ success: true, result });
                  });
              } else {
                  return reject(new Error('Tag not found in the course'));
              }
          });
      }
  });
});
}


}




module.exports = new TeacherService();