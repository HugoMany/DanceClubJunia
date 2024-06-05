import React, { useState, useEffect } from 'react';
import URL_DB from '../../../const/const';

const ListProf = () => {
    const [teacher, setTeacher] = useState([]);

    useEffect(() => {
        const fetchProf = async () => {
            try {
                const response = await fetch(URL_DB+'/GetAllTeacher', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({}) // Ajoutez ici les paramètres de votre requête si nécessaire
                });

                if (response.ok) {
                    const data = await response.json();
                    setTeacher(data);
                } else {
                    console.error('Erreur lors de la récupération des prof');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des prof', error);
            }
        };

        fetchProf();
    }, []);

    return (
        <div>
            <h1>Liste des prof</h1>
            <ul>
                {teacher.map((teacher) => (
                    <li key={teacher.teacherId}>{teacher.firsname} {teacher.surname}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListProf;