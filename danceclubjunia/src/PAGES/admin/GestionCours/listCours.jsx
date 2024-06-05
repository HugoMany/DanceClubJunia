import React, { useState, useEffect } from 'react';

import URL_DB from '../../../const/const';

const ListCours = () => {
    const [cours, setCours] = useState([]);

    useEffect(() => {
        const fetchCours = async () => {
            try {
                const response = await fetch(URL_DB+'/GetAllCours', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({}) // Ajoutez ici les paramètres de votre requête si nécessaire
                });

                if (response.ok) {
                    const data = await response.json();
                    setCours(data);
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
            <h1>Liste des cours</h1>
            <ul>
                {cours.map((cours) => (
                    <li key={cours.courseId}>{cours.type} {cours.startDate}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListCours;