import React, { useState, useEffect } from 'react';
import Header from '../elements/header';
import '../css/profil.css';
import { URL_DB, URL_FRONT } from '../const/const';
import Loading from '../elements/loading';
import PastCoursesStudent from './pastCoursesStudent';
import isTeacher from '../elements/isTeacher';
import QRCode from '../elements/qrCode';
// import StudentPastCourses from './studentPastCourses';

import requireConnexion from '../elements/requireConnexion';




const Profil = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [idStudent, setIdStudent] = useState(null);


    const fetchID = async () => {
        //Recup TOKEN dans le local storage
        const token = localStorage.getItem('token');
        if (!token) return { valid: false };

        const response1 = await fetch(URL_DB + 'auth/verifyToken', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response1.ok) {
            const data = await response1.json();
            console.log(data.userId);
            fetchUser(data.userId);
        } else {
            console.error('Erreur');
        }
    };

    const fetchUser = async (idUser) => {
        try {
            //Recup TOKEN dans le local storage
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };

            const response = await fetch(URL_DB + 'user/getProfile?userID=' + idUser, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                setIdStudent(idUser);
                setLoading(false);
            } else {
                console.error('Erreur lors de la récupération des info du compte');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des info du compte', error);
        }
        finally {
        }
    };
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchID();
    }, []);

if (loading) {
    if (isTeacher()) {
        alert("Vous n'êtes pas autorisé à accéder à cette page")
        window.location.href = "/";
    }


        return <Loading></Loading>;
}
      else{
  return (
  
  <div className='Profil'>
      <Header title="Profil"></Header>


      <div className='infoProfil'>
      <h2>Vos informations</h2>

      <p>Firstname: {userData?.student.firstname}</p>
      <p>Surname: {userData?.student.surname}</p>
      <p>Email: {userData?.student.email}</p>
      <p>Credit: {userData?.student.credit}</p>
      <QRCode link={URL_FRONT+"profil/student/"+idStudent}></QRCode>

      </div>
  

    <div >
      <h2>Vos anciens cours</h2>
      <div className='studentPastCourses'>
      <PastCoursesStudent studentId={idStudent}></PastCoursesStudent>
      </div>
    </div>  

    </div>
  );
};}

export default Profil;