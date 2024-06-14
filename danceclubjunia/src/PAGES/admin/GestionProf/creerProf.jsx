import React, { useState } from 'react';
import Header from '../../../elements/header';
import { URL_DB } from '../../../const/const';

const CreerProf = () => {
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [connectionMethod, setConnectionMethod] = useState('');
    const [photo, setPhoto] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handleSubmit called');

        const formData = {
            firstname,
            surname,
            email,
            password,
            connectionMethod,
            photo,
            description
        };

        console.log('FormData:', formData);

        const fetchProf = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return { valid: false };
                }

                console.log('Token:', token);

                const response = await fetch(URL_DB + 'admin/createTeacher', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                console.log('Response:', data);

            } catch (error) {
                console.error('Erreur lors de la création du prof', error);
            }
        };

        fetchProf();
    };

    return (
        <div className='Form'>
            <form onSubmit={handleSubmit}>
                {/* <Header /> */}
                <label>
                    firstname:
                    <input
                        type="text"
                        required
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    surname:
                    <input
                        type="text"
                        required
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    mail:
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    password:
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    connectionMethod:
                    <input
                        type="text"
                        required
                        value={connectionMethod}
                        onChange={(e) => setConnectionMethod(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    photo:
                    <input
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0]?.name || '')}
                    />
                </label>
                <br />
                <label>
                    description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </label>
                <br />
                <button type="submit">Créer le prof</button>
            </form>
        </div>
    );
};

export default CreerProf;
