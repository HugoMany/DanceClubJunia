const db = require('../config/database');

class TeacherService {
  async getStudent(studentID) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT userID, firstname, surname, email, connectionMethod, credit, tickets, subscriptionEnd FROM Users 
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

  async newStudent(firstname, surname, email, password, connectionMethod, credit) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO Users (firstname, surname, email, password, connectionMethod, userType, credit)
        VALUES (?, ?, ?, ?, ?, 'student', ?)
      `;

      db.query(sql, [firstname, surname, email, password, connectionMethod, credit], (err, result) => {
        if (err) {
          return reject(err);
        }

        // Récupérer l'ID de l'utilisateur nouvellement inséré
        const newUserID = result.insertId;

        // Sélectionner les informations complètes de l'utilisateur nouvellement inséré
        const selectSql = 'SELECT userID, firstname, surname, email, connectionMethod, credit, tickets, subscriptionEnd FROM Users WHERE userID = ?';
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
          const selectSql = 'SELECT userID, firstname, surname, email, connectionMethod, credit, tickets, subscriptionEnd FROM Users WHERE userID = ?';
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

  async removeStudent(courseID, studentID) {
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
          return reject(err);
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
            SELECT userID, firstname, surname, email, connectionMethod, credit, tickets, subscriptionEnd 
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
            console.log("getTeacherPlaces : ",teacherPlaces);
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

            // Vérifier si le teacherID est autorisé à modifier ce cours
            if (rows[0].count === 0) {
                return reject(new Error('Vous n\'êtes pas autorisé à modifier ce cours.'));
            }

            // Obtenez les IDs des étudiants et des professeurs à partir des adresses e-mail fournies
            Promise.all([
                this.getUserIDsByEmails(students),
                this.getUserIDsByEmails(teachers)
            ])
            .then(([studentIDs, teacherIDs]) => {
                // Ajouter les studentIDs et teacherIDs aux valeurs de la requête
                if(studentIDs){
                  fieldsToUpdate.push("studentsID = ?");
                  values.push(JSON.stringify(studentIDs));
                }
                if(teacherIDs){
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
                    console.log("modifyCourse result : ",result);
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
        });
    });
}

async getUserIDsByEmails(emails) {
    return new Promise((resolve, reject) => {
        if(!emails){
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

}

module.exports = new TeacherService();