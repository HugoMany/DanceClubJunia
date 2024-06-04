const db = require('../config/database');

class TeacherService {
  async getStudent(studentID) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM Users 
        WHERE userID = ?
      `;
  
      db.query(sql, [studentID], (err, result) => {
        if (err) {
            return reject(err);
        }
        resolve(result);
      });
    });
  }

  async newStudent(firstname, surname, email, password, connectionMethod, credit) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO Users (firstname, surname, email, password, connectionMethod, userType, credit)
        VALUES (?, ?, ?, ?, ?, 'student', ?)
      `;
    
      db.query(sql, [firstname, surname, email, password, connectionMethod, credit], (err, result) => {
        if (err) {
          return reject(err);
        }
    
        // Récupérer l'ID de l'utilisateur nouvellement inséré
        const newUserID = result.insertId;
    
        // Sélectionner les informations complètes de l'utilisateur nouvellement inséré
        const selectSql = 'SELECT * FROM Users WHERE userID = ?';
        db.query(selectSql, [newUserID], (err, rows) => {
          if (err) {
            return reject(err);
          }
    
          // Renvoi de la ligne nouvellement insérée
          resolve(rows);
        });
      });
    });
  }

  async modifyStudent(studentID, values, fieldsToUpdate) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Users
        SET ${fieldsToUpdate.join(', ')}
        WHERE userID = ?
      `;
    
      db.query(sql, values, (err, result) => {
        if (err) {
          return reject(err);
        }
    
        // Si la mise à jour a réussi, récupérer les informations mises à jour de l'utilisateur
        if (result.affectedRows > 0) {
          const selectSql = 'SELECT * FROM Users WHERE userID = ?';
          db.query(selectSql, [studentID], (err, rows) => {
            if (err) {
              return reject(err);
            }
    
            // Renvoi de la ligne mise à jour
            resolve(rows);
          });
        } else {
          return reject(err);
        }
      });
    });
  }

  async removeStudent(courseID, studentID) {
    return new Promise((resolve, reject) => {
      const selectSql = 'SELECT studentsID FROM Courses WHERE courseID = ?';
      db.query(selectSql, [courseID], (err, rows) => {
        if (err) {
          return reject(err);
        }
    
        let studentsID = [];
        if (rows.length > 0) {
          studentsID = JSON.parse(rows[0].studentsID);
        }
    
        // Retirer l'étudiant de la liste
        const index = studentsID.indexOf(parseInt(studentID));
    
        if (index !== -1) {
          studentsID.splice(index, 1);
    
          // Mettre à jour la liste des étudiants dans la base de données
          const updateSql = 'UPDATE Courses SET studentsID = ? WHERE courseID = ?';
          const updatedStudentsID = JSON.stringify(studentsID);
          db.query(updateSql, [updatedStudentsID, courseID], (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve(result);
          });
        } else {
          return reject(err);
        }
      });
    });
  }

  async cancelCourse(courseID) {
    return new Promise((resolve, reject) => {
    const selectSql = 'DELETE FROM Courses WHERE startDate > CURRENT_DATE AND courseID = ?;';
    db.query(sql, [courseID], (err, result) => {
      if (err) {
          return reject(err);
      }
      resolve(result);
    });
  })
    
    
  }

}

module.exports = new TeacherService();