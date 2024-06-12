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

const ModifProf = ({ idProf }) => {
    const [loading, setLoading] = useState(true);
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        const fetchProf = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return { valid: false };
                console.log(token)
                const response = await fetch(URL_DB + 'user/searchTeacher?teacherID=' + idProf, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setCourseData(data);
                setLoading(false);
                hideLoading();
            } catch (error) {
                console.error('Erreur lors de la récupération des info du prof', error);
                hideLoading();
            }
        };
        fetchProf();
    }, [idProf]);

    const handleSubmit = async (event) => {
        console.log("ooooo")
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };

            console.log(token)
            console.log(courseData)
            let courseDataModify = {
                ...courseData.courses[0]
            };

            
            console.log(courseDataModify)

            const response = await fetch(URL_DB + `teacher/modifyTeacher`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(courseDataModify),
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du prof');
            }
            alert('Prof mis à jour avec succès');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du prof', error);
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
        <form onSubmit={handleSubmit}>

            <label htmlFor="firsname">Firsname:</label>
            <input type="text" name="firstname" placeholder={courseData.firstname} onChange={handleChange} />

            <label htmlFor="surname">Surname:</label>
            <input type="text" name="surname" placeholder={courseData.surname} onChange={handleChange} />

            <label htmlFor="email">Email:</label>
            <input type="email" name="email" placeholder={courseData.email} onChange={handleChange} />

            <label htmlFor="connectionMethod">Connection Method:</label>
            <input type="text" name="connectionMethod" placeholder={courseData.connectionMethod} onChange={handleChange} />

            <label htmlFor="photo">Photo:</label>
            <input type="file" name="photo" placeholder={courseData.photo} onChange={handleChange} />

            <label htmlFor="description">Description:</label>
            <input type="text" name="description" placeholder={courseData.descrition} onChange={handleChange} />

            <button type="submit">Submit</button>
        </form>
    );
};




export default ModifProf;
