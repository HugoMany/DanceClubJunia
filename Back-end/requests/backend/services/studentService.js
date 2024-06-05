const db = require('../config/database');

class StudentService {
  async addCredit(studentID, credit) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE Users SET credit = credit + ? WHERE userID = ?`;
      db.query(sql, [credit, studentID], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  async getSubscriptionEndDate(studentID) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT subscriptionEnd FROM Users WHERE userID = ?";
      db.query(sql, [studentID], (err, result) => {
        if (err) {
          return reject(err);
        }
        if (result.length > 0) {
          resolve(result[0].subscriptionEnd);
        } else {
          reject(new Error('No subscription end date found for the given student ID'));
        }
      });
    });
  }

  async getCourses(studentID) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Courses WHERE JSON_CONTAINS(studentsID, ?)";
        db.query(sql, [studentID], (err, result) => {
          if (err) {
            return reject(err);
          }
          
          resolve(result);
        });
      });
  }

  

  async buyPlace(studentID, type, number) {
    return new Promise((resolve, reject) => {
      let priceQuery;
      if (type === "card") {
        priceQuery = 'SELECT price FROM Places WHERE type = ? AND number = ?';
      } else {
        priceQuery = 'SELECT price FROM Places WHERE type = ?';
      }

      const updateUserCreditQuery = 'UPDATE Users SET credit = credit - ? WHERE userID = ?';

      // Récupération du prix
      db.query(priceQuery, [type, number], (err, result) => {
        if (err) {
          return reject(err);
        }

        let price = result[0].price;
        if (type !== "card") {
          price *= number; // Prix proportionnel au nombre de tickets ou de mois d'abonnement achetés
        }

        if (!price) {
          return reject(new Error('Place not found'));
        }

        // Vérifier si l'utilisateur a suffisamment de crédits
        const getUserCreditQuery = 'SELECT credit FROM Users WHERE userID = ?';
        db.query(getUserCreditQuery, [studentID], (err, result) => {
          if (err) {
            return reject(err);
          }

          const userCredit = result[0].credit;

          if (userCredit >= price) {
            // Soustraire le prix du ticket du crédit de l'utilisateur
            db.query(updateUserCreditQuery, [price, studentID], (err, result) => {
              if (err) {
                return reject(err);
              }

              let sql;
              switch (type) {
                case 'ticket':
                  sql = 'UPDATE Users SET tickets = tickets + ? WHERE userID = ?';
                  db.query(sql, [number, studentID], (err, result) => {
                    if (err) {
                      return reject(err);
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
                    resolve(result);
                  });
                  break;
              }
            });
          } else {
            reject(new Error('Insufficient credit'));
          }
        });
      });
    });
  }

  async getPaymentHistory(studentID) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT paymentID, userID, price, type, quantity, date, paymentType 
        FROM Payments 
        WHERE userID = ?
        ORDER BY date DESC
      `;
      db.query(sql, [studentID], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  

  
}

module.exports = new StudentService();
