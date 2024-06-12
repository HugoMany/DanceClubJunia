import React, { useState, useEffect } from 'react';
import { URL_DB } from '../../../const/const';
import Loading from '../../../elements/loading';
import { idID } from '@mui/material/locale';

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
                const token = localStorage.getItem('token');
                if (!token) return { valid: false };
                console.log(token)
                const response = await fetch(URL_DB + 'user/searchCourse?courseID=' + idCours, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
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
        console.log("ooooo")
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };

            console.log(token)
            console.log(courseData)
            let courseDataModify = {
                ...courseData.courses[0],
                teacherID: "1",
                type:"rock" // A modifier
            };

            
            console.log(courseDataModify)

            const response = await fetch(URL_DB + `teacher/modifyCourse`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(courseDataModify),
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
        setCourseData(prevState => ({
            ...prevState,
        }));
    };

    if (loading) {
        return <Loading></Loading>;
    }

    return (
        <div className='ModalAdminGrid'>
            <div>
            <h1>Modifier le cours N°{idCours}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Type de danse:
                    <input type="text" name="type" placeholder={courseData.type} onChange={handleChange} />
                </label>
                {/* Ajoutez d'autres champs de formulaire ici pour les autres propriétés du cours */}
                <button type="submit">Mettre à jour</button>
            </form>
            </div>
        </div>
    );
};

export default ModifCours;
