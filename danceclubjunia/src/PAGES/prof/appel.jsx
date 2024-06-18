import React, { useState, useEffect } from 'react';
import Header from '../../elements/header';
import { URL_DB } from '../../const/const';
import "../../css/appel.css";
import { Button, Card, CardContent, Typography } from '@mui/material';
import AddTagToACours from './addTagToACours';
import AddlinkToACours from './addLinkToACours';

const Appel = () => {
    const [cours, setCours] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    useEffect(() => {
        const fetchCours = async () => {
            try {
                const response = await fetch(URL_DB + 'guest/getAllCourses', {
                    method: 'GET',
                });

                if (response.ok) {
                    const data = await response.json();
                    const currentDate = new Date();

                    const isSameDay = (date1, date2) => {
                        return date1.getFullYear() === date2.getFullYear() &&
                            date1.getMonth() === date2.getMonth() &&
                            date1.getDate() === date2.getDate();
                    };

                    const todaysCourses = data.courses.filter(course =>
                        isSameDay(new Date(course.startDate), currentDate)
                    );

                    const sortedCourses = todaysCourses.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
                    setCours(sortedCourses);
                } else {
                    console.error('Erreur lors de la récupération des cours');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des cours', error);
            }
        };

        fetchCours();
    }, []);

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
                                <Button variant="contained" color="primary" onClick={() => setSelectedCourseId(course.courseID)}>Selectionné</Button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p>Aucun cours prévu pour aujourd'hui.</p>
                )}
            </div>
            {selectedCourseId && (
                <div>
                    <AddTagToACours idCoursSelected={selectedCourseId} />
                    <AddlinkToACours idCoursSelected={selectedCourseId} />
                </div>
            )}
        </div>
    );
};

export default Appel;