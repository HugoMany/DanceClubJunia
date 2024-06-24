import React, { useState } from 'react';
import AjoutCredits from './ajoutCredits';
import Button from '@mui/material/Button';
import { URL_DB } from '../const/const';
import { TextField } from '@mui/material';
const GetStudentID = () => {
  const [email, setEmail] = useState('');
  const [userID, setUserID] = useState(null);
  const [dataUserFound, setDataUserFound] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const searchStudent = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('No token found');
        return;
      }

      const response = await fetch(URL_DB + `teacher/searchStudent?email=${email}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        setErrorMessage('Email invalide.');
        setUserID(null);
        setDataUserFound(null);
        return;
      }

      const data = await response.json();
      if (data.success && data.students.length > 0) {
        setUserID(data.students[0].userID);
        setDataUserFound(data.students[0]);
        setErrorMessage('');
      } else {
        setUserID(null);
        setDataUserFound(null);
        setErrorMessage('aucun utilisateur trouvé.');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
      setErrorMessage('An error occurred while fetching student data.');
    }
  };

  return (
    <div >
      <h2>Recherche d'utilisateur par email</h2>
      <div className='rechercheCredit'>
        
      <TextField
                        label="Email de l'utilisateur"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                    />
      <Button variant="contained" color="primary" onClick={searchStudent}>
      <span class="material-symbols-outlined">
search
</span>
      </Button>
      </div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {dataUserFound && (
        <div>
          <p>User ID: {dataUserFound.userID}</p>
          <p>Surname: {dataUserFound.surname}</p>
          <p>Firstname: {dataUserFound.firstname}</p>
          <AjoutCredits id={userID} userID={userID} />
        </div>
      )}
    </div>
  );
};

export default GetStudentID;
