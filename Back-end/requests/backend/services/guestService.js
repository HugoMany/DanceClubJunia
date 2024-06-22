const db = require('../config/database');
const axios = require('axios');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

class GuestService {
  async getAllCourses() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM Courses
      `;

      db.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        }
        if (result.length === 0) {
          return reject(new Error("Il n'y a pas de cours."));
        }
        resolve(result);
      });
    });
  }

  async verifyCaptcha(captchaToken) {
    const secretKey = config.secretKey;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

    return new Promise((resolve, reject) => {
      axios.post(verificationUrl)
        .then(response => {
          if (response.data.success) {
            resolve(true);
          } else {
            reject(new Error('Échec de la vérification reCAPTCHA.'));
          }
        })
        .catch(error => {
          reject(new Error('Erreur lors de la vérification reCAPTCHA.'));
        });
    });
  }

  async login(email, password, captcha) {
    return new Promise((resolve, reject) => {
      this.verifyCaptcha(captcha)
        .then(() => {
          const sql = "SELECT userID, userType, password FROM Users WHERE email = ?";
          db.query(sql, [email, password], async (err, result) => {
            if (err) {
              return reject(err);
            }

            if (result.length === 0) {
              return reject(new Error('Identifiants invalides.'));
            }

            const user = result[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
              return reject(new Error('Identifiants invalides.'));
            }

            resolve(user);
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  async saveRefreshToken(userID, refreshToken) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO refreshToken (userID, token) VALUES (?, ?)";
      db.query(sql, [userID, refreshToken], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });

  }

  async saveOrUpdateRefreshToken(userId, refreshToken) {
    return new Promise((resolve, reject) => {
      const selectSql = "SELECT * FROM refreshToken WHERE userID = ?";
      db.query(selectSql, [userId], (err, result) => {
        if (err) {
          return reject(err);
        }

        if (result.length > 0) {
          // Update existing token
          const updateSql = "UPDATE refreshToken SET token = ? WHERE userID = ?";
          db.query(updateSql, [refreshToken, userId], (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve(result);
          });
        } else {
          // Insert new token
          const insertSql = "INSERT INTO refreshToken (userID, token) VALUES (?, ?)";
          db.query(insertSql, [userId, refreshToken], (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve(result);
          });
        }
      });
    });
  }

  async verifyRefreshToken(userId, refreshToken) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM refreshToken WHERE userID = ? AND token = ?";
      db.query(sql, [userId, refreshToken], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.length > 0);
      });
    });
  }

  async registerStudent(firstname, surname, email, password, connectionMethod, photo, captcha) {
    return new Promise((resolve, reject) => {
      this.verifyCaptcha(captcha)
        .then(() => {
          const checkEmailSql = "SELECT userID FROM Users WHERE email = ?";
          db.query(checkEmailSql, [email], async (err, result) => {
            if (err) {
              return reject(new Error("Erreur lors de la vérification de l'existence de l'email."));
            }

            if (result.length > 0) {
              return reject(new Error('Email déjà utilisé.'));
            }
            try {
              const hashedPassword = await bcrypt.hash(password, saltRounds);

              const sql = `
              INSERT INTO Users (firstname, surname, email, password, connectionMethod, userType, tickets, photo)
              VALUES (?, ?, ?, ?, ?, 'student', 0, ?)
            `;

              db.query(sql, [firstname, surname, email, hashedPassword, connectionMethod, photo], (err, result) => {
                if (err || result.affectedRows == 0) {
                  return reject(new Error("Erreur lors de la création du compte."));
                }
                const studentID = result.insertId;
                resolve(studentID);
              });
            }
            catch (hashErr) {
              reject(new Error("Erreur lors du hachage du mot de passe."));
            };
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  async getCoursesByPeriod(startDate, endDate) {
    return new Promise((resolve, reject) => {
      const sql = `
            SELECT *
            FROM Courses
            WHERE startDate >= ? AND startDate <= ?
        `;

      db.query(sql, [startDate, endDate], (err, rows) => {
        if (err) {
          return reject(new Error("Erreur lors de la récupération des cours."));
        }
        else if (rows.length == 0) {
          return reject(new Error("Il n'y a pas de cours pour cette période."));
        }
        else {
          resolve(rows);
        }
      });
    });
  }

  async getTicketPrice() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT price FROM Places WHERE type = 'ticket'";

      db.query(sql, (err, result) => {
        if (err) {
          return reject(new Error("Erreur lors de la récupération du prix du ticket."));
        }

        if (result.length === 0) {
          return reject(new Error("Le prix du ticket n'a pas été trouvé."));
        }

        resolve(result[0].price);
      });
    });
  }

  async getCardPrices() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT number, price FROM Places WHERE type = 'card'";

      db.query(sql, (err, result) => {
        if (err) {
          return reject(new Error("Erreur lors de la récupération du prix des cartes."));
        }

        if (result.length === 0) {
          return reject(new Error("Le prix des cartes n'a pas été trouvé"));
        }

        resolve(result);
      });
    });
  }

  async getContactsTeachers(ids = []) {
    return new Promise((resolve, reject) => {
        let sql = `
            SELECT email, firstname, surname
            FROM Users
            WHERE userType = 'teacher'
        `;
        
        // Ajouter une condition si des IDs sont fournis
        if (ids.length > 0) {
            const placeholders = ids.map(() => '?').join(',');
            sql += ` AND userID IN (${placeholders})`;
        }

        db.query(sql, ids, (err, rows) => {
            if (err) {
              console.log(err.message);
                return reject(new Error("Erreur lors de la récupération des contacts."));
            }
            if (rows.length === 0) {
                return reject(new Error("Il n'y a pas de professeur."));
            }

            const contacts = rows.map(row => ({
                email: row.email,
                firstname: row.firstname,
                surname: row.surname
            }));
            resolve(contacts);
        });
    });
}

  async generateResetToken(email) {
    return new Promise(async(resolve, reject) => {
      const token = jwt.sign({email: email }, config.jwtSecret, { expiresIn: '5m' });

      const insertToken = (email, token) => {
        const sql = 'INSERT INTO ResetPassword (token, email) VALUES (?, ?)';
        return new Promise((resolve, reject) => {
          db.query(sql, [token, email], (err, result) => {
            if (err || result.affectedRows == 0) return reject(new Error("Erreur lors de l'insertion du token dans la base de données."));
            resolve(result);
          });
        });
      };

      const userExist = (email) => {
        const sql = 'SELECT * FROM Users WHERE email = ?';
        return new Promise((resolve, reject) => {
          db.query(sql, email, (err, result) => {
            if (err) return reject(new Error("Erreur lors de la vérification de l'existence de l'utilisateur."));
            if(result.length <= 0) {
              return reject(new Error("L'utilisateur n'existe pas."));
            }
            resolve();
          });
        });
      };

      await userExist(email);
      await insertToken(email, token);
      resolve(token);
    });
  }

  async resetPassword(token, newPassword) {
    return new Promise((resolve, reject) => {
      const getTokenInfo = (token) => {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM ResetPassword WHERE token = ?';
          db.query(sql, [token], (err, result) => {
            if (err) return reject(new Error('Token expiré.'));
            if (result.length == 0) return reject(new Error('Token introuvable.'));
            resolve(result[0]);
          });
        });
      };

      const updatePassword = async (userID, newPassword) => {
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        const sql = 'UPDATE Users SET password = ? WHERE userID = ?';
        return new Promise((resolve, reject) => {
          db.query(sql, [hashedPassword, userID], (err, result) => {
            if (err || resolve.affectedRows == 0) return reject(new Error("Erreur lors de la modification du mot de passe."));
            resolve(result);
          });
        });
      };

      const deleteToken = (token) => {
        const sql = 'DELETE FROM ResetPassword WHERE token = ?';
        return new Promise((resolve, reject) => {
          db.query(sql, [token], (err, result) => {
            if (err || result.affectedRows == 0) return reject(new Error("Le token n'existe pas."));
            resolve(result);
          });
        });
      };

      (async () => {
        const tokenInfo = await getTokenInfo(token);
        if (!tokenInfo) {
          return reject(new Error('Token invalide.'));
        }

        const tokenDate = new Date(tokenInfo.date);
        const currentDate = new Date();
        const diffMinutes = Math.floor((currentDate - tokenDate) / (1000 * 60));

        if (diffMinutes > 5) {
          return reject(new Error('Token expiré.'));
        }

        await updatePassword(tokenInfo.userID, newPassword);
        await deleteToken(token);
        resolve();
      })();
    });
  }

}




module.exports = new GuestService();