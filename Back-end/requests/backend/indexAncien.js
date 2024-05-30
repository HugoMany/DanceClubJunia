const express = require('express');
const { truncate } = require('fs');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;

// Configurer la base de donn�es MySQL
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

  // V�rifier si credit est un entier
  if (!Number.isInteger(credit)) {
    res.json(false);
    return console.error('addCredit | error: credit is not an integer');
  }

  // V�rifier si credit est n�gatif ou nul
  if (credit <= 0) {
    res.json(false);
    return console.error('addCredit | error: invalid credit');
  }

  // V�rifier si studentID est n�gatif ou nul
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

  // V�rifier si studentID est n�gatif ou nul
  if (studentID <= 0) {
    res.json(false);
    return console.error('addCredit | error: invalid studentID');
  }
  
  console.log("getCourses | studentID : " + studentID);

  const sql = `
    SELECT * FROM Courses 
    WHERE JSON_CONTAINS(studentsID, ?)
  `;

  // Afficher la requ�te SQL avec les valeurs substitu�es
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

  // SQL pour v�rifier si l'�tudiant est inscrit au cours
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

    // Si l'�tudiant est inscrit au cours
    if (result.length > 0 && result[0].isParticipant) {
      // SQL pour ajouter le lien � la colonne links
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

  // V�rifier si number est un entier
  if (!Number.isInteger(number)) {
    res.json(false);
    console.log("number",number,Number.isInteger(number),1,Number.isInteger(1));
    return console.error('buyPlace | error: number is not an integer');
  }

  // V�rifier si number est n�gatif ou nul
  if (number <= 0) {
    res.json(false);
    return console.error('buyPlace | error: invalid number');
  }

  // V�rifier si studentID est n�gatif ou nul
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

  // R�cup�ration du prix
  db.query(priceQuery, [type], (err, result) => {
    if (err) {
      res.json(false);
      return console.error('buyPlace | error executing query: ' + err.stack);
    }

    let price = result[0].price;
    if(type!="card"){
      price *= number; // Prix proportionnel au nombre de tickets ou de mois d'abonnement achet�s
    }

    if(!price){
      res.json(false);
      return console.error('buyPlace | place not found ');
    }

    // V�rifier si l'utilisateur a suffisamment de cr�dits
    const getUserCreditQuery = 'SELECT credit FROM Users WHERE userID = ?';
    db.query(getUserCreditQuery, [studentID], (err, result) => {
      if (err) {
        console.error('Error retrieving user credit:', err);
        res.json(false);
      } else {
        const userCredit = result[0].credit;
          
        if (userCredit >= price) {
          // Soustraire le prix du ticket du cr�dit de l'utilisateur
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

                  // Afficher la requ�te SQL avec les valeurs substitu�es
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

  // G�n�rer un token al�atoire de 6 chiffres
  const generateToken = () => {
    return Math.floor(100000 + Math.random() * 900000); // G�n�re un nombre � 6 chiffres
  };

  let token = generateToken();

  // V�rifier l'unicit� du token
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

app.post('/searchParticipatedCourses', (req, res) => {
  const { studentID, startDate, tags } = req.body;

  console.log("searchParticipatedCourses | studentID, startDate, tags : " + studentID + ", "+ startDate +", " + tags);

  let sql = `
    SELECT * FROM Courses
    WHERE JSON_CONTAINS(studentsID, ?)
  `;
  const params = [studentID];

  if (startDate) {
    sql += ` AND DATE_FORMAT(startDate, '%Y-%m-%d') = ?`;
    params.push(startDate);
  }

  if (tags.length > 0) {
    sql += ' AND (' + tags.map(tag => 'JSON_CONTAINS(tags, JSON_ARRAY(?))').join(' AND ') + ')';
    params.push(...tags);
  }

  // Afficher la requ�te SQL avec les valeurs substitu�es
  const formattedSql = mysql.format(sql, params);
  console.log('searchParticipatedCourses | Executing SQL query:', formattedSql);

  db.query(sql, params, (err, results) => {
    if (err) {
      res.json(false);
      console.error("searchParticipatedCourses | Error: ", err);
    }
    console.log('searchParticipatedCourses | Courses found:', results);
    res.json(results);
  });
});

// ---------------------------------
// ---------- TEACHER --------------
// ---------------------------------

app.post('/getStudent', (req, res) => {
  const { studentID } = req.body;

  // V�rifier si studentID est n�gatif ou nul
  if (studentID <= 0) {
    res.json(false);
    return console.error('getStudent | error: invalid studentID');
  }
  
  console.log("getStudent | studentID : " + studentID);

  const sql = `
    SELECT * FROM Users 
    WHERE userID = ?
  `;

  // Afficher la requ�te SQL avec les valeurs substitu�es
  const formattedSql = mysql.format(sql, [studentID]);
  console.log('getStudent | Executing SQL query:', formattedSql);

  db.query(sql, [studentID], (err, result) => {
    if (err) {
      res.json(false);
      return console.error('getStudent | error executing query: ' + err.stack);
    }
    
    res.json(result[0]);
  });
});

app.post('/newStudent', (req, res) => {
  const { firstname, surname, email, password, connectionMethod, credit } = req.body;

  // Vérification que tous les champs sont remplis
  if (!firstname || !surname || !email || !password || !connectionMethod || credit === undefined) {
    return res.status(400).json({ error: 'Tous les champs doivent être remplis.' });
  }

  // Vérification de la validité du nombre de crédits
  if(credit < 0){
    return res.status(400).json({ error: 'Credit invalide.' });
  }

  // Vérification de la validité de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email invalide.' });
  }
  
  console.log("newStudent | firstname, surname, email, password, connectionMethod, credit : " + firstname + ", " + surname + ", " + email + ", " + password + ", " + connectionMethod + ", " + credit);

  const sql = `
    INSERT INTO Users (firstname, surname, email, password, connectionMethod, userType, credit)
    VALUES (?, ?, ?, ?, ?, 'student', ?)
  `;

  // Afficher la requ�te SQL avec les valeurs substitu�es
  const formattedSql = mysql.format(sql, [firstname, surname, email, password, connectionMethod, credit]);
  console.log('newStudent | Executing SQL query:', formattedSql);

  db.query(sql, [firstname, surname, email, password, connectionMethod, credit], (err, result) => {
    if (err) {
      res.json(false);
      return console.error('newStudent | error executing query: ' + err.stack);
    }

    // Récupérer l'ID de l'utilisateur nouvellement inséré
    const newUserID = result.insertId;

    // Sélectionner les informations complètes de l'utilisateur nouvellement inséré
    const selectSql = 'SELECT * FROM Users WHERE userID = ?';
    db.query(selectSql, [newUserID], (err, rows) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
        return console.error('newStudent | error executing query: ' + err.stack);
      }

      // Renvoi de la ligne nouvellement insérée
      res.json(rows[0]);
    });
  });
});

app.post('/modifyStudent', (req, res) => {
  const { studentID, firstname, surname, email, password, connectionMethod, credit } = req.body;

  if (!studentID) {
    return res.status(400).json({ error: 'ID de l\'étudiant manquant.' });
  }

  const fieldsToUpdate = [];
  const values = [];

  if (firstname) {
    fieldsToUpdate.push('firstname = ?');
    values.push(firstname);
  }

  if (surname) {
    fieldsToUpdate.push('surname = ?');
    values.push(surname);
  }

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email invalide.' });
    }
    fieldsToUpdate.push('email = ?');
    values.push(email);
  }

  if (password) {
    fieldsToUpdate.push('password = ?');
    values.push(password);
  }

  if (connectionMethod) {
    fieldsToUpdate.push('connectionMethod = ?');
    values.push(connectionMethod);
  }

  if (credit !== undefined) {
    if (credit < 0) {
      return res.status(400).json({ error: 'Credit invalide.' });
    }
    fieldsToUpdate.push('credit = ?');
    values.push(credit);
  }

  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({ error: 'Aucun champ à mettre à jour.' });
  }

  values.push(studentID);

  const sql = `
    UPDATE Users
    SET ${fieldsToUpdate.join(', ')}
    WHERE userID = ?
  `;

  // Afficher la requête SQL avec les valeurs substituées
  const formattedSql = mysql.format(sql, values);
  console.log('modifyStudent | Executing SQL query:', formattedSql);

  db.query(sql, values, (err, result) => {
    if (err) {
      res.json(false);
      return console.error('modifyStudent | error executing query: ' + err.stack);
    }

    // Si la mise à jour a réussi, récupérer les informations mises à jour de l'utilisateur
    if (result.affectedRows > 0) {
      const selectSql = 'SELECT * FROM Users WHERE userID = ?';
      db.query(selectSql, [studentID], (err, rows) => {
        if (err) {
          res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
          return console.error('modifyStudent | error executing query: ' + err.stack);
        }

        // Renvoi de la ligne mise à jour
        res.json(rows[0]);
      });
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
  });
});

app.post('/removeStudent', (req, res) => {
  const { courseID, studentID } = req.body;

  // Vérifier si les champs sont remplis
  if (!courseID || !studentID) {
    return res.status(400).json({ error: 'removeStudent | Les champs courseID et studentID doivent être fournis.' });
  }

  console.log("removeStudent | courseID, studentID : " + courseID + ", " + studentID);

  const selectSql = 'SELECT studentsID FROM Courses WHERE courseID = ?';
  db.query(selectSql, [courseID], (err, rows) => {
    if (err) {
      res.json(false);
      res.status(500).json({ error: 'removeStudent | Erreur lors de la récupération des données.' });
      return console.error('removeStudent | error executing query: ' + err.stack);
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
          res.json(false);
          res.status(500).json({ error: 'removeStudent | Erreur lors de la mise à jour des données.' });
          return console.error('removeStudent | error executing query: ' + err.stack);
        }
        res.json(true);
      });
    } else {
      res.json(false);
      console.log("removeStudent | student not in course");
    }
  });
});



// Servir les fichiers statiques de l'application React
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});