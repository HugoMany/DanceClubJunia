const db = require('../config/database');

class UserService {
  async generateResetToken(userID) {
    return new Promise((resolve, reject) => {
      const generateToken = () => Math.floor(100000 + Math.random() * 900000); // Génère un nombre à 6 chiffres

      let token = generateToken();

      const checkTokenUnique = (token) => {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM ResetPassword WHERE token = ?';
          db.query(sql, [token], (err, result) => {
            if (err) return reject(err);
            resolve(result.length === 0);
          });
        });
      };

      const insertToken = (userID, token) => {
        const sql = 'INSERT INTO ResetPassword (token, userID, date) VALUES (?, ?, NOW())';
        return new Promise((resolve, reject) => {
          db.query(sql, [token, userID], (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });
      };

      (async () => {
        try {
          let isUnique = await checkTokenUnique(token);
          while (!isUnique) {
            token = generateToken();
            isUnique = await checkTokenUnique(token);
          }
          await insertToken(userID, token);
          resolve(token);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  async resetPassword(token, newPassword) {
    return new Promise((resolve, reject) => {
      const getTokenInfo = (token) => {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM ResetPassword WHERE token = ?';
          db.query(sql, [token], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
          });
        });
      };

      const updatePassword = (userID, newPassword) => {
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        const sql = 'UPDATE Users SET password = ? WHERE userID = ?';
        return new Promise((resolve, reject) => {
          db.query(sql, [hashedPassword, userID], (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });
      };

      const deleteToken = (token) => {
        const sql = 'DELETE FROM ResetPassword WHERE token = ?';
        return new Promise((resolve, reject) => {
          db.query(sql, [token], (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });
      };

      (async () => {
        try {
          const tokenInfo = await getTokenInfo(token);
          if (!tokenInfo) {
            return reject(new Error('Invalid token'));
          }

          const tokenDate = new Date(tokenInfo.date);
          const currentDate = new Date();
          const diffMinutes = Math.floor((currentDate - tokenDate) / (1000 * 60));

          if (diffMinutes > 5) {
            return reject(new Error('Token expired'));
          }

          await updatePassword(tokenInfo.userID, newPassword);
          await deleteToken(token);
          resolve();
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
  
}

module.exports = new UserService();
