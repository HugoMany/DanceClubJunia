import React, { useState } from 'react';
import { URL_DB } from '../../../const/const';
import Header from '../../../elements/header';
import { Button } from '@mui/material';
const Revenu = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [revenueDetails, setRevenueDetails] = useState(null);
    const [error, setError] = useState(null);
    const [teacherSurnames, setTeacherSurnames] = useState([]);

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
            const teacherIDs = data.revenueDetails.teachersRevenue.map(item => item.teacherID);
            console.log("ID : " + teacherIDs);

            if (data.success) {
                setRevenueDetails(data.revenueDetails);
                const infoProf = await fetch(URL_DB+'guest/getContactsTeachers',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userIDs: teacherIDs }),
                });
                const  info = await infoProf.json();
                console.log("oooooo");
                console.log(info);
                const surnames = info.contacts.map(contact => contact.surname);
                setTeacherSurnames(surnames);
                console.log(teacherSurnames);
            } else {
                setError('Une erreur est survenue lors de la récupération des détails des revenus.');
            }
        } catch (err) {
            setError('Une erreur est survenue lors de la récupération des détails des revenus.');
        }
    };

    return (
        <div >
            <Header></Header>
            <form onSubmit={handleSubmit} className='revenuForm'>
                <h1>Revenu total</h1>
                <label>
                    Date de début :
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
                </label>
                <label>
                    Date de fin :
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
                </label>
                <Button variant="contained" type="submit">Calculer les revenus</Button>
            </form>

            {revenueDetails && (
                <div className='resultatRevenu'>
                    <h2>Détails des revenus</h2>
                    <p>Profit total : {revenueDetails.totalProfit}</p>
                    <p>Part de l'association : {revenueDetails.assoPart}</p>
                    <h3>Revenus des enseignants :</h3>
                    {revenueDetails.teachersRevenue.map((teacher, index) => (
                        <p key={index}>{teacherSurnames[index]} : {teacher.revenue}</p>
                        
                    ))}
                </div>
            )}

            {error && <p>{error}</p>}
        </div>
    );
};

export default Revenu;