
import React, { useState, useEffect } from 'react';
import Loading from '../elements/loading';

const InfoStudent = ({ userID }) => {
    const [student, setStudent] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = 'http://90.110.227.143/api/';
    useEffect(() => {
        const fetchCours = async () => {
            try {
                const response = await fetch(API_URL + 'teacher/getStudent?studentID='+{userID}, {
                    method: 'GET',
                });

                if (response.ok) {
                    const data = await response.json();
                    setStudent(data);
                    console.log(data);
                    setLoading(false);

                } else {
                    console.error('Erreur lors de la récupération des cours');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des cours', error);
            }
        };

        fetchCours();
    }, []);
    if(loading){
        return <div><Loading></Loading></div>
    }
  
    return (
      <div>
        <p>{student.firstname}</p>
        <p>{student.surname}</p>
        <p>{student.email}</p>
        <p>{student.credit}</p>
        <p>{student.photo}</p>
        
      </div>
    );
  };
  
  export default InfoStudent;
  