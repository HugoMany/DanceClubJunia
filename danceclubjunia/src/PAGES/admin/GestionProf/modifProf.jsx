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
        const fetchProf = async () => {
            try {
                console.log('1')
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
                    console.log(data)
                    if (data.teachers) {
                        
                        const filteredTeachers = data.teachers.find(teacher => teacher.userID === parseInt(profId, 10));
                        if (filteredTeachers) {
                            console.log(filteredTeachers)
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

        fetchProf();
    }, [profId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const profDataModify = {
                teacherID:2,
                firstname:formData.firstname,
                surname:formData.surname,
                email:formData.email,
                password:formData.password,
                connectionMethod:formData.connectionMethod,
                credit:formData.credit,
                photo:formData.photo,
                description:formData.description,
                 };
            console.log(profDataModify)


            const response = await fetch(`${URL_DB}admin/modifyTeacher`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(profDataModify),
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
                        <input type="text" name="firstname" placeholder={formData.firstname} onChange={handleChange} />
                    </label>
                    <label>
                        Nom:
                        <input type="text" name="surname" placeholder={formData.surname} onChange={handleChange} />
                    </label>
                    <label>
                        Crédit:
                        <input type="number" name="credit" placeholder={formData.credit} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" placeholder={formData.description} onChange={handleChange} />
                    </label>
                    
                    <button type="submit">Mettre à jour</button>
                </form>
            </div>
        </div>
    );
};

export default ModifProf;
