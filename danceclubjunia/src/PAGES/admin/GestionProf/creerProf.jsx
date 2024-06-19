import React, { useState } from 'react';
// import Header from '../elements/header';
// import '../css/login.css';
import { URL_DB } from '../../../const/const';

function CreerProf() {
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const connectionMethod = "mail";
    const [photo, setPhoto] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            firstname,
            surname,
            email,
            password,
            connectionMethod,
            photo,
            description
        };

        console.log('Form Data:', formData);

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            window.alert('Aucun token trouvé');
            return;
        }

        console.log('Token:', token);

        try {
            const response = await fetch(URL_DB + 'admin/createTeacher', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                window.alert('Professeur créé avec succès.');
            } else {
                const data = await response.json();
                window.alert('Erreur lors de la création du prof vérifier les info entrées');
            }
        } catch (error) {
            console.error('Erreur:', error);
            window.alert('Erreur lors de la création du professeur.');
        }
    };

    return (
        <div className='scrollerFormAdmin'>
            <form onSubmit={handleSubmit} className='formAdminCreate'>
                <label>
                    firstname:
                    
                </label>
                <input
                        type="text"
                        required
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                <br />
                <label>
                    surname:
                    
                </label>
                <input
                        type="text"
                        required
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                <br />
                <label>
                    mail:
                   
                </label>
                <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                <br />
                <label>
                    password:
                   
                </label>
                <input
                        type="password"
                        placeholder='(9 caractère minimum)'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                <br />
                <label>
                    photo:
                    
                </label>
                <input
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0]?.name || '')}
                    />
                <br />
                <label>
                    description:
                   
                </label>
                <input
                        type="text"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                <br />
                <button type="submit">Créer le prof</button>
            </form>
        </div>
    );
};

export default CreerProf;
