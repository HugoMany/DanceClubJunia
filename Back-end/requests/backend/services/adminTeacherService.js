const db = require('../config/database');

class AdminTeacherService {
    async addPlaceStudent(userID, studentID, type, number) {
        return new Promise((resolve, reject) => {
          let priceQuery;
          if (type === "card") {
            priceQuery = 'SELECT price FROM Places WHERE type = ? AND number = ?';
          } else {
            priceQuery = 'SELECT price FROM Places WHERE type = ?';
          }
    
          // Récupération du prix
          db.query(priceQuery, [type, number], (err, result) => {
            if (err) {
              return reject(err);
            }
    
            if (result.length == 0) {
              return reject(new Error('Place not found'));
            }
    
            let price = result[0].price;
            if (type !== "card") {
              price *= number; // Prix proportionnel au nombre de tickets ou de mois d'abonnement achetés
            }
    
            let sql;
            switch (type) {
              case 'ticket':
                sql = 'UPDATE Users SET tickets = tickets + ? WHERE userID = ?';
                db.query(sql, [number, studentID], (err, result) => {
                  if (err) {
                    return reject(err);
                  }
                  if (result.affectedRows === 0) {
                    return reject(new Error('StudentID does not exist'));
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
                  if (result.affectedRows === 0) {
                    return reject(new Error('User does not exist'));
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
                  if (result.affectedRows === 0) {
                    return reject(new Error('User does not exist'));
                  }
                  resolve(result);
                });
                break;
            }
    
            const paymentSql = "INSERT INTO Payments (userID, price, type, quantity, date, paymentType, sourceID) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, 'cash', ?);"
            db.query(paymentSql, [studentID, price, type, number, userID], (err, result) => {
              if (err) {
                return reject(err);
              }
              resolve(result);
            });
          });
        });
      }

      async removeLink(courseID, userID, link) {
        return new Promise((resolve, reject) => {
            const checkUserTypeSql = "SELECT userType FROM Users WHERE userID = ?";
            db.query(checkUserTypeSql, [userID], (err, result) => {
                if (err) {
                    return reject(err);
                }

                if(result.length == 0) {
                    return reject(new Error("This userID doesn't exist"));
                }

                userID = userID.toString();
                
    
                // Si c'est un étudiant
                if (result.length > 0 && result[0].userType == "student") {
                    return reject(new Error('User is a student'));
                } 
                // On vérifie si c'est un professeur
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
                        // Si le professeur n'est pas inscrit au cours
                        if (result.length === 0 || result[0].isParticipant === 0) {

                            return reject(new Error("Erreur : teacher or course doesn't exist"));
                        }
                        // Continuer le processus de suppression du lien
                        proceedWithLinkRemoval();
    
                        
                    });
                } 
                else if (result.length > 0 && result[0].userType == "admin") {
                    proceedWithLinkRemoval();
    
                } 
                else {
                    return reject(new Error("UserID invalid or course doesn't exist"));
                }

                
    
                function proceedWithLinkRemoval() {
                    const selectSql = "SELECT links FROM Courses WHERE courseID = ? AND JSON_CONTAINS(links, ?, '$')";
                    db.query(selectSql, [courseID, `"${link}"`], (err, rows) => {
                        if (err) {
                            return reject(err);
                        }
                        if (rows.length === 0) {
                            return reject(new Error('Invalid parameters or link not found'));
                        }
    
                        let links = [];
                        if (rows.length > 0) {
                            links = JSON.parse(rows[0].links);
                        }
    
                        // Retirer le lien de la liste
                        const index = links.indexOf(link);
    
                        if (index !== -1) {
                            links.splice(index, 1);
    
                            // Mettre à jour la liste des liens dans la base de données
                            const updateSql = 'UPDATE Courses SET links = ? WHERE courseID = ?';
                            const updatedLinks = JSON.stringify(links);
                            db.query(updateSql, [updatedLinks, courseID], (err, result) => {
                                if (err) {
                                    return reject(err);
                                }
                                if(result.affectedRows == 0) {
                                    return reject(new Error("This course doesn't exist"));
                                }


                                resolve({ success: true, result });
                            });
                        } else {
                            return reject(new Error('Link not found in the course'));
                        }
                    });
                }
            });
        });
    }
    
    async addTag(userID, courseID, tag) {
      return new Promise(async (resolve, reject) => {
          const checkUserTypeSql = "SELECT userType FROM Users WHERE userID = ?";
          const selectTagsSql = "SELECT tags FROM Courses WHERE courseID = ?";
          const updateTagSql = "UPDATE Courses SET tags = JSON_ARRAY_APPEND(tags, '$', ?) WHERE courseID = ?";
  
          db.query(checkUserTypeSql, [userID], (err, result) => {
              userID = userID.toString();
              if (err) {
                  return reject(err);
              }
  
              if (result.length > 0 && result[0].userType == "student") {
                  return reject(new Error("Students are not allowed to add tags to courses."));
              } else if (result.length > 0 && result[0].userType == "teacher") {
                  const checkTeacherSql = "SELECT JSON_CONTAINS(teachersID, ?) AS isParticipant FROM Courses WHERE courseID = ?";
                  db.query(checkTeacherSql, [userID, courseID], (err, result) => {
                      if (err) {
                          return reject(err);
                      }
  
                      if (result.length > 0 && result[0].isParticipant) {
                          db.query(selectTagsSql, [courseID], (err, result) => {
                              if (err) {
                                  return reject(err);
                              }
  
                              const tags = JSON.parse(result[0].tags);
                              if (tags.includes(tag)) {
                                  return resolve({ success: false, message: "Tag already exists for this course." });
                              } else {
                                  db.query(updateTagSql, [tag, courseID], (err, result) => {
                                      if (err) {
                                          return reject(err);
                                      }
                                      resolve(result);
                                  });
                              }
                          });
                      } else {
                          return resolve({ success: false, message: "Teacher not enrolled in course" });
                      }
                  });
              } else if (result.length > 0 && result[0].userType == "admin") { // Si l'utilisateur est un admin
                  db.query(selectTagsSql, [courseID], (err, result) => {
                      if (err) {
                          return reject(err);
                      }
  
                      const tags = JSON.parse(result[0].tags);
                      if (tags.includes(tag)) {
                          return resolve({ success: false, message: "Tag already exists for this course." });
                      } else {
                          db.query(updateTagSql, [tag, courseID], (err, result) => {
                              if (err) {
                                  return reject(err);
                              }
                              resolve(result);
                          });
                      }
                  });
              }
              else {
                return reject(err);
              }
          });
      });
  }
  
  async removeTag(courseID, userID, tag) {
    return new Promise((resolve, reject) => {
        const checkUserTypeSql = "SELECT userType FROM Users WHERE userID = ?";
        db.query(checkUserTypeSql, [userID], (err, result) => {
            if (err) {
                return reject(err);
            }

            if(result.length == 0) {
                return reject(new Error("This userID doesn't exist"));
            }

            userID = userID.toString();
            

            // Si c'est un étudiant
            if (result.length > 0 && result[0].userType == "student") {
                return reject(new Error('User is a student'));
            } 
            // On vérifie si c'est un professeur
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
                    // Si le professeur n'est pas inscrit au cours
                    if (result.length === 0 || result[0].isParticipant === 0) {
                        return reject(new Error("Erreur : teacher or course doesn't exist"));
                    }
                    // Continuer le processus de suppression du lien
                    proceedWithTagRemoval();

                    
                });
            } 
            else if (result.length > 0 && result[0].userType == "admin") {
                proceedWithTagRemoval();

            } 
            else {
                return reject(new Error("UserID invalid or course doesn't exist"));
            }

            

            function proceedWithTagRemoval() {
                const selectSql = "SELECT tags FROM Courses WHERE courseID = ? AND JSON_CONTAINS(tags, ?, '$')";
                db.query(selectSql, [courseID, `"${tag}"`], (err, rows) => {
                    if (err) {
                        return reject(err);
                    }
                    if (rows.length === 0) {
                        return reject(new Error('Invalid parameters or tag not found'));
                    }

                    let tags = [];
                    if (rows.length > 0) {
                      tags = JSON.parse(rows[0].tags);
                    }

                    // Retirer le lien de la liste
                    const index = tags.indexOf(tag);

                    if (index !== -1) {
                      tags.splice(index, 1);

                        // Mettre à jour la liste des liens dans la base de données
                        const updateSql = 'UPDATE Courses SET tags = ? WHERE courseID = ?';
                        const updatedTags = JSON.stringify(tags);
                        db.query(updateSql, [updatedTags, courseID], (err, result) => {
                            if (err) {
                                return reject(err);
                            }
                            if(result.affectedRows == 0) {
                                return reject(new Error("This course doesn't exist"));
                            }


                            resolve({ success: true, result });
                        });
                    } else {
                        return reject(new Error('Tag not found in the course'));
                    }
                });
            }
        });
    });
}

};

module.exports = new AdminTeacherService();