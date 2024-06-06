import React, { useState, useEffect } from 'react';
import Header from '../elements/header';
import '../css/profil.css';
import PastCoursesEleve from './pastCoursesEleve';
import { URL_DB } from '../const/const';
import Loading from '../elements/loading';

const ID_CONST_STUDENT = 10;

function showLoading() {
  }
  
  function hideLoading() {
  }

// Start loading
showLoading();





const Profil = () => {
    const [userData, setUserData] = useState(null);
    const [userPaymentHistory, setPaymentHistory] = useState(null);
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
                    console.error('Erreur lors de la récupération des info du compte');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des info du compte', error);
            }
            finally {
                hideLoading();
            }
        };
        const fetchPaymentHistory = async () => {
            try {
                const response = await fetch(URL_DB + 'student/getPaymentHistory?studentID=2', {
                    method: 'GET',
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
                hideLoading();
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


      <h2>Vos informations</h2>
      <p>Firstname: {userData?.student.firstname}</p>
      <p>Surname: {userData?.student.surname}</p>
      <p>Email: {userData?.student.email}</p>
      <p>Credit: {userData?.student.credit}</p>
    

    <h2>Historique d'achat</h2>
    
    {/* <div>{userPaymentHistory?.payments[0].paymentID}</div>
    <div>{userPaymentHistory?.payments[0].price}</div>
    <div>{userPaymentHistory?.payments[0].type}</div>
    <div>{userPaymentHistory?.payments[0].quantity}</div> */}
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
      <div>
        
            {/* <p>Payment ID: {payment.paymentID}</p>
            <p>User ID: {payment.userID}</p>
            <p>Price: {payment.price}</p>
            <p>Type: {payment.type}</p>
            <p>Quantity: {payment.quantity}</p>
            <p>Date: {payment.date}</p>
            <p>Payment Type: {payment.paymentType}</p>
          </div> */}

      </div>
    </div>  

      <div>
        <PastCoursesEleve></PastCoursesEleve>
      </div>
    </div>
  );
};

export default Profil;