import React, { useState, useEffect } from 'react';
import { URL_DB } from '../../../const/const';
import Loading from '../../../elements/loading';

const showLoading = () => {
    console.log('Loading...');
};

const hideLoading = () => {
    console.log('Loading complete.');
};

// Start loading
showLoading();

const ModifEleve = ({ idEleve }) => {
    const [loading, setLoading] = useState(true);
    const [courseData, setCourseData] = useState({
        studentID: idEleve,
        firstname: '',
        surname: '',
        email: '',
        password: '',
        connectionMethod: '',
        credit: 0,
        photo: ''
    });

    useEffect(() => {
        const fetchProf = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return { valid: false };
                console.log(token);
                const response = await fetch(URL_DB + 'teacher/getStudent?studentID=' + idEleve, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (data.success) {
                    setCourseData({
                        studentID: idEleve,
                        ...data.student,
                    });
                }
                setLoading(false);
                hideLoading();
            } catch (error) {
                console.error('Erreur lors de la récupération des info du student', error);
                hideLoading();
            }
        };
        fetchProf();
    }, [idEleve]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };

            const courseDataModify = {
                ...courseData,
            };
            console.log(courseDataModify);
            const response = await fetch(URL_DB + `teacher/modifyStudent`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(courseDataModify),
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du student');
            }
            else {
                window.location.href = '/admin/eleve'
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du student', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourseData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstname">Firstname:</label>
            <input 
                type="text" 
                name="firstname" 
                value={courseData.firstname || ''} 
                onChange={handleChange} 
            />

            <label htmlFor="surname">Surname:</label>
            <input 
                type="text" 
                name="surname" 
                value={courseData.surname || ''} 
                onChange={handleChange} 
            />

            <label htmlFor="email">Email:</label>
            <input 
                type="email" 
                name="email" 
                value={courseData.email || ''} 
                onChange={handleChange} 
            />

            <label htmlFor="password">Password:</label>
            <input 
                type="password" 
                name="password" 
                value={courseData.password || ''} 
                onChange={handleChange} 
            />

            <label htmlFor="connectionMethod">Connection Method:</label>
            <input 
                type="text" 
                name="connectionMethod" 
                value={courseData.connectionMethod || ''} 
                onChange={handleChange} 
            />

            <label htmlFor="credit">Credit:</label>
            <input 
                type="number" 
                name="credit" 
                value={courseData.credit} 
                onChange={handleChange} 
            />

            <label htmlFor="photo">Photo:</label>
            <input 
                type="text" 
                name="photo" 
                value={courseData.photo || ''} 
                onChange={handleChange} 
            />

            <button type="submit">Submit</button>
        </form>
    );
};

export default ModifEleve;
