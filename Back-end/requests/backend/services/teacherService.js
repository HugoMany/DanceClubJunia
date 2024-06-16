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
          return reject(new Error("Erreur lors de la récupération de l'élève."));
        }
        if (result.length === 0) {
          return reject(new Error("Aucun élève trouvé avec cet ID."));
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

      console.log("newStudent service | firstname, surname, email, password, connectionMethod, credit : " + firstname + ", " + surname + ", " + email + ", " + password + ", " + connectionMethod + ", " + credit + ", " + photo);
      db.query(sql, [firstname, surname, email, password, connectionMethod, credit, photo], (err, result) => {
        if (err) {
          return reject(new Error("Erreur lors de la création de l'élève."));
        }

        // Récupérer l'ID de l'utilisateur nouvellement inséré
        const newUserID = result.insertId;

        // Sélectionner les informations complètes de l'utilisateur nouvellement inséré
        const selectSql = 'SELECT userID, firstname, surname, email, connectionMethod, credit, tickets, subscriptionEnd, photo FROM Users WHERE userID = ?';
        db.query(selectSql, [newUserID], (err, rows) => {
          if (err) {
            return reject(new Error("Erreur lors de la récupération de l'élève."));
          }
          if (rows.length == 0) {
            return reject(new Error("L'utilisateur n'existe pas"));
          }

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
        WHERE userID = ? AND userType = 'student'
      `;

      db.query(sql, values, (err, result) => {
        if (err) {
          return reject(new Error("Erreur lors de la modification de l'élève."));
        }
        if (result.affectedRows == 0) {
          return reject(new Error("Il n'existe pas d'élève avec cet ID."));
        }
        const selectSql = 'SELECT userID, firstname, surname, email, connectionMethod, credit, tickets, subscriptionEnd, photo FROM Users WHERE userID = ?';
        db.query(selectSql, [studentID], (err, rows) => {
          if (err) {
            return reject(new Error("Erreur lors de la récupération de l'élève."));
          }

          resolve(rows);
        });
      });
    });
  }

  async removeStudent(userID, courseID, studentID) {
    return new Promise((resolve, reject) => {
      const selectSql = 'SELECT studentsID FROM Courses WHERE courseID = ?';
      db.query(selectSql, [courseID], (err, rows) => {
        if (err) {
          return reject(new Error("Erreur lors de la récupération des élèves du cours."));
        }
        if (rows.length == 0) {
          return reject(new Error("Le cours n'existe pas."));
        }

        let studentsID = [];
        if (rows.length > 0) {
          studentsID = JSON.parse(rows[0].studentsID);
        }

        // Retirer l'étudiant de la liste
        const index = studentsID.indexOf(parseInt(studentID));
        if (index == -1) {
          return reject(new Error("Erreur lors de la récupération de l'élève."));
        }

        studentsID.splice(index, 1);

        // Mettre à jour la liste des étudiants dans la base de données
        const updateSql = 'UPDATE Courses SET studentsID = ? WHERE courseID = ?';
        const updatedStudentsID = JSON.stringify(studentsID);
        db.query(updateSql, [updatedStudentsID, courseID], (err, result) => {
          if (err || result.affectedRows == 0) {
            return reject(new Error("Erreur lors de la modification du cours."));
          }

          resolve(result);
        });
      });
    });
  }

  async affectStudent(teacherID, studentID, courseID) {
    return new Promise((resolve, reject) => {
      const selectSql = 'SELECT studentsID, teachersID FROM Courses WHERE courseID = ?';
      db.query(selectSql, [courseID], (err, rows) => {
        if (err) {
          return reject(new Error("Erreur lors de la récupération des élèves et des professeurs."));
        }
        if (rows.length == 0) {
          return reject(new Error("Le cours n'existe pas."));
        }

        let studentsID = [];
        let teachersID = [];
        if (rows.length > 0) {
          studentsID = JSON.parse(rows[0].studentsID);
          teachersID = JSON.parse(rows[0].teachersID);
        }

        // Vérifier si le teacherID est dans la liste des teachersID
        if (!teachersID.includes(parseInt(teacherID))) {
          return reject(new Error('Le professeur n\'est pas autorisé à modifier ce cours.'));
        }

        // Vérifier si l'étudiant est déjà dans la liste
        if (studentsID.includes(parseInt(studentID))) {
          return reject(new Error("L'élève est déjà dans le cours."));
        }

        // Ajouter l'étudiant à la liste
        studentsID.push(parseInt(studentID));

        // Mettre à jour la liste des étudiants dans la base de données
        const updateSql = 'UPDATE Courses SET studentsID = ? WHERE courseID = ?';
        const updatedStudentsID = JSON.stringify(studentsID);
        db.query(updateSql, [updatedStudentsID, courseID], (err, result) => {
          if (err) {
            return reject(new Error("Erreur lors de la modification du cours."));
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
          return reject(new Error("Erreur lors de la récupération des élèves."));
        }
        if (results.length === 0) {
          return reject(new Error("Aucun élève trouvé."));
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
          return reject(new Error('Erreur lors de la suppression.'));
        }
        if (result.affectedRows === 0) {
          return reject(new Error("Le cours n'existe pas."));
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
          return reject(new Error("Erreur lors de la récupération du nombre d'élèves."));
        }
        const teacherPlaces = rows[0].teacherPlaces > 0 ? rows[0].teacherPlaces : 0;
        resolve(teacherPlaces);
      });
    });
  }

  async modifyCourse(teacherID, courseID, values, fieldsToUpdate, teachers, students, links, tags) {
    return new Promise((resolve, reject) => {
      const verifyTeacherSql = 'SELECT COUNT(*) AS count FROM Courses WHERE courseID = ? AND JSON_CONTAINS(teachersID, CAST(? AS JSON))';
      db.query(verifyTeacherSql, [courseID, teacherID], (err, rows) => {
        if (err) {
          return reject(new Error("La récupération du nombre de cours du professeur a échoué."));
        }

        // Vérifier si le teacherID est autorisé à modifier ce cours
        if (rows[0].count === 0) {
          return reject(new Error("Le professeur n'est pas autorisé à modifier ce cours."));
        }

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
                return reject(new Error("La modification du cours a échoué."));
              }
              // Si la mise à jour a réussi, récupérer les informations mises à jour du cours
              if (result.affectedRows == 0) {
                return reject(new Error("Le cours n'existe pas."));
              }
              const selectSql = 'SELECT * FROM Courses WHERE courseID = ?';
              db.query(selectSql, [courseID], (err, rows) => {
                if (err) {
                  return reject(new Error("La récupération du cours a échoué."));
                }
                // Renvoyer la ligne mise à jour
                resolve(rows[0]);
              });
            });
          });
      })
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
          return reject(new Error("Erreur lors de la récupération des ID avec les emails fournis"));
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
          return reject(new Error("Erreur lors de la récupération des types d'utilisateurs."));
        }

        if (rows.length === 0) {
          return reject(new Error("Aucun utilisateur trouvé."));
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
              return reject(new Error("Erreur lors de la vérification de la présence du professeur dans le cours."));
            }

            if (result[0].count === 0) {
              return reject(new Error("Le professeur n'est pas dans le cours ou le cours n'existe pas."));
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
          return reject(new Error("L'utilisateur n'est pas un professeur ou un administrateur."));
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
          return reject(new Error("Erreur lors de la récupération du cours."));
        }

        if (rows.length === 0) {
          return reject(new Error("Cours non trouvé."));
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
            return reject(new Error("Erreur lors de la récupération de l'utilisateur."));
          }
          if (result.length == 0) {
            return reject(new Error("L'utilisateur n'a pas été trouvé."));
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
          return reject(new Error("Erreur lors de la récupération des prix."));
        }

        if (result.length == 0) {
          return reject(new Error("Le prix n'a pas été trouvé."));
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
                return reject(new Error("Erreur lors de l'ajout de ticket(s) à l'utilisateur."));
              }
              if (result.affectedRows === 0) {
                return reject(new Error("L'utilisateur n'existe pas."));
              }
              resolve(result);
            });
            break;
          case 'card':
            sql = 'INSERT INTO Cards (userID, number, maxNumber) VALUES (?, 0, ?)';
            db.query(sql, [studentID, number], (err, result) => {
              if (err) {
                return reject(new Error("Erreur lors de l'ajout de la carte à l'utilisateur."));
              }
              if (result.affectedRows === 0) {
                return reject(new Error("L'utilisateur n'existe pas."));
              }
              resolve(result);
            });
            break;
          case 'subscription':
            const days = number * 30; // Nombre de jours proportionnel au nombre de mois
            sql = 'UPDATE Users SET subscriptionEnd = DATE_ADD(subscriptionEnd, INTERVAL ? DAY) WHERE userID = ?';
            db.query(sql, [days, studentID], (err, result) => {
              if (err) {
                return reject(new Error("Erreur lors de la modification de la date de fin de l'abonnement de l'utilisateur."));
              }
              if (result.affectedRows === 0) {
                return reject(new Error("L'utilisateur n'existe pas."));
              }
              resolve(result);
            });
            break;
        }

        const paymentSql = "INSERT INTO Payments (userID, price, type, quantity, date, paymentType, sourceID) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, 'cash', ?);"
        db.query(paymentSql, [studentID, price, type, number, userID], (err, result) => {
          if (err) {
            return reject(new Error("Erreur lors de l'enregistrement du paiement."));
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
          return reject(new Error("Erreur lors de la récupération de l'utilisateur."));
        }

        if (result.length == 0) {
          return reject(new Error("L'utilisateur n'existe pas."));
        }

        userID = userID.toString();


        // Si c'est un étudiant
        if (result.length > 0 && result[0].userType == "student") {
          return reject(new Error("L'utilisateur est un élève."));
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
              return reject(new Error("Erreur lors de la vérification de la présence du professeur dans le cours."));
            }
            // Si le professeur n'est pas inscrit au cours
            if (result.length === 0 || result[0].isParticipant === 0) {
              return reject(new Error("Le professeur ou le cours n'existe pas."));
            }
            // Continuer le processus de suppression du lien
            proceedWithLinkRemoval();


          });
        }
        else if (result.length > 0 && result[0].userType == "admin") {
          proceedWithLinkRemoval();

        }
        else {
          return reject(new Error("userID ou userType invalide."));
        }



        function proceedWithLinkRemoval() {
          const selectSql = "SELECT links FROM Courses WHERE courseID = ? AND JSON_CONTAINS(links, ?, '$')";
          db.query(selectSql, [courseID, `"${link}"`], (err, rows) => {
            if (err) {
              return reject(new Error("Erreur lors de la récupération des liens du cours."));
            }
            if (rows.length === 0) {
              return reject(new Error("Ce cours n'existe pas ou ce lien n'est pas dans le cours."));
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
                  return reject(new Error("Erreur lors de la modification du cours."));
                }
                if (result.affectedRows == 0) {
                  return reject(new Error("Ce cours n'existe pas."));
                }


                resolve({ success: true, result });
              });
            } else {
              return reject(new Error("Le lien n'est pas contenu dans le cours."));
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
          return reject(new Error("Erreur lors de la récupération du type de l'utilisateur."));
        }

        if (result.length == 0) {
          return reject(new Error("L'utilisateur n'existe pas"));
        } 

        if (result[0].userType == "student") {
          return reject(new Error("Les élèves ne peuvent pas ajouter de tags aux cours."));
        }
        else if (result.length > 0 && result[0].userType == "teacher") {
          const checkTeacherSql = "SELECT JSON_CONTAINS(teachersID, ?) AS isParticipant FROM Courses WHERE courseID = ?";
          db.query(checkTeacherSql, [userID, courseID], (err, result) => {
            if (err) {
              return reject(new Error("Erreur lors de la vérification de la présence du professeur dans le cours."));
            }

            if (result.length == 0) {
              return reject(new Error("Le cours n'existe pas."));
            } 

            if (!result[0].isParticipant) {
              return reject(new Error("Le professeur n'est pas dans le cours."));
            }
            db.query(selectTagsSql, [courseID], (err, result) => {
              if (err) {
                return reject(new Error("Erreur lors de la récupération des tags du cours."));
              }

              if (result.length == 0) {
                return reject(new Error("Le cours n'existe pas."));
              } 

              const tags = JSON.parse(result[0].tags);
              if (tags.includes(tag)) {
                return reject(new Error("Le cours a déjà ce tag."));
              }
              else {
                db.query(updateTagSql, [tag, courseID], (err, result) => {
                  if (err) {
                    return reject(new Error("Erreur lors de l'ajout du tag."));
                  }
                  resolve(result);
                });
              }
            });
          });
        } else if (result.length > 0 && result[0].userType == "admin") { // Si l'utilisateur est un admin
          db.query(selectTagsSql, [courseID], (err, result) => {
            if (err) {
              return reject(new Error("Le lien n'est pas contenu dans le cours."));
            }

            const tags = JSON.parse(result[0].tags);
            if (tags.includes(tag)) {
              return resolve({ success: false, message: "Tag already exists for this course." });
            } else {
              db.query(updateTagSql, [tag, courseID], (err, result) => {
                if (err) {
                  return reject(new Error("Le lien n'est pas contenu dans le cours."));
                }
                resolve(result);
              });
            }
          });
        }
        else {
          return reject(new Error("Le lien n'est pas contenu dans le cours."));
        }
      });
    });
  }

  async removeTag(courseID, userID, tag) {
    return new Promise((resolve, reject) => {
      const checkUserTypeSql = "SELECT userType FROM Users WHERE userID = ?";
      db.query(checkUserTypeSql, [userID], (err, result) => {
        if (err) {
          return reject(new Error("Erreur lors de la récupération du type de l'utilisateur."));
        }

        if (result.length == 0) {
          return reject(new Error("L'utilisateur n'existe pas"));
        }

        userID = userID.toString();


        // Si c'est un étudiant
        if (result[0].userType == "student") {
          return reject(new Error('Les élèves ne peuvent pas ajouter de tags aux cours.'));
        }
        // On vérifie si c'est un professeur
        else if (result[0].userType == "teacher") {
          // SQL pour vérifier si le professeur est inscrit au cours
          const checkTeacherSql = `
          SELECT JSON_CONTAINS(teachersID, ?) AS isParticipant
          FROM Courses
          WHERE courseID = ?
          `;
          db.query(checkTeacherSql, [userID, courseID], (err, result) => {
            if (err) {
              return reject(new Error("Erreur lors de la vérification de la présence du professeur dans le cours."));
            }
            
            if (result.length == 0) {
              return reject(new Error("Le cours n'existe pas."));
            } 

            if (!result[0].isParticipant) {
              return reject(new Error("Le professeur n'est pas dans le cours."));
            }
            // Continuer le processus de suppression du lien
            proceedWithTagRemoval();


          });
        }
        else if (result[0].userType == "admin") {
          proceedWithTagRemoval();

        }
        else {
          return reject(new Error("UserType invalide."));
        }



        function proceedWithTagRemoval() {
          const selectSql = "SELECT tags FROM Courses WHERE courseID = ? AND JSON_CONTAINS(tags, ?, '$')";
          db.query(selectSql, [courseID, `"${tag}"`], (err, rows) => {
            if (err) {
              return reject(new Error("Erreur lors de la récupération des tags du cours."));
            }
            if (rows.length === 0) {
              return reject(new Error("Le cours n'existe pas."));
            }

            let tags = [];
            if (rows.length > 0) {
              tags = JSON.parse(rows[0].tags);
            }

            // Retirer le lien de la liste
            const index = tags.indexOf(tag);

            if (index == -1){
              return reject(new Error("Le cours n'a pas ce tag."));
            }
            tags.splice(index, 1);

            // Mettre à jour la liste des liens dans la base de données
            const updateSql = 'UPDATE Courses SET tags = ? WHERE courseID = ?';
            const updatedTags = JSON.stringify(tags);
            db.query(updateSql, [updatedTags, courseID], (err, result) => {
              if (err) {
                return reject(new Error("Erreur lors de la suppression du tag."));
              }
              if (result.affectedRows == 0) {
                return reject(new Error("Le cours n'existe pas."));
              }
              
              resolve({ success: true, result });
              });
          });
        }
      });
    });
  }
}

module.exports = new TeacherService();