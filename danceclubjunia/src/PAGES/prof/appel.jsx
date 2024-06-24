import React, { useState, useEffect } from 'react';
import Header from '../../elements/header';
import { URL_DB } from '../../const/const';
import "../../css/appel.css";
import { Button, Card, CardContent, Typography } from '@mui/material';
import AddTagToACours from './addTagToACours';
import AddlinkToACours from './addLinkToACours';
import ReturnStudentsProfil from './returnStudentsProfil';
import Loading from '../../elements/loading';
const Appel = () => {
    const [cours, setCours] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCours = async () => {
            try {
                const response = await fetch(URL_DB + 'guest/getAllCourses', {
                    method: 'GET',
                });

                if (response.ok) {
                    const data = await response.json();

                    const isSameDay = (date) => {
                        const currentDate = new Date();
                        return date > currentDate;
                    };

                    const todaysCourses = data.courses.filter(course =>
                        isSameDay(new Date(course.startDate))
                    );

                    const sortedCourses = todaysCourses.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
                    setCours(sortedCourses);
                    setLoading(false);
                } else {
                    console.error('Erreur lors de la récupération des cours');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des cours', error);
            }
        };

        fetchCours();
    }, []);
    if(loading) return <Loading></Loading>
    else
    return (
        <div>
            <Header />
            <h1>Liste des cours de la journée</h1>
            <div className='appelDate'>
                {cours.length > 0 ? (
                    cours.map((course) => (
                        <Card key={course.id} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Typography variant="h5">{course.title}</Typography>
                                <Typography color="textSecondary">Start Date: {new Date(course.startDate).toLocaleString()}</Typography>
                                <Typography color="textSecondary">Location: {course.location}</Typography>
                                <Button variant="contained" color="primary" href={'/prof/cours/'+course.courseID}>Selectionné</Button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p>Aucun cours prévu pour l'instant.</p>
                )}
            </div>
        </div>
    );
};

export default Appel;