const express = require('express');
const { truncate } = require('fs');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;

// Configurer la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin123',
  password: 'admin123',
  database: 'requests'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

app.use(express.json());

// ---------------------------------
// ---------- STUDENT --------------
// ---------------------------------

app.post('/addCredit', (req, res) => {
  let { studentID, credit } = req.body;
  credit = parseInt(credit);

  console.log("addCredit | studentID, credit : " + studentID + ", " + credit);

  // Vérifier si credit est un entier
  if (!Number.isInteger(credit)) {
    res.json(false);
    return console.error('addCredit | error: credit is not an integer');
  }

  // Vérifier si credit est négatif ou nul
  if (credit <= 0) {
    res.json(false);
    return console.error('addCredit | error: invalid credit');
  }

  // Vérifier si studentID est négatif ou nul
  if (studentID <= 0) {
    res.json(false);
    return console.error('addCredit | error: invalid studentID');
  }

  const sql = `
    UPDATE Users 
    SET credit = credit + ?
    WHERE userID = ?
  `;

  db.query(sql, [credit, studentID], (err, result) => {
    if (err) {
      res.json(false);
      return console.error('addCredit | error executing query: ' + err.stack);
    }
    res.json(true);
  });
});



app.post('/getSubscriptionEndDate', (req, res) => {

  const { studentID } = req.body;
  
  console.log("getSubscriptionEndDate | studentID : " + studentID);
  
  const sql_request = "SELECT subscriptionEnd FROM Users WHERE userID = ?";

  db.query(sql_request, [studentID], (err, result) => {
    if (err) {
      console.error('error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }

    if (result.length > 0) {
      res.json({ subscriptionEndDate: result[0].subscriptionEnd });
    } else {
      console.log("getSubscriptionEndDate : No subscription end date found for the given student ID")
      res.status(404).send('No subscription end date found for the given student ID');
    }
  });
});

app.post('/getCourses', (req, res) => {
  const { studentID } = req.body;

  // Vérifier si studentID est négatif ou nul
  if (studentID <= 0) {
    res.json(false);
    return console.error('addCredit | error: invalid studentID');
  }
  
  console.log("getCourses | studentID : " + studentID);

  const sql = `
    SELECT * FROM Courses 
    WHERE JSON_CONTAINS(studentsID, ?)
  `;

  // Afficher la requête SQL avec les valeurs substituées
  const formattedSql = mysql.format(sql, [studentID]);
  console.log('getCourses | Executing SQL query:', formattedSql);

  db.query(sql, [studentID], (err, result) => {
    if (err) {
      res.json(false);
      return console.error('getCourses | error executing query: ' + err.stack);
    }
    
    res.json(result);
  });
});

app.post('/addLink', (req, res) => {
  const { studentID, courseID, link } = req.body;

  console.log("addLink | studentID, courseID, link, : " + studentID + ", "+ courseID +", " + link);

  if(link == "") {
    res.json(false);
    return console.error('addLink | error: need text link');
  }

  // SQL pour vérifier si l'étudiant est inscrit au cours
  const checkStudentSql = `
    SELECT JSON_CONTAINS(studentsID, ?) AS isParticipant
    FROM Courses
    WHERE courseID = ?
  `;

  db.query(checkStudentSql, [studentID, courseID], (err, result) => {
    if (err) {
      res.json(false);
      console.log("addLink | Error executing query")
      return;
    }

    // Si l'étudiant est inscrit au cours
    if (result.length > 0 && result[0].isParticipant) {
      // SQL pour ajouter le lien à la colonne links
      const updateLinkSql = `
        UPDATE Courses
        SET links = JSON_ARRAY_APPEND(links, '$', ?)
        WHERE courseID = ?
      `;

      db.query(updateLinkSql, [link, courseID], (err, result) => {
        if (err) {
          res.json(false);
          console.log("addLink | Error executing query")
          return;
        }

        res.json(true);
      });
    } else {

      res.json(false);
      console.log("addLink | Student not enrolled in course")
    }
  });
});

app.post('/buyPlace', (req, res) => {
  let { studentID, type, number } = req.body;
  number = parseInt(number);
  console.log("buyPlace | studentID, type, number : " + studentID + ", " + type + ", " + number);

  // Vérifier si number est un entier
  if (!Number.isInteger(number)) {
    res.json(false);
    console.log("number",number,Number.isInteger(number),1,Number.isInteger(1));
    return console.error('buyPlace | error: number is not an integer');
  }

  // Vérifier si number est négatif ou nul
  if (number <= 0) {
    res.json(false);
    return console.error('buyPlace | error: invalid number');
  }

  // Vérifier si studentID est négatif ou nul
  if (studentID <= 0) {
    res.json(false);
    return console.error('buyPlace | error: invalid studentID');
  }
  let priceQuery;
  if(type=="card"){
    priceQuery = 'SELECT price FROM Places WHERE type = ? AND number = ' + number;
  }
  else{
    priceQuery = 'SELECT price FROM Places WHERE type = ?';
  }
  const updateUserCreditQuery = 'UPDATE Users SET credit = credit - ? WHERE userID = ?';

  // Récupération du prix
  db.query(priceQuery, [type], (err, result) => {
    if (err) {
      res.json(false);
      return console.error('buyPlace | error executing query: ' + err.stack);
    }

    let price = result[0].price;
    if(type!="card"){
      price *= number; // Prix proportionnel au nombre de tickets ou de mois d'abonnement achetés
    }

    if(!price){
      res.json(false);
      return console.error('buyPlace | place not found ');
    }

    // Vérifier si l'utilisateur a suffisamment de crédits
    const getUserCreditQuery = 'SELECT credit FROM Users WHERE userID = ?';
    db.query(getUserCreditQuery, [studentID], (err, result) => {
      if (err) {
        console.error('Error retrieving user credit:', err);
        res.json(false);
      } else {
        const userCredit = result[0].credit;
          
        if (userCredit >= price) {
          // Soustraire le prix du ticket du crédit de l'utilisateur
          db.query(updateUserCreditQuery, [price, studentID], (err, result) => {
            if (err) {
              console.error('Error updating user credit:', err);
              res.json(false);
            } else {
              console.log(`${price} credit deduced from user ${studentID}`);
              // Ajout du ticket/carte/abonnement au user
              let sql;
            
              switch (type) {
                case 'ticket':
                  sql = `
                    UPDATE Users 
                    SET tickets = tickets + ?
                    WHERE userID = ?
                  `;
            
                  db.query(sql, [number, studentID], (err, result) => {
                    if (err) {
                      res.json(false);
                      return console.error('buyPlace | error executing query: ' + err.stack);
                    }
                    res.json(true);
                  });
                  break;
                case 'card':
                  sql = `
                    INSERT INTO Cards (userID, number, maxNumber)
                    VALUES (?, 0, ?);
                  `;
            
                  db.query(sql, [studentID, number], (err, result) => {
                    if (err) {
                      res.json(false);
                      return console.error('buyPlace | error executing query: ' + err.stack);
                    }
                    res.json(true);
                  });
                  break;
                case 'subscription':
                  const days = number*30; // Nombre
                  sql = `
                    UPDATE Users
                    SET subscriptionEnd = DATE_ADD(subscriptionEnd, INTERVAL `+ days + ` DAY)
                    WHERE userID = '` + studentID + `'
                  `;

                  // Afficher la requête SQL avec les valeurs substituées
                  const formattedSql = mysql.format(sql);
                  console.log('buyPlace | Executing SQL query:', formattedSql);
            
                  db.query(sql, [number, studentID], (err, result) => {
                    if (err) {
                      res.json(false);
                      return console.error('buyPlace | error executing query: ' + err.stack);
                    }
                    res.json(true);
                  });
              }
            }
          });
        } else {
          console.log(`Insufficient credit for user ${studentID}`);
          res.json(false);
        }
      }
    });

  });
});

app.post('/getPaymentsHistory', (req, res) => {

  const { studentID } = req.body;
  
  console.log("getPaymentsHistory | studentID : " + studentID);
  
  const sql = `
    SELECT paymentID, userID, price, type, quantity, date, paymentType 
    FROM Payments 
    WHERE userID = ?
    ORDER BY date DESC
  `;

  db.query(sql, [studentID], (err, results) => {
    if (err) {
      console.error('getPaymentsHistory : error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }

    if (results.length > 0) {
      res.json({ success: true, payments: results });
    } else {
      console.log("getSubscriptionEndDate : No subscription end date found for the given student ID")
      res.status(404).send('No subscription end date found for the given student ID');
    }
  });
});

app.post('/resetPassword', (req, res) => {
  const { studentID } = req.body;

  console.log("resetPassword | studentID : " + studentID);

  // Générer un token aléatoire de 6 chiffres
  const generateToken = () => {
    return Math.floor(100000 + Math.random() * 900000); // Génère un nombre à 6 chiffres
  };

  let token = generateToken();

  // Vérifier l'unicité du token
  const checkTokenUnique = async (token) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM ResetPassword WHERE token = ?';
      db.query(sql, [token], (err, result) => {
        if (err) return reject(err);
        resolve(result.length === 0);
      });
    });
  };

  const insertToken = async (studentID, token) => {
    const sql = 'INSERT INTO ResetPassword (token, userID, date) VALUES (?, ?, NOW())';
    return new Promise((resolve, reject) => {
      db.query(sql, [token, studentID], (err, result) => {
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
      await insertToken(studentID, token);
      //
      //
      //    ENVOYER UN LIEN PAR MAIL ICI
      //    RAJOUTER VERIFICATION QUOTIDIENNE DES TOKENS OBSELETES DANS LA BDD POUR LES SUPPRIMER
      //
      // SUPPRIMER LE RETURN DU TOKEN 
      
      res.json({ success: true, message: 'Token generated and stored', token });
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({ success: false, message: 'Error generating token' });
    }
  })();
});

app.post('/resetPasswordToken', (req, res) => {
  const { token, newPassword } = req.body;

  console.log("resetPassword | token, newPassword : " + token, newPassword);

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
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE Users SET password = ? WHERE userID = ?';
      db.query(sql, [newPassword, userID], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };

  const deleteToken = (token) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM ResetPassword WHERE token = ?';
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
        console.log("resetPassword | Invalid token ");
        res.status(400).json({ success: false, message: 'Invalid token' });
        return;
      }

      const tokenDate = new Date(tokenInfo.date);
      const currentDate = new Date();
      const diffMinutes = Math.floor((currentDate - tokenDate) / (1000 * 60));

      if (diffMinutes > 5) {
        console.log("resetPassword | Token expired ");
        res.status(400).json({ success: false, message: 'Token expired' });
        return;
      }

      await updatePassword(tokenInfo.userID, newPassword);
      await deleteToken(token);
      res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
      console.error("Error: ", error);
      console.log("resetPassword | Error resetting password ");
      res.status(500).json({ success: false, message: 'Error resetting password' });
    }
  })();
});

// Servir les fichiers statiques de l'application React
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});