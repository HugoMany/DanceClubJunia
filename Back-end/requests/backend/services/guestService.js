const db = require('../config/database');
const axios = require('axios');

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
    const secretKey = '6LevBOUpAAAAAGtJUxvDNGi5ZlrUSeWNxfwh9ZNa';
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
      verifyCaptcha(captcha)
        .then(() => {
          const sql = "SELECT userID, userType FROM Users WHERE email = ? and password = ?";
          db.query(sql, [email, password], (err, result) => {
            if (err) {
              return reject(err);
            }

            if (result.length === 0) {
              return reject(new Error('Identifiants invalides.'));
            }

            resolve(result);
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  async registerStudent(firstname, surname, email, password, connectionMethod, photo, captcha) {
    return new Promise((resolve, reject) => {
      verifyCaptcha(captcha)
        .then(() => {
          const checkEmailSql = "SELECT userID FROM Users WHERE email = ?";
          db.query(checkEmailSql, [email], (err, result) => {
            if (err) {
              return reject(new Error("Erreur lors de la vérification de l'existence de l'email."));
            }

            if (result.length > 0) {
              return reject(new Error('Email déjà utilisé.'));
            }

            const sql = `
              INSERT INTO Users (firstname, surname, email, password, connectionMethod, userType, tickets, photo)
              VALUES (?, ?, ?, ?, ?, 'student', 0, ?)
            `;

            db.query(sql, [firstname, surname, email, password, connectionMethod, photo], (err, result) => {
              if (err || result.affectedRows == 0) {
                return reject(new Error("Erreur lors de la création du compte."));
              }
              const studentID = result.insertId;
              resolve(studentID);
            });
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

  async getContactsTeachers() {
    return new Promise((resolve, reject) => {
      const sql = `
            SELECT email
            FROM Users
            WHERE userType = 'teacher'
        `;

      db.query(sql, (err, rows) => {
        if (err) {
          return reject(new Error("Erreur lors de la récupération des contacts."));
        }
        if (rows.length === 0) {
          return reject(new Error("Il n'y a pas de professeur."));
        }

        const contacts = rows.map(row => row.email);
        resolve(contacts);
      });
    });
  }
}


module.exports = new GuestService();