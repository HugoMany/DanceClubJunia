import React, { useState, useEffect } from 'react';
import Header from '../../../elements/header';


//firstname, surname, email, password, connectionMethod,userId, credit
const ModifEleve = ({ userId }) => {
    const [firstname, setFirsname] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [connectionMethod, setConnectionMethod] = useState('');
    useEffect(() => {
        if (userId) {
            // Fetch existing course data
            fetch(`http://example.com/api/courses/${userId}`)
                .then(response => response.json())
                .then(data => {
                    setFirsname(data.firstname);
                    setSurname(data.surname);
                    setEmail(data.email);
                    setConnectionMethod(data.connectionMethod);
                })
                .catch(error => console.error('Error fetching course data:', error));
        }
    }, [userId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const json = {
            userId,
            firstname,
            surname,
            email,
            connectionMethod,
        };

        console.log('Form Data:', json);

        fetch(`http://example.com/api/courses${userId ? `/${userId}` : ''}`, {
            method: userId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Header></Header>
            <label htmlFor="teacherId">Prof ID:</label>
            <input type="text" id="teacherId" value={userId} readOnly />

            <label htmlFor="firsname">Firsname:</label>
            <input type="text" id="firstname" value={firstname} onChange={(e) => setFirsname(e.target.value)} />

            <label htmlFor="surname">Surname:</label>
            <input type="text" id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="connectionMethod">Connection Method:</label>
            <input type="text" id="connectionMethod" value={connectionMethod} onChange={(e) => setConnectionMethod(e.target.value)} />

            <button type="submit">Submit</button>
        </form>
    );
};

export default ModifEleve;
