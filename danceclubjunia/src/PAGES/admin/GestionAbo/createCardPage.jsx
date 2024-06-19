import React, { useState } from 'react';
import { URL_DB } from '../../../const/const';
import Header from '../../../elements/header';
const CreateCardPage = () => {
    const [place, setPlace] = useState(0);
    const [price, setPrice] = useState(0);
    const [message, setMessage] = useState('');

    const createCard = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };
            const response = await fetch(URL_DB + 'admin/createCard', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ place, price })
            });

            if (response.ok) {
                const data = await response.json();
                setMessage('Card created successfully');
            } else {
                const error = await response.json();
                setMessage(error.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error creating card');
        }
    };

    return (
        <div className=''>
                    <Header></Header>
            <h1>Create Card Page</h1>
            <h2>Nombre de place</h2>
            <input type="number" value={place} onChange={e => setPlace(e.target.value)} placeholder="Number of places" />
            <h2>Prix</h2>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
            <button onClick={createCard}>Create Card</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateCardPage;