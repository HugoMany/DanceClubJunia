import React, { useState } from 'react';
import AjoutCredits from './ajoutCredits';
import Button from '@mui/material/Button';
import { URL_DB } from '../const/const';

const GetStudentID = () => {
  const [email, setEmail] = useState('');
  const [userID, setUserID] = useState(null);
  const [dataUserFound,setDataUserFound] = useState(true);
  const searchStudent = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return { valid: false };
      const response = await fetch(URL_DB+`teacher/searchStudent?email=${email}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        
    });
      const data = await response.json();
      if (data.success && data.students.length > 0) {
        setUserID(data.students[0].userID);
        setDataUserFound(data.students[0])
      } else {
        setUserID(null);
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  return (
    <div>
      <h2>Recherche d'utilisateur par email</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button Button variant="contained" color="primary" onClick={searchStudent}>Search</Button>
      {userID && <div>
      <p>User ID: {dataUserFound.userID}</p>
      <p>Surname: {dataUserFound.surname}</p>
      <p>Firstname: {dataUserFound.firstname}</p>
      <AjoutCredits id={userID} userID={userID} />
      </div>}
    </div>
  );
};

export default GetStudentID;
