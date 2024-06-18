import React, { useState, useEffect } from 'react';
import { URL_DB } from '../../../const/const';
import Loading from '../../../elements/loading';
import { useParams } from 'react-router-dom';

const ModifProf = () => {
    const { idParam } = useParams();
    const profId = idParam;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [teachersData, setTeachersData] = useState(null);
    const [formData, setFormData] = useState({
        teacherID: profId,
        firstname: '',
        surname: '',
        email: '',
        password: '',
        connectionMethod: '',
        credit: 0,
        photo: '',
        description: ''
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchEleve = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await fetch(`http://90.110.227.143/api/admin/getAllTeachers`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.courses) {
                        const filteredTeachers = data.courses.find(teacher => teacher.userID === parseInt(profId, 10));
                        if (filteredTeachers) {
                            setTeachersData(data);
                            setFormData({
                                teacherID: filteredTeachers.userID,
                                firstname: filteredTeachers.firstname,
                                surname: filteredTeachers.surname,
                                email: filteredTeachers.email,
                                password: '',
                                connectionMethod: filteredTeachers.connectionMethod,
                                credit: filteredTeachers.credit,
                                photo: filteredTeachers.photo,
                                description: filteredTeachers.description || '',
                            });
                        }
                    }
                } else {
                    throw new Error('Error fetching teacher');
                }
            } catch (error) {
                console.error('Error fetching teacher:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEleve();
    }, [profId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const formDataToSubmit = new FormData();
            formDataToSubmit.append('teacherID', formData.teacherID);
            formDataToSubmit.append('firstname', formData.firstname);
            formDataToSubmit.append('surname', formData.surname);
            formDataToSubmit.append('email', formData.email);
            formDataToSubmit.append('password', formData.password);
            formDataToSubmit.append('connectionMethod', formData.connectionMethod);
            formDataToSubmit.append('credit', formData.credit);
            formDataToSubmit.append('photo', imageFile ? imageFile : formData.photo);
            formDataToSubmit.append('description', formData.description);

            const response = await fetch(`${URL_DB}teacher/modifyTeacher`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSubmit,
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du professeur');
            }
            alert('Professeur mis à jour avec succès');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du professeur', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        setFormData(prevState => ({
            ...prevState,
            photo: URL.createObjectURL(file)
        }));
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error loading teacher: {error.message}</div>;
    }

    return (
        <div className='ModalAdminGrid'>
            <div>
                <h1>Modifier le professeur N°{profId}</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Image du professeur:
                        <input type="file" name="photo" accept="image/*" onChange={handleImageChange} />
                    </label>
                    <label>
                        Prénom:
                        <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
                    </label>
                    <label>
                        Nom:
                        <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="text" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    <label>
                        Mot de passe:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </label>
                    <label>
                        Méthode de connexion:
                        <input type="text" name="connectionMethod" value={formData.connectionMethod} onChange={handleChange} />
                    </label>
                    <label>
                        Crédit:
                        <input type="number" name="credit" value={formData.credit} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" value={formData.description} onChange={handleChange} />
                    </label>
                    
                    <button type="submit">Mettre à jour</button>
                </form>
            </div>
        </div>
    );
};

export default ModifProf;
