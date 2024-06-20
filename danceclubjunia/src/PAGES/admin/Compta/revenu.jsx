import React, { useState } from 'react';
import { URL_DB } from '../../../const/const';

const Revenu = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [revenueDetails, setRevenueDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setRevenueDetails(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };
            const response = await fetch(URL_DB+`admin/calculateRevenue?startDate=${startDate}&endDate=${endDate}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (data.success) {
                setRevenueDetails(data.revenueDetails);
            } else {
                setError('Une erreur est survenue lors de la récupération des détails des revenus.');
            }
        } catch (err) {
            setError('Une erreur est survenue lors de la récupération des détails des revenus.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Date de début :
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
                </label>
                <label>
                    Date de fin :
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
                </label>
                <button type="submit">Calculer les revenus</button>
            </form>

            {revenueDetails && (
                <div>
                    <h2>Détails des revenus</h2>
                    <p>Profit total : {revenueDetails.totalProfit}</p>
                    <p>Part de l'association : {revenueDetails.assoPart}</p>
                    <h3>Revenus des enseignants :</h3>
                    {revenueDetails.teachersRevenue.map((teacher, index) => (
                        <p key={index}>Enseignant ID {teacher.teacherID} : {teacher.revenue}</p>
                    ))}
                </div>
            )}

            {error && <p>{error}</p>}
        </div>
    );
};

export default Revenu;