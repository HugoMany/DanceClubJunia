import React, { useState, useEffect } from 'react';
import { URL_DB } from '../../../const/const';
import Loading from '../../../elements/loading';
import { useParams } from 'react-router-dom';

const ModifEleve = () => {
    const { idParam } = useParams();
    const eleveId = idParam;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [eleveData, setEleveData] = useState(null);
    const [formData, setFormData] = useState({});
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchEleve = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return { valid: false };

                const response = await fetch(`http://90.110.227.143/api/teacher/getStudent?studentID=${eleveId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setEleveData(data);
                    setFormData(data);
                } else {
                    throw new Error('Error fetching eleve');
                }
            } catch (error) {
                console.error('Error fetching eleve:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEleve();
    }, [eleveId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };

            const studentDataModify = {
                studentID:2,
                firstname:formData.firstname,
                surname:formData.surname,
                email:formData.email,
                password:formData.password,
                connectionMethod:formData.connectionMethod,
                credit:formData.credit,
                photo:formData.photo,
                description:formData.description,
                 };
                console.log(studentDataModify)
            const response = await fetch(URL_DB + `teacher/modifyStudent`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: studentDataModify,
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de l\'élève');
            }
            alert('Élève mis à jour avec succès');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'élève', error);
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
        return <div>Error loading student: {error.message}</div>;
    }

    return (
        <div className='ModalAdminGrid'>
            <div>
                <h1>Modifier l'élève N°{eleveId}</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Image de l'élève:
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
                        Email:
                        <input type="text" name="email" placeholder={formData.email} onChange={handleChange} />
                    </label>
                    <label>
                        Mot de passe:
                        <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} />
                    </label>
                    <label>
                        Méthode de connexion:
                        <input type="text" name="connectionMethod" placeholder={formData.connectionMethod} onChange={handleChange} />
                    </label>
                    <label>
                        Crédit:
                        <input type="number" name="credit" placeholder={formData.credit} onChange={handleChange} />
                    </label>
                    <button type="submit">Mettre à jour</button>
                </form>
            </div>
        </div>
    );
};

export default ModifEleve;
