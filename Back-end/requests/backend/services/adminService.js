const db = require('../config/database');

class AdminService {
    async getAllStudents() {
      return new Promise((resolve, reject) => {
        const sql = `
          SELECT userID, firstname, surname, email, connectionMethod, credit, tickets, subscriptionEnd, photo FROM Users 
          WHERE userType = 'student'
        `;
  
        db.query(sql, (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result.length === 0) {
            return reject(new Error('No students found'));
          }
          resolve(result);
        });
      });
    }

    async getAllTeachers() {
        return new Promise((resolve, reject) => {
          const sql = `
            SELECT userID, firstname, surname, email, connectionMethod, photo, description FROM Users 
            WHERE userType = 'teacher'
          `;
    
          db.query(sql, (err, result) => {
            if (err) {
              return reject(err);
            }
            if (result.length === 0) {
              return reject(new Error('No teachers found'));
            }
            resolve(result);
          });
        });
      }

      async getAllAdmins() {
        return new Promise((resolve, reject) => {
          const sql = `
          SELECT userID, firstname, surname, email, connectionMethod, photo, description FROM Users 
            WHERE userType = 'admin'
          `;
    
          db.query(sql, (err, result) => {
            if (err) {
              return reject(err);
            }
            if (result.length === 0) {
              return reject(new Error('No admins found'));
            }
            resolve(result);
          });
        });
      }

      async getAllUsers() {
        return new Promise((resolve, reject) => {
          const sql = `
            SELECT userID, firstname, surname, email, connectionMethod, userType, credit, tickets, subscriptionEnd, photo, description FROM Users 
          `;
    
          db.query(sql, (err, result) => {
            if (err) {
              return reject(err);
            }
            if (result.length === 0) {
              return reject(new Error('No users found'));
            }
            resolve(result);
          });
        });
      }

      async deleteCourse(courseID) {
        return new Promise((resolve, reject) => {
            const checkCourseSql = 'SELECT COUNT(*) AS count FROM Courses WHERE courseID = ?';
            db.query(checkCourseSql, [courseID], (err, rows) => {
                if (err) {
                    return reject(new Error("Erreur lors de la vérification de l'existence du cours."));
                }
    
                // Vérifier si le cours existe
                if (rows[0].count === 0) {
                    return reject(new Error("Le cours spécifié n'existe pas."));
                }
    
                // Procéder à sa suppression
                const sql = 'DELETE FROM Courses WHERE courseID = ?';
                db.query(sql, [courseID], (err, result) => {
                    if (err || result.affectedRows > 0) {
                        return reject(new Error("Erreur lors de la suppression du cours."));
                    }
                    resolve(true);
                    
                });
            });
        });
    }    

    async createCard(place, price) {
        return new Promise((resolve, reject) => {
            const checkExistingCardSql = 'SELECT COUNT(*) AS count FROM Places WHERE type = ? AND number = ?';
            db.query(checkExistingCardSql, ['card', place], (err, rows) => {
                if (err) {
                    return reject(new Error("Erreur lors de la vérification de l'existence de la carte."));
                }
    
                // Vérifier si une carte de N places existe déjà
                if (rows[0].count > 0) {
                    return reject(new Error('La carte existe déjà.'));
                }
    
                const insertCardSql = `INSERT INTO Places (type, price, number) VALUES ('card', ?, ?)`;
                db.query(insertCardSql, [price, place], (err, result) => {
                    if (err || result.affectedRows == 0) {
                        return reject(new Error("Erreur lors de l'insertion de la carte dans la base de données."));
                    }

                    resolve(true);
                });
            });
        });
    }
    
    async deleteCard(place) {
        return new Promise((resolve, reject) => {
            const checkCardSql = 'SELECT COUNT(*) AS count FROM Places WHERE type = ? AND number = ?';
            db.query(checkCardSql, ['card', place], (err, rows) => {
                if (err) {
                    return reject(new Error("Erreur lors de la vérification de l'existence de la carte."));
                }
    
                // Vérifier si la carte existe
                if (rows[0].count === 0) {
                    return reject(new Error('La carte spécifiée n\'existe pas.'));
                }
    
                // Procéder à sa suppression
                const deleteSql = 'DELETE FROM Places WHERE type = ? AND number = ?';
                db.query(deleteSql, ['card', place], (err, result) => {
                    if (err || result.affectedRows == 0) {
                        return reject(new Error("Erreur lors de la suppression de la carte."));
                    }
                    
                    resolve(true);
                });
            });
        });
    }    

    async modifyPlacePrice(type, price) {
        return new Promise((resolve, reject) => {
            let number;
            // Vérifier si le type est une carte avec un nombre d'utilisations spécifié
            if (/^card\d+$/.test(type)) {
                // Extraire le nombre d'utilisations de la carte (N) depuis le type
                number = parseInt(type.substring(4));
                if (isNaN(number)) {
                    return reject(new Error("Nombre d'utilisations de la carte non valide."));
                }
                // Vérifier si la carte avec le nombre d'utilisations spécifié existe
                const checkCardSql = `SELECT COUNT(*) AS count FROM Places WHERE type = 'card' AND number = ?`;
                db.query(checkCardSql, [number], (err, rows) => {
                    if (err) {
                        return reject(new Error("Erreur lors de la vérification de l'existence da la carte."));
                    }
                    if (rows[0].count === 0) {
                        return reject(new Error("La carte avec le nombre d'utilisations spécifié n'existe pas."));
                    }
                    // Mettre à jour le prix de la carte
                    const updateCardSql = `UPDATE Places SET price = ? WHERE type = 'card' AND number = ?`;
                    db.query(updateCardSql, [price, number], (err, result) => {
                        if (err || result.affectedRows == 0) {
                            return reject(new Error("Erreur lors de la modification de la carte."));
                        }

                        resolve(true);
                    });
                });
            } // Ticket ou subscription
            else if (type === 'ticket' || type === 'subscription') {
                const updateSql = `UPDATE Places SET price = ? WHERE type = ?`;
                db.query(updateSql, [price, type], (err, result) => {
                    if (err || result.affectedRows == 0) {
                        return reject(new Error("Erreur lors de la modification du prix."));
                    }
                    
                    resolve(true);
                });
            } else {
                return reject(new Error("Le type de place n'est pas valide."));
            }
        });
    }
    
    async createCourse(image, title, type, duration, startDateTime, location, maxParticipants, paymentType, isEvening, recurrence, teachers, links, students, tags) {
        return new Promise((resolve, reject) => {
            // Vérification si c'est une soirée et s'il y a des enseignants
            if (isEvening && teachers && teachers.length > 0) {
                return reject(new Error("Impossible de spécifier des enseignants pour un cours en soirée."));
            }
    
            // Conversion de la chaîne de tags en tableau
            const tagArray = tags ? tags.split(",").map(tag => tag.trim()) : [];
    
            // Obtention des IDs des enseignants et des étudiants à partir de leurs adresses e-mail
            Promise.all([
                this.getUserIDsByEmails(teachers),
                this.getUserIDsByEmails(students)
            ])
                .then(([teacherIDs, studentIDs]) => {
                    const sql = `
                        INSERT INTO Courses (image, title, type, duration, startDate, location, maxParticipants, paymentType, isEvening, recurrence, teachersID, links, studentsID, tags)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `;
    
                    db.query(sql, [image, title, type, duration, startDateTime, location, maxParticipants, paymentType, isEvening, recurrence, JSON.stringify(teacherIDs), JSON.stringify(links), JSON.stringify(studentIDs), JSON.stringify(tagArray)], (err, result) => {
                        if (err) {
                            return reject(new Error("Erreur lors de la création du cours."));
                        }
    
                        const selectSql = 'SELECT * FROM Courses WHERE courseID = ?';
                        db.query(selectSql, [result.insertId], (err, rows) => {
                            if (err || !rows[0]) {
                                return reject(new Error("Erreur lors de la récupération du cours."));
                            }
    
                            resolve(rows[0]);
                        });
                    });
                })
                .catch(reject);
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
                    return reject(new Error("Erreur lors de la récupération des ID."));
                }
                if(rows.count == 0) {
                    return reject(new Error("Les emails n'appartiennent à aucun utilisateur."));
                }
    
                // Extraire les IDs des résultats
                const ids = rows.map(row => row.userID);
    
                resolve(ids);
            });
        });
    }
    
    async createTeacher(firstname, surname, email, password, connectionMethod, photo, description) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO Users (firstname, surname, email, password, connectionMethod, userType, photo, description)
                VALUES (?, ?, ?, ?, ?, 'teacher', ?, ?)
            `;
    
            db.query(sql, [firstname, surname, email, password, connectionMethod, photo, description], (err, result) => {
                if (err || result.affectedRows == 0) {
                    return reject(new Error("Erreur lors de la création du professeur."));
                }
    
                // Vérification de l'insertion réussie
                if (result.affectedRows > 0) {
                    const selectSql = 'SELECT * FROM Users WHERE userID = ?';
                    db.query(selectSql, [result.insertId], (err, rows) => {
                        if (err) {
                            return reject(new Error("Erreur lors de la récupération du professeur."));
                        }
                        resolve(rows[0]);
                    });
                }
            });
        });
    }
    
    async getPayments(startDate = null, endDate = null) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM Payments";
            const params = [];

            if (startDate && endDate) {
                sql += " WHERE date BETWEEN ? AND ?";
                params.push(startDate, endDate);
            } else if (startDate) {
                sql += " WHERE date >= ?";
                params.push(startDate);
            } else if (endDate) {
                sql += " WHERE date <= ?";
                params.push(endDate);
            }

            db.query(sql, params, (err, result) => {
                if (err) {
                    return reject(new Error("Erreur lors de la récupération des paiements."));
                }

                resolve(result);
            });
        });
    }
}

module.exports = new AdminService();