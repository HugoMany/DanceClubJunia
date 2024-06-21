import React, { useState } from 'react';
import { Button } from '@mui/material';
import { URL_DB } from '../../const/const';
const DeleteACours = ({ idCoursSelected }) => {
    const [loading, setLoading] = useState(false);

    const fetchCours = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            console.log(token)
            await fetch(URL_DB + 'teacher/cancelCourse', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    courseID: idCoursSelected
                })
            });
        } catch (error) {
            console.error('Erreur lors de la supprétion du cours', error);
        } finally {
            setLoading(false);
            setTimeout(() => {
                window.location.href = '/prof/';
            }, 2000);
        }
    };

    return (
        <div>
            <Button variant="contained" fullWidth="true" color="error" onClick={fetchCours} disabled={loading}>
                {loading ? 'Deleting...' : 'Delete Course'}
            </Button>
        </div>
    );
};

export default DeleteACours;