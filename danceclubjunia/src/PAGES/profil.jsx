import React, { useState, useEffect } from 'react';
import Header from '../elements/header';
import '../css/profil.css';
import PastCoursesEleve from './pastCoursesEleve';
import { URL_DB } from '../const/const';

const ID_CONST_STUDENT = 10;
const Profil = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(URL_DB+'teacher/getStudent?studentID='+ID_CONST_STUDENT)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='Profil'>
      <Header title="Profil"></Header>

      <h2>Vos informations</h2>
      <p>Firstname: {userData?.firstname}</p>
      <p>Surname: {userData?.surname}</p>
      <p>Email: {userData?.email}</p>
      <p>Password: {userData?.password}</p>
      <h2>Vos anciens cours</h2>

      <div>
        <PastCoursesEleve></PastCoursesEleve>
      </div>
    </div>
  );
};

export default Profil;