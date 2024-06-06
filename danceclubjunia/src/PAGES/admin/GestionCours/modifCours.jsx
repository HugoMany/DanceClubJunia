import React, { useState, useEffect } from 'react';
import { URL_DB } from '../../../const/const';
import Loading from '../../../elements/loading';

const showLoading = () => {
    // Placeholder for actual showLoading implementation
    console.log('Loading...');
};

const hideLoading = () => {
    // Placeholder for actual hideLoading implementation
    console.log('Loading complete.');
};

// Start loading
showLoading();

const ModifCours = ({ idCours }) => {
    const [loading, setLoading] = useState(true);
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        const fetchCours = async () => {
            try {
                const response = await fetch(URL_DB+'user/searchCourse?courseID='+idCours);
                const data = await response.json();
                setCourseData(data);
                setLoading(false);
                hideLoading();
            } catch (error) {
                console.error('Erreur lors de la récupération des info du cours', error);
                hideLoading();
            }
        };
        fetchCours();
    }, [idCours]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`teacher/modifyCourse`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du cours');
            }
            alert('Cours mis à jour avec succès');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du cours', error);
        }
    };

    const handleChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.value,
        });
    };

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h1>Modifier un cours</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Type de danse:
                    <input type="text" name="type" value={courseData.type} onChange={handleChange} />
                </label>
                {/* Ajoutez d'autres champs de formulaire ici pour les autres propriétés du cours */}
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default ModifCours;
