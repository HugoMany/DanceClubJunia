import React, { useState, useEffect } from 'react';
import Header from '../elements/header';
import '../css/profil.css';
import PastCoursesEleve from './pastCoursesEleve';
import { URL_DB } from '../const/const';
import Loading from '../elements/loading';

const ID_CONST_STUDENT = 10;





const Profil = () => {
    const [userData, setUserData] = useState(null);
    const [userPaymentHistory, setPaymentHistory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                //Recup TOKEN dans le local storage
                const token = localStorage.getItem('token');
                if (!token) return { valid: false };

                const response = await fetch(URL_DB + 'teacher/getStudent?studentID=' + ID_CONST_STUDENT, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
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
        const fetchPaymentHistory = async () => {
            try {
                //Recup TOKEN dans le local storage
                const token = localStorage.getItem('token');
                if (!token) return { valid: false };
                const response = await fetch(URL_DB + 'student/getPaymentHistory?studentID=2', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPaymentHistory(data);
                    setLoading(false);
                    console.log(data);
                } else {
                    console.error('Erreur lors de la récupération des prof');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des prof', error);
            }
            finally {
            }
        };

        fetchUser();
        fetchPaymentHistory();
        
    }, []);

    
if (loading) {
        return <Loading></Loading>;
      }
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
</div>

    <div>
      <h2>Vos anciens cours</h2>
    </div>  

      <div>
        <PastCoursesEleve></PastCoursesEleve>
      </div>
    </div>
  );
};

export default Profil;