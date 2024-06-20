import React, { useState, useEffect } from 'react';
import { URL_DB } from '../const/const';

const ReturnNbOfTicketStudent = () => {
  const [tickets, setTickets] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
      // Fonction pour vérifier le token et obtenir l'ID de l'utilisateur
      const verifyToken = async () => {
          try {
              const response = await fetch(URL_DB+`auth/verifyToken`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assurez-vous d'avoir stocké le token dans localStorage
                  },
              });

              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }

              const data = await response.json();
              return data.userId; // Supposons que la réponse contienne userId
          } catch (error) {
              console.error('Error:', error);
          }
      };

      // Fonction pour obtenir le profil de l'utilisateur en utilisant l'ID
      const getUserProfile = async (userId) => {
          try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };
              const response = await fetch(`${URL_DB}user/getProfile?userID=${userId}`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  },
              });

              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }

              const data = await response.json();
              console.log(data)
              return data.student.tickets; // Supposons que la réponse contienne les tickets
          } catch (error) {
              setErrorMessage('Erreur lors de la récupération du profil utilisateur.');
              console.error('Error:', error);
          }
      };

      // Exécution des fonctions
      const fetchTickets = async () => {
          const userId = await verifyToken();
          if (userId) {
              const userTickets = await getUserProfile(userId);
              setTickets(userTickets);
          }
      };

      fetchTickets();
  }, []);

  return (
      <div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {tickets !== null ? <p>{tickets}</p> : <p>0</p>}
      </div>
  );
};

export default ReturnNbOfTicketStudent;
