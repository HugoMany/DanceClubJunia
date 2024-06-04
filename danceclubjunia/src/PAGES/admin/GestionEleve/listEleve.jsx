import React, { useState, useEffect } from 'react';

const ListEleve = () => {
    const [student, setStudent] = useState([]);

    useEffect(() => {
        const fetchEleves = async () => {
            try {
                const response = await fetch('/api/GetAllStudent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({}) // Ajoutez ici les paramètres de votre requête si nécessaire
                });

                if (response.ok) {
                    const data = await response.json();
                    setStudent(data);
                } else {
                    console.error('Erreur lors de la récupération des élèves');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des élèves', error);
            }
        };

        fetchEleves();
    }, []);

    return (
        <div>
            <h1>Liste des élèves</h1>
            <ul>
                {student.map((student) => (
                    <li key={student.userId}>{student.firsname} {student.surname}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListEleve;