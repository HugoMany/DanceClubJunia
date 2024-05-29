import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState('');
  const [studentCourses, setStudentCourses] = useState([]);
  const [paymentsHistory, setPaymentsHistory] = useState([]);
  const [resetPasswordTokentmp, setResetPasswordToken] = useState('');
  const [resetMessage, setResetMessage] = useState('');



  const addCredit = async (event) => {
    event.preventDefault(); // Empèche le formulaire de se soumettre de manière traditionnelle

    const form = document.getElementById('addCredit');

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const url = '/addCredit';

    try {
      const response = await fetch(url, {
        method: 'POST', // Méthode de la requête
        headers: {
          'Content-Type': 'application/json' // Type de contenu
        },
        body: JSON.stringify(data) // corps de la requête converti en JSON
      });

      if (!response.ok) {
        throw new Error("Erreur dans la requête:" + response.statusText);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const getSubscriptionEndDate = async (event) => {
    event.preventDefault(); // Empèche le formulaire de se soumettre de manière traditionnelle

    const form = document.getElementById('getSubscriptionEndDate');

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const url = '/getSubscriptionEndDate';

    try {
      const response = await fetch(url, {
        method: 'POST', // Méthode de la requête
        headers: {
          'Content-Type': 'application/json' // Type de contenu
        },
        body: JSON.stringify(data) // corps de la requête converti en JSON
      });

      if (!response.ok) {
        throw new Error("Erreur dans la requête:" + response.statusText);
      }

      const result = await response.json();
      setSubscriptionEndDate(formatDate(result.subscriptionEndDate));
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const getCourses = async (event) => {
    event.preventDefault(); // Empèche le formulaire de se soumettre de manière traditionnelle

    const form = document.getElementById('getCourses');

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const url = '/getCourses';

    try {
      const response = await fetch(url, {
        method: 'POST', // Méthode de la requête
        headers: {
          'Content-Type': 'application/json' // Type de contenu
        },
        body: JSON.stringify(data) // corps de la requête converti en JSON
      });

      if (!response.ok) {
        throw new Error("Erreur dans la requête:" + response.statusText);
      }

      const result = await response.json();
      setStudentCourses(result);
      console.log(result, studentCourses);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const addLink = async (event) => {
    event.preventDefault(); // Empèche le formulaire de se soumettre de manière traditionnelle

    const form = document.getElementById('addLink');

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const url = '/addLink';

    try {
      const response = await fetch(url, {
        method: 'POST', // Méthode de la requête
        headers: {
          'Content-Type': 'application/json' // Type de contenu
        },
        body: JSON.stringify(data) // corps de la requête converti en JSON
      });

      if (!response.ok) {
        throw new Error("Erreur dans la requête:" + response.statusText);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const buyPlace = async (event) => {
    event.preventDefault(); // Empèche le formulaire de se soumettre de manière traditionnelle

    const form = document.getElementById('buyPlace');

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const url = '/buyPlace';

    try {
      const response = await fetch(url, {
        method: 'POST', // Méthode de la requête
        headers: {
          'Content-Type': 'application/json' // Type de contenu
        },
        body: JSON.stringify(data) // corps de la requête converti en JSON
      });

      if (!response.ok) {
        throw new Error("Erreur dans la requête:" + response.statusText);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const getPaymentsHistory = async (event) => {
    event.preventDefault(); // Empêche le formulaire de se soumettre de manière traditionnelle

    const form = document.getElementById('getPaymentsHistory');

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const url = '/getPaymentsHistory';

    try {
      const response = await fetch(url, {
        method: 'POST', // Méthode de la requête
        headers: {
          'Content-Type': 'application/json' // Type de contenu
        },
        body: JSON.stringify(data) // corps de la requête converti en JSON
      });

      if (!response.ok) {
        throw new Error("Erreur dans la requête:" + response.statusText);
      }

      const result = await response.json();
      setPaymentsHistory(result.payments); // Mettre à jour l'état avec l'historique des paiements
    } catch (error) {
      console.error("Erreur :", error);
    }
  };



  const resetPassword = async (event) => {
    event.preventDefault();

    const form = document.getElementById('resetPasswordForm');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const url = '/resetPassword';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Erreur dans la requête:" + response.statusText);
      }

      const result = await response.json();
      setResetPasswordToken(result.token); // Stocke le token pour utilisation ultérieure
      setResetMessage(result.message);
    } catch (error) {
      console.error("Erreur :", error);
      setResetMessage('Erreur lors de la génération du token.');
    }
  };

  const resetPasswordToken = async (event) => {
    event.preventDefault();

    const form = document.getElementById('resetPasswordTokenForm');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const url = '/resetPasswordToken';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Erreur dans la requête:" + response.statusText);
      }

      const result = await response.json();
      setResetMessage(result.message);
    } catch (error) {
      console.error("Erreur :", error);
      setResetMessage('Erreur lors de la réinitialisation du mot de passe.');
    }
  };





  useEffect(() => {
    fetch('/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div>
      <h1>Student</h1>

      <h2> Add credit </h2>
      <form id="addCredit">
        <label htmlFor="studentID">studentID:</label>
        <input type="text" id="studentID" name="studentID" required></input>

        <label htmlFor="credit">credit:</label>
        <input type="text" id="credit" name="credit" required></input>

        <button onClick={addCredit} type="submit">Envoyer</button>
      </form>

      <h2> Get subscription end date </h2>
      <form id="getSubscriptionEndDate">
        <label htmlFor="studentID">studentID:</label>
        <input type="text" id="studentID" name="studentID" required></input>

        <button onClick={getSubscriptionEndDate} type="submit">Envoyer</button>
      </form>
      {subscriptionEndDate && (
        <div>
          <p>Subscription End Date</p>
          <p>{subscriptionEndDate}</p>
        </div>
      )}

      <h2> Get courses </h2>
      <form id="getCourses">
        <label htmlFor="studentID">studentID:</label>
        <input type="text" id="studentID" name="studentID" required></input>

        <button onClick={getCourses} type="submit">Envoyer</button>
      </form>
      {studentCourses && (
        <div>
          <p>Courses</p>
          <ul>
            {studentCourses.map(course => (
              <li key={course.courseID}>{course.title} {course.type}</li>
            ))}
          </ul>
        </div>
      )}

      <h2> Add link </h2>
      <form id="addLink">
        <label htmlFor="studentID">studentID:</label>
        <input type="text" id="studentID" name="studentID" required></input>

        <label htmlFor="courseID">courseID:</label>
        <input type="text" id="courseID" name="courseID" required></input>

        <label htmlFor="link">lien:</label>
        <input type="text" id="link" name="link" required></input>

        <button onClick={addLink} type="submit">Envoyer</button>
      </form>

      <h2> Buy </h2>
      <form id="buyPlace">
        <label htmlFor="studentID">studentID:</label>
        <input type="text" id="studentID" name="studentID" required></input>

        <label htmlFor="type">type:</label>
        <input type="text" id="type" name="type" required></input>

        <label htmlFor="number">number:</label>
        <input type="text" id="number" name="number" required></input>

        <button onClick={buyPlace} type="submit">Envoyer</button>
      </form>

      <h2> Get Payments History </h2>
      <form id="getPaymentsHistory">
        <label htmlFor="studentID">studentID:</label>
        <input type="text" id="studentID" name="studentID" required></input>

        <button onClick={getPaymentsHistory} type="submit">Envoyer</button>
      </form>
      {paymentsHistory.length > 0 && (
        <div>
          <p>Payments History</p>
          <ul>
            {paymentsHistory.map(payment => (
              <li key={payment.paymentID}>
                Date: {new Date(payment.date).toLocaleDateString('fr-FR')},
                Type: {payment.type},
                Price: {payment.price},
                Quantity: {payment.quantity},
                Payment Type: {payment.paymentType}
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2>Reset Password</h2>
      <form id="resetPasswordForm">
        <label htmlFor="studentID">studentID:</label>
        <input type="text" id="studentID" name="studentID" required></input>

        <button onClick={resetPassword} type="submit">Envoyer</button>
      </form>
      {resetPasswordTokentmp && (
        <div>
          <p>Token : {resetPasswordTokentmp}</p>
        </div>
      )}
      {resetMessage && (
        <div>
          <p>{resetMessage}</p>
        </div>
      )}

      <h2>Reset Password with Token</h2>
      <form id="resetPasswordTokenForm">
        <label htmlFor="token">Token:</label>
        <input type="text" id="token" name="token" required></input>

        <label htmlFor="newPassword">New Password:</label>
        <input type="password" id="newPassword" name="newPassword" required></input>

        <button onClick={resetPasswordToken} type="submit">Envoyer</button>
      </form>



    </div>
  );
}

export default App;
