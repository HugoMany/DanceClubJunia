const db = require('../config/database');
const bcrypt = require('bcrypt');
const config = require('../config/config');

class AdminService {
    async getAllStudents() {
        return new Promise((resolve, reject) => {
            const sql = `
          SELECT userID, firstname, surname, email, connectionMethod, tickets, photo FROM Users 
          WHERE userType = 'student'
        `;

            db.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result.length === 0) {
                    return reject(new Error('Aucun élève trouvé.'));
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
                    return reject(new Error('Aucun professeur trouvé.'));
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
                    return reject(new Error('Aucun élève trouvé.'));
                }
                resolve(result);
            });
        });
    }

    async getAllUsers() {
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT userID, firstname, surname, email, connectionMethod, userType, tickets, photo, description FROM Users 
          `;

            db.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result.length === 0) {
                    return reject(new Error('Aucun utilisateur trouvé.'));
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
                    if (err || result.affectedRows == 0) {
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
                    return reject(new Error("La carte existe déjà."));
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
            } // Ticket
            else if (type === 'ticket') {
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

    async createCourse(image, title, type, duration, startDateTime, location, maxParticipants, paymentType, isEvening, recurrence, teachers, links, students, tags, roomPrice) {
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
                    INSERT INTO Courses (image, title, type, duration, startDate, location, maxParticipants, paymentType, isEvening, recurrence, teachersID, links, studentsID, tags, roomPrice, attendance)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;

                    db.query(sql, [image, title, type, duration, startDateTime, location, maxParticipants, paymentType, isEvening, recurrence, JSON.stringify(teacherIDs), JSON.stringify(links), JSON.stringify(studentIDs), JSON.stringify(tagArray), roomPrice, JSON.stringify([])], (err, result) => {
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
                .catch(error => {
                    reject(new Error(error.message));
                });
        });
    }

    async getUserIDsByEmails(emails) {
        return new Promise((resolve, reject) => {
            if (!emails || emails.length === 0) {
                return resolve([]);
            }
            // Sélectionner les IDs correspondant aux adresses e-mail fournies
            const selectSql = 'SELECT userID FROM Users WHERE email IN (?);';
            db.query(selectSql, [emails], (err, rows) => {
                if (err) {
                    return reject(new Error("Erreur lors de la récupération des ID."));
                }
                if (rows.length == 0) {
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
            const checkEmailSql = 'SELECT userID FROM Users WHERE email = ?';
            db.query(checkEmailSql, [email], (err, results) => {
                if (err) {
                    return reject(new Error("Erreur lors de la vérification de l'email."));
                }
                if (results.length > 0) {
                    return reject(new Error("L'email est déjà utilisé."));
                }

                const hashedPassword = bcrypt.hashSync(password, config.saltRounds);
                const sql = `
              INSERT INTO Users (firstname, surname, email, password, connectionMethod, userType, photo, description)
              VALUES (?, ?, ?, ?, ?, 'teacher', ?, ?)
            `;

                db.query(sql, [firstname, surname, email, hashedPassword, connectionMethod, photo, description], (err, result) => {
                    if (err) {
                        return reject(new Error("Erreur lors de la création du compte enseignant."));
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

    async deleteTeacher(teacherID) {
        return new Promise((resolve, reject) => {
            const checkCourseSql = "SELECT userType FROM Users WHERE userID = ?";
            db.query(checkCourseSql, [teacherID], (err, rows) => {
                if (err) {
                    return reject(new Error("Erreur lors de la vérification de l'existence du professeur."));
                }
                if (rows.length === 0) {
                    return reject(new Error("Le professeur spécifié n'existe pas."));
                }
                if (rows[0].userType !== "teacher") {
                    return reject(new Error("Cet utilisateur n'est pas un professeur."));
                }

                const selectSql = 'SELECT teachersID, courseID FROM Courses WHERE JSON_CONTAINS(teachersID, ?)';
                db.query(selectSql, [JSON.stringify([teacherID])], (err, rows) => {
                    if (err) {
                        return reject(new Error("Erreur lors de la récupération du professeur dans le cours."));
                    }

                    let updatePromises = [];

                    rows.forEach(course => {
                        let teacherIDs = JSON.parse(course.teachersID);
                        const index = teacherIDs.indexOf(parseInt(teacherID));
                        if (index !== -1) {
                            teacherIDs.splice(index, 1);
                            const updateSql = 'UPDATE Courses SET teachersID = ? WHERE courseID = ?';
                            const updatedTeacherIDs = JSON.stringify(teacherIDs);

                            updatePromises.push(new Promise((resolveUpdate, rejectUpdate) => {
                                db.query(updateSql, [updatedTeacherIDs, course.courseID], (err, result) => {
                                    if (err || result.affectedRows === 0) {
                                        return rejectUpdate(new Error("Erreur lors de la modification du cours."));
                                    }
                                    resolveUpdate();
                                });
                            }));
                        }
                    });

                    Promise.all(updatePromises).then(() => {
                        const deleteCardsSql = 'DELETE FROM Cards WHERE userID = ?';
                        db.query(deleteCardsSql, [teacherID], (err, result) => {
                            if (err) {
                                return reject(new Error("Erreur lors de la suppression du professeur dans les cartes."));
                            }

                            const deletePaymentsSql = 'DELETE FROM Payments WHERE userID = ?';
                            db.query(deletePaymentsSql, [teacherID], (err, result) => {
                                if (err) {
                                    return reject(new Error("Erreur lors de la suppression des paiements."));
                                }

                                const deleteUserSql = 'DELETE FROM Users WHERE userID = ?';
                                db.query(deleteUserSql, [teacherID], (err, result) => {
                                    if (err || result.affectedRows === 0) {
                                        return reject(new Error("Erreur lors de la suppression du professeur."));
                                    }
                                    resolve(true);
                                });
                            });
                        });
                    }).catch(reject);
                });
            });
        });
    }

    async deleteStudent(studentID) {
        return new Promise((resolve, reject) => {
            const checkCourseSql = "SELECT userType FROM Users WHERE userID = ?";
            db.query(checkCourseSql, [studentID], (err, rows) => {
                if (err) {
                    return reject(new Error("Erreur lors de la vérification de l'existence de l'étudiant."));
                }
                if (rows.length === 0) {
                    return reject(new Error("L'étudiant spécifié n'existe pas."));
                }
                if (rows[0].userType !== "student") {
                    return reject(new Error("Cet utilisateur n'est pas un étudiant."));
                }

                const selectSql = 'SELECT studentsID, courseID FROM Courses WHERE JSON_CONTAINS(studentsID, ?)';
                db.query(selectSql, [JSON.stringify([studentID])], (err, rows) => {
                    if (err) {
                        return reject(new Error("Erreur lors de la récupération de l'étudiant dans le cours."));
                    }

                    let updatePromises = [];

                    rows.forEach(course => {
                        let studentIDs = JSON.parse(course.studentsID);
                        const index = studentIDs.indexOf(parseInt(studentIDs));
                        if (index !== -1) {
                            studentIDs.splice(index, 1);
                            const updateSql = 'UPDATE Courses SET studentsID = ? WHERE courseID = ?';
                            const updatedStudentIDs = JSON.stringify(studentIDs);

                            updatePromises.push(new Promise((resolveUpdate, rejectUpdate) => {
                                db.query(updateSql, [updatedStudentIDs, course.courseID], (err, result) => {
                                    if (err || result.affectedRows === 0) {
                                        return rejectUpdate(new Error("Erreur lors de la modification du cours."));
                                    }
                                    resolveUpdate();
                                });
                            }));
                        }
                    });

                    Promise.all(updatePromises).then(() => {
                        const deleteCardsSql = 'DELETE FROM Cards WHERE userID = ?';
                        db.query(deleteCardsSql, [studentID], (err, result) => {
                            if (err) {
                                return reject(new Error("Erreur lors de la suppression de l'étudiant dans les cartes."));
                            }

                            const deletePaymentsSql = 'DELETE FROM Payments WHERE userID = ?';
                            db.query(deletePaymentsSql, [studentID], (err, result) => {
                                if (err) {
                                    return reject(new Error("Erreur lors de la suppression des paiements."));
                                }

                                const deleteUserSql = 'DELETE FROM Users WHERE userID = ?';
                                db.query(deleteUserSql, [studentID], (err, result) => {
                                    if (err || result.affectedRows === 0) {
                                        return reject(new Error("Erreur lors de la suppression de l'étudiant."));
                                    }
                                    resolve(true);
                                });
                            });
                        });
                    }).catch(reject);
                });
            });
        });
    }

    async modifyTeacher(teacherID, values, fieldsToUpdate) {
        return new Promise((resolve, reject) => {
            const sql = `
            UPDATE Users
            SET ${fieldsToUpdate.join(', ')}
            WHERE userID = ? AND userType = 'teacher'
          `;

            db.query(sql, values, (err, result) => {
                if (err) {
                    return reject(new Error("Erreur lors de la modification du professeur."));
                }
                if (result.affectedRows == 0) {
                    return reject(new Error("Il n'existe pas de professeur avec cet ID."));
                }
                const selectSql = 'SELECT userID, firstname, surname, email, connectionMethod, tickets, photo, description FROM Users WHERE userID = ?';
                db.query(selectSql, [teacherID], (err, rows) => {
                    if (err) {
                        return reject(new Error("Erreur lors de la récupération du professeur."));
                    }

                    resolve(rows);
                });
            });
        });
    }

    async calculateRevenue(startDate = '1970-01-01', endDate = new Date().toISOString().slice(0, 10)) {
        return new Promise((resolve, reject) => {
            if (!startDate || startDate == "") {
                startDate = '1970-01-01';
            }
            if (!endDate || endDate == "") {
                endDate = new Date().toISOString().slice(0, 10);
            }
            const query = `
                SELECT c.courseID, c.roomPrice, p.userID, p.price, p.date, c.teachersID
                FROM Payments p
                JOIN (
                SELECT userID, itemID, MAX(date) as latestDate 
                FROM Payments 
                WHERE date BETWEEN ? AND ? 
                GROUP BY userID, itemID
                ) as latestPayments
                ON p.userID = latestPayments.userID 
                AND p.itemID = latestPayments.itemID 
                AND p.date = latestPayments.latestDate
                JOIN Courses c ON p.itemID = c.courseID
                WHERE p.price > 0
            `;

            db.query(query, [startDate, endDate], (err, results) => {
                if (err) {
                    return reject(new Error("Erreur lors du calcul des revenus."));
                }
                if (results.length === 0) {
                    return reject(new Error("Aucun paiement trouvé."));
                }

                const courses = {};
                const assoPercentage = 0.30; // Pourcentage des revenus destinés à l'association
                const teacherPercentage = 0.70; // Pourcentage des revenus destinés aux professeurs
                let totalProfit = 0;
                let assoPart = 0;
                const teachersRevenue = {};
                results.forEach(payment => {
                    const courseId = payment.courseID;

                    if (!courses[courseId]) {
                        courses[courseId] = {
                            courseID: courseId,
                            roomPrice: payment.roomPrice
                        };
                    }

                    // Calcul du profit net pour le cours en soustrayant le prix de la salle
                    const courseProfit = payment.price - payment.roomPrice;
                    courses[courseId].totalProfit += courseProfit;

                    // Calcul des parts pour ce paiement
                    assoPart += courseProfit * assoPercentage;
                    const teachersPart = courseProfit * teacherPercentage;

                    // Calcul de la part individuelle des professeurs
                    const teacherIDs = JSON.parse(payment.teachersID);
                    const individualTeacherPart = teachersPart / teacherIDs.length;

                    // Distribution des revenus aux professeurs
                    teacherIDs.forEach(teacherID => {
                        if (!teachersRevenue[teacherID]) {
                            teachersRevenue[teacherID] = 0;
                        }
                        if (courseProfit > 0) {
                            teachersRevenue[teacherID] += individualTeacherPart;
                        }
                    });

                    // Ajouter le profit net du cours au revenu total
                    totalProfit += courseProfit;
                });

                const teachersRevenueList = Object.entries(teachersRevenue).map(([teacherID, revenue]) => ({
                    teacherID: parseInt(teacherID, 10),
                    revenue
                }));

                resolve({
                    totalProfit: totalProfit,
                    assoPart: assoPart,
                    teachersRevenue: teachersRevenueList
                });
            });
        });
    }

}




module.exports = new AdminService();