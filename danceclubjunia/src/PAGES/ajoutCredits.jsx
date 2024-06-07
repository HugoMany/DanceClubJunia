import React, { useState } from 'react';

const ADD_CREDIT_API_URL = 'http://90.110.227.143/api/student/addCredit';

const AjoutCredits = ({ userID }) => {
  const [creditAmount, setCreditAmount] = useState('');

  const addCredit = async () => {
    try {
      const response = await fetch(ADD_CREDIT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          studentID: userID, // Utilisation de userID ici
          credit: parseInt(creditAmount)
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
