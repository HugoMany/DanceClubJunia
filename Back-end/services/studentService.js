const db = require('../config/database');

class StudentService {

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

      // Récupération du prix
      db.query(priceQuery, [type, number], (err, result) => {
        if (err || result.length == 0) {
          return reject(new Error('Erreur lors de la récupération du prix.'));
        }

        let price = result[0].price;
        if (type !== "card") {
          price *= number; // Prix proportionnel au nombre de tickets achetés
        }

        switch (type) {
          case 'ticket':
            const ticketSql = 'UPDATE Users SET tickets = tickets + ? WHERE userID = ?';
            db.query(ticketSql, [number, studentID], (err, result) => {
              if (err || result.affectedRows == 0) {
                return reject(new Error("Erreur lors de l'ajout du ticket à l'élève."));
              }
            });
            break;
          case 'card':
            const cardSql = 'INSERT INTO Cards (userID, number, maxNumber) VALUES (?, 0, ?)';
            db.query(cardSql, [studentID, number], (err, result) => {
              if (err || result.affectedRows == 0) {
                return reject(new Error("Erreur lors de l'ajout de la carte à l'élève."));
              }
            });
            break;
        }

        const paymentSql = "INSERT INTO Payments (userID, price, type, quantity, date, paymentType, sourceID) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, 'online', ?);"
        db.query(paymentSql, [studentID, price, type, number, studentID], (err, result) => {
          if (err || result.affectedRows == 0) {
            return reject(new Error("Erreur lors de l'enregistrement du paiement."));
          }
          resolve(result);
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
            // Vérifie s'il y a de la place dans le cours
            this.checkCourseCapacity(courseID)
              .then(course => {
                if (course.currentParticipants >= course.maxParticipants) {
                  reject(new Error("Le cours est complet."));
                } else {
                  // Récupère les informations du cours et de l'étudiant
                  Promise.all([this.getCourseDetails(courseID), this.getStudentDetails(studentID)])
                    .then(([course, student]) => {
                      const paymentType = course.paymentType.split(',');
                      const currentDate = new Date();

                      if (paymentType.includes('card')) {
                        this.getValidCard(studentID)
                          .then(card => {
                            if (card) {
                              this.useCard(card)
                                .then(cardMaxNumber => {
                                  this.getPrice('card', cardMaxNumber)
                                    .then(price => {
                                      this.addStudentToCourse(studentID, courseID)
                                        .then(() => this.logPayment(studentID, "course", currentDate, `card${cardMaxNumber}`, studentID, courseID, price))
                                        .then(() => resolve({ message: "L'élève a été ajouté au cours via une carte." }))
                                        .catch(err => reject(err));
                                    })
                                    .catch(err => reject(err));
                                })
                                .catch(err => reject(err));
                            } else {
                              this.getPrice('ticket', 0)
                                .then(price => {
                                  this.reserveWithTicket(student, courseID, currentDate, price)
                                    .then(() => resolve({ message: "L'élève a été ajouté au cours via un ticket." }))
                                    .catch(err => reject(err));
                                })
                                .catch(err => reject(err));
                            }
                          })
                          .catch(err => reject(err));
                      } else if (paymentType.includes('ticket') && student.tickets > 0) {
                        this.getPrice('ticket', 0)
                          .then(price => {
                            this.reserveWithTicket(student, courseID, currentDate, price)
                              .then(() => resolve({ message: "L'élève a été ajouté au cours via un ticket." }))
                              .catch(err => reject(err));
                          })
                          .catch(err => reject(err));
                      } else {
                        return reject(new Error("Aucun mode de paiement valide trouvé ou fonds insuffisants."));
                      }
                    })
                    .catch(err => reject(err));
                }
              })
              .catch(err => reject(err));
          }
        })
        .catch(err => reject(err));
    });
  }

  async checkCourseCapacity(courseID) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT maxParticipants, JSON_LENGTH(studentsID) AS currentParticipants FROM Courses WHERE courseID = ?';
      db.query(sql, [courseID], (err, rows) => {
        if (err || rows.length === 0) {
          return reject(new Error("Erreur lors de la récupération de la capacité du cours."));
        }
        resolve(rows[0]);
      });
    });
  }

  async reserveWithTicket(student,courseID,currentDate,price){
    return new Promise((resolve, reject) => {
      if(student.tickets < 1){
        return reject(new Error("Aucun mode de paiement valide trouvé ou fonds insuffisants."));
      }
      const newTickets = student.tickets - 1;
      db.query('UPDATE Users SET tickets = ? WHERE userID = ?', [newTickets, student.userID], (err, results) => {
        if (err || results.affectedRows == 0) {
          return reject(new Error("Erreur lors de la décrémentation des tickets."));
        }
        this.addStudentToCourse(student.userID, courseID);
        this.logPayment(student.userID, "course", currentDate, "ticket", student.userID, courseID,price);
        return resolve();
      });
    });
  }

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

  async getValidCard(studentID) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Cards WHERE userID = ? AND number < maxNumber ORDER BY number DESC LIMIT 1', [studentID], (err, rows) => {
        if (err) {
          return reject(new Error("Erreur lors de la récupération d'une carte valide."));
        }
        if(rows.length == 0){
          return resolve();
        }
        return resolve(rows[0]);
      });
    });
  };

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
      return resolve(card.maxNumber);
    });
  };

  async getPrice(type, number) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT price FROM Places WHERE type = ?';
      if (type === "card"){
        query = 'SELECT price FROM Places WHERE type = ? AND number = ?';
      }
      
      db.query(query, [type, number], (err, results) => {
        if (err || results.length === 0) {
          return reject(new Error("Erreur lors de la récupération du prix."));
        }
        let price = results[0].price;
        if (type==="card"){
          price /= number;
        }
        return resolve(price);
      });
    });
  }

  async logPayment(userID, type, date, paymentType, sourceID, itemID, price) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Payments (userID, price, type, quantity, date, paymentType, sourceID, itemID) VALUES (?, ?, ?, 0, ?, ?, ?, ?)';
      db.query(query, [userID, price, type, date, paymentType, sourceID, itemID], (err, results) => {
        if (err) {
          return reject(new Error('Erreur lors de l\'enregistrement du paiement.'));
        } else {
          return resolve(true);
        }
      });
    });
  }

  async unsubscribeCourse(studentID, courseID) {
    return new Promise(async (resolve, reject) => {
      try {
        // Vérifie si le cours existe et récupère les détails du cours
        const course = await this.getCourseDetails(courseID);
        if (!course) {
          return reject(new Error("Le cours n'existe pas."));
        }
  
        // Vérifie si la date du cours n'est pas passée
        const currentDate = new Date();
        const startDate = new Date(course.startDate);
        if (currentDate >= startDate) {
          return reject(new Error("Le cours a déjà commencé ou est terminé."));
        }
  
        // Vérifie si l'élève est inscrit au cours
        const studentInCourse = await this.checkIfStudentInCourse(studentID, courseID);
        if (!studentInCourse) {
          return reject(new Error("L'élève n'est pas inscrit à ce cours."));
        }
  
        // Supprime l'étudiant du cours
        await this.removeStudentFromCourse(studentID, course);

        const student = await this.getStudentDetails(studentID);
  
        // Récupère le dernier paiement de l'étudiant pour le cours
        const lastPayment = await this.getLastPayment(studentID, courseID);
  
        // Rembourse selon le type de paiement
        if (lastPayment.paymentType === 'ticket') {
          // Rembourse un ticket
          await this.refundTicket(student);
          await this.logPayment(studentID, "course", currentDate, 'ticket', studentID, courseID, -lastPayment.price);
        } else if (lastPayment.paymentType.startsWith('card')) {
          // Rembourse une carte de valeur équivalente avec une place restante
          const cardMaxNumber = parseInt(lastPayment.paymentType.replace('card', ''));
          await this.refundCard(studentID, cardMaxNumber);
          await this.logPayment(studentID, "course", currentDate, `card${cardMaxNumber}`, studentID, courseID, -lastPayment.price);
        }
  
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  
  async getLastPayment(studentID, courseID) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM Payments 
        WHERE userID = ? AND type = 'course' AND itemID = ? 
        ORDER BY date DESC LIMIT 1
      `;
      db.query(query, [studentID, courseID], (err, results) => {
        if (err) {
          return reject(new Error("Erreur lors de la récupération du dernier paiement."));
        }
        if (results.length === 0) {
          return reject(new Error("Aucun paiement trouvé pour ce cours."));
        }
        return resolve(results[0]);
      });
    });
  }
  
  async refundTicket(student) {
    return new Promise((resolve, reject) => {
      const newTickets = student.tickets + 1;
      db.query('UPDATE Users SET tickets = ? WHERE userID = ?', [newTickets, student.userID], (err, results) => {
        if (err || results.affectedRows === 0) {
          return reject(new Error("Erreur lors de l'incrémentation des tickets."));
        }
        return resolve();
      });
    });
  }
  
  async refundCard(studentID, maxPlaces) {
    return new Promise((resolve, reject) => {
      const newNumber = maxPlaces - 1;
      const insertCardSql = `
        INSERT INTO Cards (userID, number, maxNumber)
        VALUES (?, ?, ?)
      `;
      db.query(insertCardSql, [studentID, newNumber, maxPlaces], (err, results) => {
        if (err) {
          return reject(new Error("Erreur lors de l'ajout de la carte remboursée."));
        }
        return resolve();
      });
    });
  }
  
  async removeStudentFromCourse(studentID, course) {
    return new Promise((resolve, reject) => {
      const studentsID = JSON.parse(course.studentsID);
  
      // Retirer l'étudiant de la liste
      const index = studentsID.indexOf(parseInt(studentID));
      if (index === -1) {
        return reject(new Error("Erreur lors de la récupération de l'élève."));
      }
  
      studentsID.splice(index, 1);
  
      // Mettre à jour la liste des étudiants dans la base de données
      const updateSql = 'UPDATE Courses SET studentsID = ? WHERE courseID = ?';
      const updatedStudentsID = JSON.stringify(studentsID);
      db.query(updateSql, [updatedStudentsID, course.courseID], (err, result) => {
        if (err || result.affectedRows === 0) {
          return reject(new Error("Erreur lors de la modification du cours."));
        }
  
        return resolve(result);
      });
    });
  }
  

}

module.exports = new StudentService();
