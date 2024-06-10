const db = require('../config/database');

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
          return reject(new Error('Il n\'y a pas de cours.'));
        }
        resolve(result);
      });
    });
  }

  async login(email, password) {
    return new Promise((resolve, reject) => {
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
    });
  }

  async registerStudent(firstname, surname, email, password, connectionMethod, photo) {
    return new Promise((resolve, reject) => {

      const checkEmailSql = "SELECT userID FROM Users WHERE email = ?";
      db.query(checkEmailSql, [email], (err, result) => {
        if (err) {
          return reject(new Error("Erreur lors de la vérification de l'existence de l'email."));
        }

        if (result.length > 0) {
          return reject(new Error('Email déjà utilisé.'));
        }

        const sql = `
          INSERT INTO Users (firstname, surname, email, password, connectionMethod, userType, credit, tickets, photo)
          VALUES (?, ?, ?, ?, ?, 'student', 0, 0, ?)
        `;

        db.query(sql, [firstname, surname, email, password, connectionMethod, photo], (err, result) => {
          if (err || result.affectedRows == 0) {
            return reject(new Error("Erreur lors de la création du compte."));
          }
          const studentID = result.insertId;
          resolve(studentID);
        });
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
        else if (result.length == 0) {
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

  async getSubscriptionPrice() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT price FROM Places WHERE type = 'subscription'";

      db.query(sql, (err, result) => {
        if (err) {
          return reject(new Error("Erreur lors de la récupération du prix de l'abonnement."));
        }

        if (result.length === 0) {
          return reject(new Error("Le prix de l'abonnement n'a pas été trouvé."));
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

  async getContacts() {
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
        if (result.length === 0) {
          return reject(new Error("Il n'y a pas de professeur."));
        }

        const contacts = rows.map(row => row.email);
        resolve(contacts);
      });
    });
  }
}


module.exports = new GuestService();