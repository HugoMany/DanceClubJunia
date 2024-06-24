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
                setMessage('carte crée');
            } else {
                const error = await response.json();
                setMessage(error.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('erreur');
        }
    };


    const deleteCard = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };
            const response = await fetch(URL_DB + 'admin/deleteCard', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ place })
            });

            if (response.ok) {
                const data = await response.json();
                setMessage('carte supprimée');
            } else {
                const error = await response.json();
                setMessage(error.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('erreur');
        }
    };
    
    return (
        <div className=''>
            <Header></Header>
            <div className='aboAdmin'>
                <h1>Ticket et Cartes</h1>
                <div style={{ marginBottom: '50px', padding: '20px', border: '1px solid #ccc' }}>
                    <h2>Créer une carte</h2>
                    <h3>Nombre de place</h3>
                    <input type="number" value={place} onChange={e => setPlace(e.target.value)} placeholder="Number of places" />
                    <h3>Prix</h3>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
                    <button onClick={createCard}>créer</button>
                </div>
                <div style={{ padding: '20px', border: '1px solid #ccc' }}>
                    <h2>Supprimer une carte</h2>
                    <p>Saisissez le nombre de place de la carte que vous voulez supprimer</p>
                    <input type="number" value={place} onChange={e => setPlace(e.target.value)} placeholder="Number of places" />
                    <button onClick={deleteCard}>supprimer</button>
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default CreateCardPage;