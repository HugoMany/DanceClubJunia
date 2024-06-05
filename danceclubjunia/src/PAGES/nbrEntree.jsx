import React, { useState, useEffect } from 'react';

const StudentCredits = ({ studentId }) => {
    const [credits, setCredits] = useState(null);

    useEffect(() => {
        const fetchNbrCredits = async () => {
            try {
                const response = await fetch(`http://example.com/api/${studentId}`, {
                    method: 'GET', // Utilisez GET pour récupérer des données
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCredits(data.credits); // Suppose que les crédits sont dans un champ nommé 'credits' dans la réponse JSON
                } else {
                    console.error('Erreur');
                }
            } catch (error) {
                console.error('Erreur', error);
            }
        };

        fetchNbrCredits();
    }, [studentId]);

    if (credits === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Nombre de crédits de l'étudiant : {credits}</h1>
        </div>
    );
}

export default StudentCredits;
