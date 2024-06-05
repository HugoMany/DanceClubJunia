import React, { useState, useEffect } from 'react';
import Header from '../elements/header';
import '../css/profil.css';
import PastCoursesEleve from './pastCoursesEleve';
import { URL_DB } from '../const/const';

const ID_CONST_STUDENT = 10;

function showLoading() {
  }
  
  function hideLoading() {
  }

// Start loading
showLoading();





const Profil = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(URL_DB + 'teacher/getStudent?studentID=' + ID_CONST_STUDENT, {
                    method: 'GET',
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    setLoading(false);

                } else {
                    console.error('Erreur lors de la récupération des prof');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des prof', error);
            }
            finally {
                hideLoading();
            }
        };

        fetchUser();

    }, []);
if (loading) {
        return <div>Loading...</div>;
      }
  return (
    <div className='Profil'>
      <Header title="Profil"></Header>

                <div id="loading" style={{ display: 'none' }}>
        <p>Loading...</p>
    </div>
    
      <h2>Vos informations</h2>
      <p>Firstname: {userData?.student.firstname}</p>
      <p>Surname: {userData?.student.surname}</p>
      <p>Email: {userData?.student.email}</p>
      <p>Credit: {userData?.student.credit}</p>

      <h2>Vos anciens cours</h2>

      <div>
        <PastCoursesEleve></PastCoursesEleve>
      </div>
    </div>
  );
};

export default Profil;