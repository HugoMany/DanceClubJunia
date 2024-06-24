const db = require('../config/database');

class UserService {
  
  async addLink(userID, courseID, link) {
    return new Promise(async (resolve, reject) => {

      const checkUserTypeSql = "SELECT userType FROM Users WHERE userID = ?";

      db.query(checkUserTypeSql, [userID], (err, result) => {
        userID = userID.toString();
        if (err) {
          return reject(new Error("Erreur lors de la vérification du type de l'utilisateur."));
        }
        if (result.length == 0) return reject(new Error("L'utilisateur n'existe pas."));

        if (result.length > 0 && result[0].userType == "student") {
          // SQL pour vérifier si l'étudiant est inscrit au cours
          const checkStudentSql = `
          SELECT JSON_CONTAINS(studentsID, ?) AS isParticipant
          FROM Courses
          WHERE courseID = ?
          `;

          db.query(checkStudentSql, [userID, courseID], (err, result) => {
            if (err) {
              return reject(new Error("Erreur lors de la vérification de la présence de de l'élève dans le cours."));
            }
            if (result.length == 0) return reject(new Error("Le cours n'existe pas."));

            // Si l'étudiant est inscrit au cours
            if (result[0].isParticipant) {
              const updateLinkSql = `
                UPDATE Courses
                SET links = JSON_ARRAY_APPEND(links, '$', ?)
                WHERE courseID = ?
              `;

              db.query(updateLinkSql, [link, courseID], (err, result) => {
                if (err || result.affectedRows == 0) {
                  return reject(new Error("Erreur lors de l'ajout du lien."));
                }
                resolve(result);
              });

            }
            else {
              return reject(new Error("L'élève n'est pas dans le cours."));
            }
          });
        } // on vérifie si c'est un professeur
        else if (result.length > 0 && result[0].userType == "teacher") {
          // SQL pour vérifier si le professeur est inscrit au cours
          const checkTeacherSql = `
          SELECT JSON_CONTAINS(teachersID, ?) AS isParticipant
          FROM Courses
          WHERE courseID = ?
          `;

          db.query(checkTeacherSql, [userID, courseID], (err, result) => {
            if (err) {
              return reject(new Error("Erreur lors de la vérification de la présence de de l'élève dans le cours."));
            }
            if (result.length == 0) return reject(new Error("Le cours n'existe pas."));


            // Si le professeur est inscrit au cours
            if (result.length > 0 && result[0].isParticipant) {
              // SQL pour ajouter le lien à la colonne links
              const updateLinkSql = `
                UPDATE Courses
                SET links = JSON_ARRAY_APPEND(links, '$', ?)
                WHERE courseID = ?
              `;

              db.query(updateLinkSql, [link, courseID], (err, result) => {
                if (err || result.affectedRows == 0) {
                  return reject(new Error("Erreur lors de l'ajout du lien."));
                }
                resolve(result);
              });

            }
            else {
              return reject(new Error("Le professeur n'est pas dans le cours."));
            }
          });
        }
      });
    });
  }

  async searchCoursesStudent(userID, startDate, tags) {
    return new Promise((resolve, reject) => {
      let sql = `
        SELECT * FROM Courses
        WHERE JSON_CONTAINS(studentsID, ?)
      `;
      const params = [userID];

      if (startDate) {
        sql += ` AND DATE_FORMAT(startDate, '%Y-%m-%d') = ?`;
        params.push(startDate);
      }

      if(tags){
        const tagArray = tags.split(',').map(tag => tag.trim());
  
        if (tags && tags.length > 0) {
          sql += ' AND (' + tagArray.map(tag => 'JSON_CONTAINS(tags, JSON_ARRAY(?))').join(' AND ') + ')';
          params.push(...tagArray);
        }
      }

      // Afficher la requête SQL avec les valeurs substituées
      const formattedSql = db.format(sql, params);

      db.query(sql, params, (err, results) => {
        if (err) {
          return reject(new Error("Erreur lors de la recherche de cours."));
        }
        if (results.length == 0) {
          return reject(new Error("Le cours n'a pas été trouvé."));
        }
        resolve(results);
      });
    });
  }

