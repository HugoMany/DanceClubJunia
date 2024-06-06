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
                    return reject(err);
                }
    
                // Vérifier si le cours existe
                if (rows[0].count === 0) {
                    return reject(new Error("Le cours spécifié n'existe pas."));
                }
    
                // Si le cours existe, procéder à sa suppression
                const sql = 'DELETE FROM Courses WHERE courseID = ?';
                db.query(sql, [courseID], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
    
                    // Vérifier si la suppression a réussi
                    if (result.affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            });
        });
    }    

    async createCard(place, price) {
        return new Promise((resolve, reject) => {
            // Vérifier si une carte de N places existe déjà
            const checkExistingCardSql = 'SELECT COUNT(*) AS count FROM Places WHERE type = ? AND number = ?';
            db.query(checkExistingCardSql, ['card', place], (err, rows) => {
                if (err) {
                    return reject(err);
                }
    
                // Vérifier si une carte de N places existe déjà
                if (rows[0].count > 0) {
                    return reject(new Error('Une carte de ' + place + ' places existe déjà.'));
                }
    
                // Insérer la nouvelle carte de N places si aucune carte de N places n'existe déjà
                const insertCardSql = `INSERT INTO Places (type, price, number) VALUES ('card', ?, ?)`;
                db.query(insertCardSql, [price, place], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
    
                    // Vérifier si l'insertion a réussi
                    if (result.affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            });
        });
    }
    
    async deleteCard(place) {
        return new Promise((resolve, reject) => {
            // Requête pour vérifier si la carte existe
            const checkCardSql = 'SELECT COUNT(*) AS count FROM Places WHERE type = ? AND number = ?';
            db.query(checkCardSql, ['card', place], (err, rows) => {
                if (err) {
                    return reject(err);
                }
    
                // Vérifier si la carte existe
                if (rows[0].count === 0) {
                    return reject(new Error('La carte spécifiée n\'existe pas.'));
                }
    
                // Si la carte existe, procéder à sa suppression
                const deleteSql = 'DELETE FROM Places WHERE type = ? AND number = ?';
                db.query(deleteSql, ['card', place], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
    
                    // Vérifier si la suppression a réussi
                    if (result.affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
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
                // Vérifier si le nombre d'utilisations est un entier valide
                if (isNaN(number)) {
                    return reject(new Error("Nombre d'utilisations de la carte non valide."));
                }
                // Vérifier si la carte avec le nombre d'utilisations spécifié existe
                const checkCardSql = `SELECT COUNT(*) AS count FROM Places WHERE type = 'card' AND number = ?`;
                db.query(checkCardSql, [number], (err, rows) => {
                    if (err) {
                        return reject(err);
                    }
                    if (rows[0].count === 0) {
                        return reject(new Error("La carte avec le nombre d'utilisations spécifié n'existe pas."));
                    }
                    // Construire la requête SQL pour mettre à jour le prix de la carte
                    const updateCardSql = `UPDATE Places SET price = ? WHERE type = 'card' AND number = ?`;
                    // Exécuter la requête avec les paramètres de prix et de nombre d'utilisations
                    db.query(updateCardSql, [price, number], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        // Vérifier si la mise à jour a affecté au moins une ligne
                        if (result.affectedRows > 0) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    });
                });
            } else if (type === 'ticket' || type === 'subscription') {
                // Construire la requête SQL pour mettre à jour le prix du ticket ou de l'abonnement
                const updateSql = `UPDATE Places SET price = ? WHERE type = ?`;
                // Exécuter la requête avec les paramètres de prix et de type
                db.query(updateSql, [price, type], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    // Vérifier si la mise à jour a affecté au moins une ligne
                    if (result.affectedRows > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
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
                    // Requête SQL pour créer le cours
                    const sql = `
                        INSERT INTO Courses (image, title, type, duration, startDate, location, maxParticipants, paymentType, isEvening, recurrence, teachersID, links, studentsID, tags)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `;
    
                    // Exécution de la requête avec les paramètres fournis
                    db.query(sql, [image, title, type, duration, startDateTime, location, maxParticipants, paymentType, isEvening, recurrence, JSON.stringify(teacherIDs), JSON.stringify(links), JSON.stringify(studentIDs), JSON.stringify(tagArray)], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
    
                        // Récupérer la ligne ajoutée dans la table Courses
                        const selectSql = 'SELECT * FROM Courses WHERE courseID = ?';
                        db.query(selectSql, [result.insertId], (err, rows) => {
                            if (err) {
                                return reject(err);
                            }
    
                            // Renvoyer la ligne ajoutée
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
                    return reject(err);
                }
    
                // Extraire les IDs des résultats
                const ids = rows.map(row => row.userID);
    
                resolve(ids);
            });
        });
    }
    
    async createTeacher(firstname, surname, email, password, connectionMethod, photo, description) {
        return new Promise((resolve, reject) => {
            // Requête SQL pour créer le professeur
            const sql = `
                INSERT INTO Users (firstname, surname, email, password, connectionMethod, userType, photo, description)
                VALUES (?, ?, ?, ?, ?, 'teacher', ?, ?)
            `;
    
            // Exécution de la requête avec les paramètres fournis
            db.query(sql, [firstname, surname, email, password, connectionMethod, photo, description], (err, result) => {
                if (err) {
                    return reject(err);
                }
    
                // Vérification de l'insertion réussie
                if (result.affectedRows > 0) {
                    // Récupérer les informations du professeur ajouté
                    const selectSql = 'SELECT * FROM Users WHERE userID = ?';
                    db.query(selectSql, [result.insertId], (err, rows) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(rows[0]);
                    });
                } else {
                    resolve(false);
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
          return reject(err);
        }

        resolve(result);
      });
    });
  }
}

module.exports = new AdminService();