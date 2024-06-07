const db = require('../config/database');

class UserService {
  async generateResetToken(email) {
    return new Promise((resolve, reject) => {
      const generateToken = () => Math.floor(100000 + Math.random() * 900000); // Génère un nombre à 6 chiffres

      let token = generateToken();

      const checkTokenUnique = (token) => {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM ResetPassword WHERE token = ?';
          db.query(sql, [token], (err, result) => {
            if (err) return reject(err);
            resolve(result.length === 0);
          });
        });
      };

      const insertToken = (email, token) => {
        const sql = 'INSERT INTO ResetPassword (token, email, date) VALUES (?, ?, NOW())';
        return new Promise((resolve, reject) => {
          db.query(sql, [token, email], (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });
      };

      const userExist = (email) => {
        const sql = 'SELECT * FROM Users WHERE UserID = ?';
        return new Promise((resolve, reject) => {
          db.query(sql, [token, email], (err, result) => {
            if (err) return reject(err);
            console.log(result.length > 0);
            resolve(result.length > 0);
          });
        });
      };

      (async () => {
        try {
          if(!userExist(email)){
            return reject(new Error('User not found'));
          }

          let isUnique = await checkTokenUnique(token);
          while (!isUnique) {
            token = generateToken();
            isUnique = await checkTokenUnique(token);
          }
          await insertToken(email, token);
          resolve(token);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  async resetPassword(token, newPassword) {
    return new Promise((resolve, reject) => {
      const getTokenInfo = (token) => {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM ResetPassword WHERE token = ?';
          db.query(sql, [token], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
          });
        });
      };

      const updatePassword = (userID, newPassword) => {
        const sql = 'UPDATE Users SET password = ? WHERE userID = ?';
        return new Promise((resolve, reject) => {
          db.query(sql, [newPassword, userID], (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });
      };

      const deleteToken = (token) => {
        const sql = 'DELETE FROM ResetPassword WHERE token = ?';
        return new Promise((resolve, reject) => {
          db.query(sql, [token], (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });
      };

      (async () => {
        try {
          const tokenInfo = await getTokenInfo(token);
          if (!tokenInfo) {
            return reject(new Error('Invalid token'));
          }

          const tokenDate = new Date(tokenInfo.date);
          const currentDate = new Date();
          const diffMinutes = Math.floor((currentDate - tokenDate) / (1000 * 60));

          if (diffMinutes > 5) {
            return reject(new Error('Token expired'));
          }

          await updatePassword(tokenInfo.userID, newPassword);
          await deleteToken(token);
          resolve();
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  async addLink(userID, courseID, link) {
    return new Promise(async (resolve, reject) =>  {

      const checkUserTypeSql = "SELECT userType FROM Users WHERE userID = ?";

      db.query(checkUserTypeSql, [userID], (err, result) => {
        userID = userID.toString();
        if (err) {
          return reject(err);
        }

        // Si c'est un étudiant
        if (result.length > 0 && result[0].userType == "student") {
          // SQL pour vérifier si l'étudiant est inscrit au cours
          const checkStudentSql = `
          SELECT JSON_CONTAINS(studentsID, ?) AS isParticipant
          FROM Courses
          WHERE courseID = ?
          `;

          db.query(checkStudentSql, [userID, courseID], (err, result) => {
            if (err) {
              return reject(err);
            }

            // Si l'étudiant est inscrit au cours
            if (result.length > 0 && result[0].isParticipant) {
              // SQL pour ajouter le lien à la colonne links
              const updateLinkSql = `
                UPDATE Courses
                SET links = JSON_ARRAY_APPEND(links, '$', ?)
                WHERE courseID = ?
              `;

                db.query(updateLinkSql, [link, courseID], (err, result) => {
                  if (err) {
                    return reject(err);
                  }
                  resolve(result);
                });
              
            }
            else {
              return resolve({ success: false, message: 'Student not enrolled in course' });
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
              return reject(err);
            }

            // Si le professeur est inscrit au cours
            if (result.length > 0 && result[0].isParticipant) {
              // SQL pour ajouter le lien à la colonne links
              const updateLinkSql = `
                UPDATE Courses
                SET links = JSON_ARRAY_APPEND(links, '$', ?)
                WHERE courseID = ?
              `;

                db.query(updateLinkSql, [link, courseID], (err, result) => {
                  if (err) {
                    return reject(err);
                  }
                  resolve(result);
                });
              
            }
            else {
              return resolve({ success: false, message: 'Teacher not enrolled in course' });
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

      if (tags && tags.length > 0) {
        sql += ' AND (' + tags.map(tag => 'JSON_CONTAINS(tags, JSON_ARRAY(?))').join(' AND ') + ')';
        params.push(...tags);
      }

      // Afficher la requête SQL avec les valeurs substituées
      const formattedSql = db.format(sql, params);
      console.log('searchCoursesStudent | Executing SQL query:', formattedSql);

      db.query(sql, params, (err, results) => {
        if (err) {
          return reject(err);
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
          return reject(err);
        }
        if (result.length == 0) {
          return reject(new Error('Course not found'));
        }
        resolve(result);
      });
    });
  }

}



module.exports = new UserService();