  async searchCoursesTeacher(userID, startDate, tags) {
    return new Promise((resolve, reject) => {
      let sql = `
        SELECT * FROM Courses
        WHERE JSON_CONTAINS(teachersID, ?)
      `;
      const params = [userID];

      if (startDate) {
        sql += ` AND DATE_FORMAT(startDate, '%Y-%m-%d') = ?`;
        params.push(startDate);
      }

      if(tags){
        const tagArray = tags.split(',').map(tag => tag.trim());
  
        if (tags && tags.length > 0) {
          sql += ' AND (' + tagArray.map(tag => 'JSON_CONTAINS(tags, JSON_ARRAY(?))').join(' AND ') + ')';
          params.push(...tagArray);
        }
      }

      // Afficher la requête SQL avec les valeurs substituées
      const formattedSql = db.format(sql, params);
      console.log('searchCoursesTeacher | Executing SQL query:', formattedSql);

      db.query(sql, params, (err, results) => {
        if (err) {
          return reject(new Error("Erreur lors de la recherche de cours."));
        }
        if (results.length == 0) {
          return reject(new Error("Le cours n'a pas été trouvé."));
        }
        resolve(results);
      });
    });
  }

  async searchCourse(courseID) {
    return new Promise((resolve, reject) => {
      let sql = `
        SELECT * FROM Courses
        WHERE courseID = ?
      `;
      db.query(sql, [courseID], (err, result) => {
        if (err) {
          return reject(new Error("Erreur lors de la recherche de cours."));
        }
        if (result.length == 0) {
          return reject(new Error("Le cours n'a pas été trouvé."));
        }
        resolve(result);
      });
    });
  }

  async getContactsStudents() {
    return new Promise((resolve, reject) => {
      const sql = `
            SELECT email
            FROM Users
            WHERE userType = 'student'
        `;

      db.query(sql, (err, rows) => {
        if (err) {
          return reject(new Error("Erreur lors de la récupération des contacts."));
        } else {
          const contacts = rows.map(row => row.email);
          resolve(contacts);
        }
      });
    });
  }

  async getProfile(userID) {
    return new Promise((resolve, reject) => {
      const getUserTypeSql = `
        SELECT userType 
        FROM Users 
        WHERE userID = ?
      `;
  
      db.query(getUserTypeSql, [userID], (err, userTypeResult) => {
        if (err) {
          return reject(new Error("Erreur lors de la récupération du type d'utilisateur."));
        }
        if (userTypeResult.length === 0) {
          return reject(new Error("L'utilisateur n'existe pas."));
        }
  
        const userType = userTypeResult[0].userType;
  
        let getProfileSql = `
          SELECT userID, firstname, surname, email, connectionMethod, tickets, photo 
          FROM Users 
          WHERE userID = ?
        `;
  
        // On récupère aussi la description si c'est un teacher ou un admin
        if (userType === 'teacher' || userType === 'admin') {
          getProfileSql = `
            SELECT userID, firstname, surname, email, connectionMethod, photo, description 
            FROM Users 
            WHERE userID = ?
          `;
        }
  
        db.query(getProfileSql, [userID], (err, result) => {
          if (err) {
            return reject(new Error("Erreur lors de la récupération du profil."));
          }
          if (result.length === 0) {
            return reject(new Error("L'utilisateur n'existe pas."));
          }
  
          if (userType === 'student') {
            const getCardsSql = `
              SELECT cardID, number, maxNumber 
              FROM Cards 
              WHERE userID = ?
            `;
            db.query(getCardsSql, [userID], (err, cardsResult) => {
              if (err) {
                return reject(new Error("Erreur lors de la récupération des cartes."));
              }
              result[0].cards = cardsResult;
              resolve(result);
            });
          } else {
            resolve(result);
          }
        });
      });
    });
  }  

  async modifyProfile(userID, values, fieldsToUpdate, description) {
    return new Promise((resolve, reject) => {
      const checkUserTypeSql = `
        SELECT userType
        FROM Users
        WHERE userID = ?
      `;
  
      db.query(checkUserTypeSql, [userID], (err, rows) => {
        if (err) {
          return reject(new Error("Erreur lors de la récupération du type de l'utilisateur."));
        }
  
        if (rows.length === 0) {
          return reject(new Error("Aucun utilisateur trouvé."));
        }
  
        const userType = rows[0].userType;
  
        if ((userType === 'teacher' || userType === "admin") && description) {
          fieldsToUpdate.push('description = ?');
          values.push(description);
        }

        values.push(userID);
  
        const sql = `
          UPDATE Users
          SET ${fieldsToUpdate.join(', ')}
          WHERE userID = ?
        `;
  
        db.query(sql, values, (err, result) => {
          if (err || result.affectedRows === 0) {
            return reject(new Error("Erreur lors de la modification de l'utilisateur."));
          }
  
          const selectSql = 'SELECT userID, firstname, surname, email, photo, description FROM Users WHERE userID = ?';
          db.query(selectSql, [userID], (err, rows) => {
            if (err) {
              return reject(new Error("Erreur lors de la récupération de l'utilisateur."));
            }
            resolve(rows);
          });
        });
      });
    });
  }
  

}



module.exports = new UserService();
