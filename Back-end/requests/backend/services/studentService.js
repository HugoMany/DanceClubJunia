const db = require('../config/database');

class StudentService {
  async addCredit(studentID, credit) {

    //
    //  Il faut ajouter une vérification du droit pour le faire (hello asso)
    //

    return new Promise((resolve, reject) => {
      const sql = `UPDATE Users SET credit = credit + ? WHERE userID = ?`;
      db.query(sql, [credit, studentID], (err, result) => {
        if (err || result.affectedRows == 0) {
          reject(new Error("Erreur lors de l'ajout du credit."));
        }

        const paymentSql = "INSERT INTO Payments (userID, price, type, quantity, date, paymentType) VALUES (?, ?, 'credit', ?, CURRENT_TIMESTAMP, 'online');"
        db.query(paymentSql, [studentID, credit, credit], (err, result) => {
          if (err || result.affectedRows == 0) {
            reject(new Error("Erreur lors de l'enregistrement du paiement."));
          }
          
          resolve(result);
        });
      });
    });
  }

  async getSubscriptionEndDate(studentID) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT subscriptionEnd FROM Users WHERE userID = ?";
      db.query(sql, [studentID], (err, result) => {
        if (err) {
          reject(new Error("Erreur lors de la récupération de la date de fin de l'abonnement."));
        }
        if (result.length > 0) {
          resolve(result[0].subscriptionEnd);
        } else {
          reject(new Error("Pas de date de fin d'abonnement."));
        }
      });
    });
  }

  async getCourses(studentID) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM Courses WHERE JSON_CONTAINS(studentsID, ?)";
      db.query(sql, [studentID], (err, result) => {
        if (err) {
          reject(new Error("Erreur lors de la récupération des cours."));
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
        if (err || result.length == 0) {
          return reject(new Error('Erreur lors de la récupération du prix.'));
        }

        let price = result[0].price;
        if (type !== "card") {
          price *= number; // Prix proportionnel au nombre de tickets ou de mois d'abonnement achetés
        }



        // Vérifier si l'utilisateur a suffisamment de crédits
        const getUserCreditQuery = 'SELECT credit FROM Users WHERE userID = ?';
        db.query(getUserCreditQuery, [studentID], (err, result) => {
          if (err) {
            return reject(new Error("Erreur lors de la vérification des crédits."));
          }

          if (result.length == 0) {
            return reject(new Error('Pas d\'utilisateur avec cet ID'));
          }

          const userCredit = result[0].credit;

          if (userCredit >= price) {
            // Soustraire le prix du ticket du crédit de l'utilisateur
            db.query(updateUserCreditQuery, [price, studentID], (err, result) => {
              if (err || result.length == 0) {
                return reject(new Error('Erreur lors de la mise à jour du crédit de l\'utilisateur.'));
              }


              const paymentSql = "INSERT INTO Payments (userID, price, type, quantity, date, paymentType, sourceID) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, 'online', ?);"
              db.query(paymentSql, [studentID, price, type, number, studentID], (err, result) => {
                if (err || result.affectedRows == 0) {
                  return reject(new Error("Erreur lors de l'enregistrement du paiement."));
                }
                resolve(result);
              });

              switch (type) {
                case 'ticket':
                  const ticketSql = 'UPDATE Users SET tickets = tickets + ? WHERE userID = ?';
                  db.query(ticketSql, [number, studentID], (err, result) => {
                    if (err || result.affectedRows == 0) {
                      return reject(new Error("Erreur lors de l'ajout du ticket à l'élève."));
                    }
                    resolve(result);
                  });
                  break;
                case 'card':
                  const cardSql = 'INSERT INTO Cards (userID, number, maxNumber) VALUES (?, 0, ?)';
                  db.query(cardSql, [studentID, number], (err, result) => {
                    if (err || result.affectedRows == 0) {
                      return reject(new Error("Erreur lors de l'ajout de la carte à l'élève."));
                    }
                    resolve(result);
                  });
                  break;
                case 'subscription':
                  const days = number * 30; // Nombre de jours proportionnel au nombre de mois

                  const subscriptionSql = `
                    UPDATE Users 
                    SET subscriptionEnd = CASE 
                      WHEN subscriptionEnd IS NULL THEN DATE_ADD(CURDATE(), INTERVAL ? DAY)
                      ELSE DATE_ADD(subscriptionEnd, INTERVAL ? DAY)
                    END 
                    WHERE userID = ?`;

                  db.query(subscriptionSql, [days, days, studentID], (err, result) => {
                    if (err || result.affectedRows == 0) {
                      return reject(new Error("Erreur lors de l'ajout de temps d'abonnement."));
                    }
                    resolve(result);
                  });
                  break;
              }
            });
          } else {
            return reject(new Error('Crédit insuffisant.'));
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
        if (err || results.length == 0) {
          return reject(new Error("Erreur lors de la récupération des paiements."));
        }
        resolve(results);
      });
    });
  }


  async reserveCourse(studentID, courseID) {
    return new Promise((resolve, reject) => {
      // Vérifie si l'étudiant est déjà dans le cours
      this.checkIfStudentInCourse(studentID, courseID)
        .then(alreadyInCourse => {
          if (alreadyInCourse) {
            reject(new Error("L'élève est déjà inscrit à ce cours."));
          } else {
            // Récupère les informations du cours et de l'étudiant
            Promise.all([this.getCourseDetails(courseID), this.getStudentDetails(studentID)])
              .then(([course, student]) => {
                const paymentType = course.paymentType.split(',');
                const currentDate = new Date();

                // Vérifie si l'étudiant est abonné et si le cours accepte les abonnements
                console.log("reserveCourse paymentType",paymentType,paymentType.includes('subscription'),student,student.subscriptionEnd);
                if (paymentType.includes('subscription') && student.subscriptionEnd && new Date(student.subscriptionEnd) > new Date()) {
                  this.addStudentToCourse(studentID, courseID)
                    .then(() => logPayment(studentID, "course", currentDate, "subscription", studentID, courseID))
                    .then(() => resolve({ message: "L'élève a été ajouté au cours via l'abonnement." }))
                    .catch(err => reject(err));
                } else if (paymentType.includes('card')) {
                  // Vérifie si l'étudiant a une carte et si le cours accepte les cartes
                  this.getValidCard(studentID)
                    .then(card => {
                      if (card) {
                        this.useCard(card)
                          .then(() => {
                            this.addStudentToCourse(studentID, courseID)
                              .then(() => logPayment(studentID, "course", currentDate, "card", studentID, courseID))
                              .then(() => resolve({ message: "L'élève a été ajouté au cours via une carte." }))
                              .catch(err => reject(err));
                          })
                          .catch(err => reject(err));
                      } else {
                        reject(new Error("Aucune carte valide trouvée."));
                      }
                    })
                    .catch(err => reject(err));
                } else if (paymentType.includes('ticket') && student.tickets > 0) {
                  // Vérifie si l'étudiant a des tickets et si le cours accepte les tickets
                  this.decrementTickets(student)
                    .then(() => {
                      this.addStudentToCourse(studentID, courseID)
                        .then(() => logPayment(studentID, "course", currentDate, "ticket", studentID, courseID))
                        .then(() => resolve({ message: "L'élève a été ajouté au cours via un ticket." }))
                        .catch(err => reject(err));
                    })
                    .catch(err => reject(err));
                } else {
                  reject(new Error("Aucun mode de paiement valide trouvé ou fonds insuffisants."));
                }
              })
              .catch(err => reject(err));
          }
        })
        .catch(err => reject(err));
    });
  }

  // Fonction pour vérifier si l'étudiant est déjà inscrit au cours
  async checkIfStudentInCourse(studentID, courseID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT studentsID FROM Courses WHERE courseID = ?', [courseID], (err, rows) => {
        if (err || rows.length == 0) {
          return reject(new Error("Le cours n'existe pas."));
        }
        const studentsID = JSON.parse(rows[0].studentsID);
        return resolve(studentsID.includes(parseInt(studentID)));
      });
    });
  };

  // Fonction pour obtenir les détails du cours
  async getCourseDetails(courseID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Courses WHERE courseID = ?', [courseID], (err, rows) => {
        if (err) {
          return reject(new Error("Erreur lors de la récupération du cours."));
        }
        if (rows.length == 0) {
          return reject(new Error("Le cours n'existe pas."));
        }
        return resolve(rows[0]);
      });
    });
  };

  // Fonction pour obtenir les détails de l'étudiant
  async getStudentDetails(studentID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Users WHERE userID = ?', [studentID], (err, rows) => {
        if (err) {
          return reject(new Error("Erreur lors de la récupération de l'élève."));
        }
        if (rows.length == 0) {
          return reject(new Error("L'élève n'existe pas."));
        }
        if (rows[0].userType != "student") {
          return reject(new Error("L'utilisateur n'est pas un élève."));
        }
        return resolve(rows[0]);
      });
    });
  };

  // Fonction pour ajouter un étudiant au cours
  async addStudentToCourse(studentID, courseID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT studentsID FROM Courses WHERE courseID = ?', [courseID], (err, rows) => {
        if (err || rows.length == 0) {
          return reject(new Error("Erreur lors de la récupération des élèves du cours."));
        }
        const studentsID = JSON.parse(rows[0].studentsID);
        studentsID.push(parseInt(studentID));
        const updatedStudentsID = JSON.stringify(studentsID);

        db.query('UPDATE Courses SET studentsID = ? WHERE courseID = ?', [updatedStudentsID, courseID], (err, results) => {
          if (err || results.affectedRows == 0) {
            return reject(new Error("Erreur lors de la modification du cours."));
          }
          resolve();
        });
      });
    });
  };

  // Fonction pour obtenir une carte valide
  async getValidCard(studentID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Cards WHERE userID = ? AND number < maxNumber ORDER BY number DESC LIMIT 1', [studentID], (err, rows) => {
        if (err || rows.length == 0) {
          return reject(new Error("Erreur lors de la récupération d'une carte valide."));
        }
        return resolve(rows[0]);
      });
    });
  };

  // Fonction pour utiliser une carte
  async useCard(card) {
    return new Promise((resolve, reject) => {
      const newNumber = card.number + 1;
      if (newNumber >= card.maxNumber) {
        db.query('DELETE FROM Cards WHERE cardID = ?', [card.cardID], (err, results) => {
          if (err || results.affectedRows == 0) {
            return reject(new Error("Erreur lors de la suppression de la carte utilisée."));
          }
        });
      } else {
        db.query('UPDATE Cards SET number = ? WHERE cardID = ?', [newNumber, card.cardID], (err, results) => {
          if (err || results.affectedRows == 0) {
            return reject(new Error("Erreur lors de l'utilisation de la carte."));
          }
        });
      }
      resolve();
    });
  };

  // Fonction pour décrémenter les tickets
  async decrementTickets(student) {
    return new Promise((resolve, reject) => {
      const newTickets = student.tickets - 1;
      db.query('UPDATE Users SET tickets = ? WHERE userID = ?', [newTickets, student.studentID], (err, results) => {
        if (err || results.affectedRows == 0) {
          return reject(new Error("Erreur lors de la décrémentation des tickets."));
        }
        resolve();
      });
    });
  };

  // Fonction pour enregistrer le paiement
  async logPayment (userID, type, date, paymentType, sourceID, itemID) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Payments (userID, type, date, paymentType, sourceID, itemID) VALUES (?, ?, ?, ?, ?, ?)';
      db.run(query, [userID, type, date, paymentType, sourceID, itemID], (err, results) => {
        if (err) {
          reject(new Error('Erreur lors de l\'enregistrement du paiement.'));
        } else {
          resolve(true);
        }
      });
    });
  };

}

module.exports = new StudentService();
