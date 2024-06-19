import React, { useState } from 'react';

const ADD_CREDIT_API_URL = 'http://90.110.227.143/api/student/buyPlace';

const AjoutCredits = ({ userID }) => {
  const [creditAmount, setCreditAmount] = useState('');

  const addCredit = async () => {
    try {
      const token = localStorage.getItem('token');
        if (!token) return { valid: false };
      const response = await fetch(ADD_CREDIT_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          studentID: userID, // Utilisation de userID ici
          type: "ticket",
          number: 1
        })
      });
      const data = await response.json();
      console.log('Credit added successfully:', data);
      // Gérer la réponse de l'API comme nécessaire
    } catch (error) {
      console.error('Error adding credit:', error);
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Credit Amount"
        value={creditAmount}
        onChange={(e) => setCreditAmount(e.target.value)}
      />
      <button onClick={addCredit}>Add Credit</button>
    </div>
  );
};

export default AjoutCredits;
