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
    const [userPaymentHistory, setPaymentHistory] = useState(null);


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
                fetchPaymentHistory(idUser);
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
    const fetchPaymentHistory = async (idUser) => {
                            

        const token = localStorage.getItem('token');
        const response2 = await fetch(URL_DB + 'student/getPaymentHistory?studentID='+idUser, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response2.ok) {
            const data = await response2.json();
            setPaymentHistory(data);
            setLoading(false);
            console.log(data);
        } else {
            console.error('Erreur lors de la récupération des prof');
        }
    }
    

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


      <div className='infoProfil' >
      <h2>Vos informations</h2>

      <p><b>Prénom:</b> {userData?.student.firstname}</p>
      <p><b>Surname:</b> {userData?.student.surname}</p>
      <p><b>Email:</b> {userData?.student.email}</p>
      <p><b>Tickets unitaire:</b>    {userData?.student.credit}</p>
      <QRCode  link={URL_FRONT+"/profil/student/"+idStudent}></QRCode>

      </div>



    <div >
    <h2>Historique des paiements.</h2>

      <div className='studentPastCourses'>
      <div className='paiementList'>
      {userPaymentHistory?.payments.length > 0 ? (
    userPaymentHistory.payments.map((payment, index) => (
        <div key={index}>
            {/* <div><b>ID Du paiem ID:</b> {payment.paymentID}</div> */}
            <div>Debit: {payment.price}</div>
            <div>Type: {payment.type}</div>
            <div>Quantité: {payment.quantity}</div>
            <br></br>
        </div>
    ))
) : (
    <div>Aucun paiement trouvé.</div>
)}
    
    
    </div>  
    </div>
      </div>
      <h2>Vos anciens cours</h2>
      <PastCoursesStudent studentId={idStudent}></PastCoursesStudent>

    </div>
  );
};}

export default Profil;