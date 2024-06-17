import React, { useState, useEffect } from 'react';
import Header from '../../elements/header';
import { URL_DB } from '../../const/const';
import "../../css/appel.css";

const Appel = () => {
    const [cours, setCours] = useState([]);

    useEffect(() => {
        const fetchCours = async () => {
            try {
                const response = await fetch(URL_DB + 'guest/getAllCourses', {
                    method: 'GET',
                });

                if (response.ok) {
                    const data = await response.json();
                    const currentDate = new Date();

                    // Helper function to check if two dates are the same day
                    const isSameDay = (date1, date2) => {
                        return date1.getFullYear() === date2.getFullYear() &&
                               date1.getMonth() === date2.getMonth() &&
                               date1.getDate() === date2.getDate();
                    };

                    // Filtrer les cours pour inclure uniquement ceux de la journée actuelle
                    const todaysCourses = data.courses.filter(course => 
                        isSameDay(new Date(course.startDate), currentDate)
                    );

                    // Trier les cours restants par date de début
                    const sortedCourses = todaysCourses.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
                    setCours(sortedCourses);
                    console.log(sortedCourses);
                } else {
                    console.error('Erreur lors de la récupération des cours');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des cours', error);
            }
        };

        fetchCours();
    }, []);
    const handleAppel = async (courseId) => {
        try {
            const response = await fetch(URL_DB + 'guest/appel', {
                method: 'GET',
            });
            if (response.ok) {
                console.log('Appel effectué avec succès');
            } else {
                console.error('Erreur lors de l\'appel');
            }
        } catch (error) {
            console.error('Erreur lors de l\'appel', error);
        }
    };
    
    return (
        <div>
            <Header />
            <h1>Liste des cours de la journée</h1>
            <div className='appelDate'>
                {cours.length > 0 ? (
                    cours.map((course) => (
                        <div key={course.id}>
                            <h2>{course.title}</h2>
                            <p>Start Date: {new Date(course.startDate).toLocaleString()}</p>
                            <p>Location: {course.location}</p>
                            <button onClick={() => handleAppel(course.courseID)}>Appel</button>
                        </div>
                    ))
                ) : (
                    <p>Aucun cours prévu pour aujourd'hui.</p>
                )}
            </div>
         
        </div>
    );
};

export default Appel;
