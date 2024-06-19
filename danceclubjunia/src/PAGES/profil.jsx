import React, { useState, useEffect } from 'react';
import Header from '../elements/header';
import '../css/profil.css';
import { URL_DB } from '../const/const';
import Loading from '../elements/loading';
import PastCoursesStudent from './pastCoursesStudent';
// import StudentPastCourses from './studentPastCourses';






const Profil = () => {
    const [userData, setUserData] = useState(null);
    const [userPaymentHistory, setPaymentHistory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [idUser, setIdUser] = useState(null);



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
            setIdUser(data.userId);
        } else {
            console.error('Erreur');
        }
    };

    const fetchUser = async () => {
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
                fetchPaymentHistory();


            } else {
                console.error('Erreur lors de la récupération des info du compte');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des info du compte', error);
        }
        finally {
        }
    };
    const fetchPaymentHistory = async () => {
                            

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
        
   
    useEffect(() => {
        fetchID();
        if (idUser) {
            console.log(idUser);
            fetchUser();
            fetchPaymentHistory();
          }
    }, []);


if (loading) {
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
      </div>
      <div className='infoProfil'>
    <h2>Historique d'achat</h2>
    
    <div className='paiementList'>
    {userPaymentHistory?.payments.map((payment, index) => (
        <div key={index}>
            <div>Payment ID: {payment.paymentID}</div>
            <div>Price: {payment.price}</div>
            <div>Type: {payment.type}</div>
            <div>Quantity: {payment.quantity}</div>
            <br></br>
        </div>
    ))}
    '</div>
</div>

    <div >
      <h2>Vos anciens cours</h2>
      <div className='studentPastCourses'>
      <PastCoursesStudent studentId={10}></PastCoursesStudent>
      </div>
    </div>  

    </div>
  );
};}

export default Profil;