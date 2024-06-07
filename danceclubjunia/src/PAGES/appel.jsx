import React, { useState, useEffect } from 'react';
import Header from '../elements/header';
import { URL_DB } from '../const/const';
import "../css/appel.css";

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
                    // Filtrer les cours pour exclure ceux dont la date de début est passée
                    const currentDate = new Date();
                    const filteredCourses = data.courses.filter(course => new Date(course.startDate) > currentDate);
                    // Trier les cours restants par date de début
                    const sortedCourses = filteredCourses.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
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

    return (
        <div>
            <Header />
            <h1>Liste des cours</h1>
            <div className='appelDate'>
                {cours.map((course) => (
                    <div key={course.id}>
                        <h2>{course.title}</h2>
                        <p>Start Date: {new Date(course.startDate).toLocaleString()}</p>
                        <p>Location: {course.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Appel;
