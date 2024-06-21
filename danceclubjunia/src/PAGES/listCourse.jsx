import React, { useState, useEffect } from 'react';
import { URL_DB } from '../const/const';
import Loading from '../elements/loading';

const CoursesList = () => {
    const [cours, setCours] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCours = async () => {
            try {
                const response = await fetch(URL_DB + 'guest/getAllCourses', {
                    method: 'GET',
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data.courses);

                    // Filtrer les cours pour exclure ceux dont la date de début est passée
                    const currentDate = new Date();
                    const filteredCourses = data.courses.filter(course => new Date(course.startDate) > currentDate);
                    // Trier les cours restants par date de début
                    const sortedCourses = filteredCourses.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
                    setCours(sortedCourses);
                    console.log(sortedCourses);
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

    if (loading) {
        return <div><Loading /></div>;
    }

    return (
        <div>
            {cours.length === 0 ? (
                <h3 className='coursesCase'>Il n'y a pas de cours à venir</h3>
            ) : (
                cours.map(course => {
                    const students = JSON.parse(course.studentsID || '[]');
                    return (
                        <a href={'/cours/' + course.courseID} className='courseA' key={course.courseID}>
                            <div className="coursesCase">
                                <div className='divImageCoursSuivanteHomePage'>
                                    <div className='imageCoursSuivanteHomePage'>
                                        <img src={"https://gap.asptt.com/files/2021/08/salsa.png"} alt={course.title} />
                                    </div>
                                </div>
                                <div className='timeCoursSuivantHomePage'>
                                    <h5>{course.title}</h5>
                                    <p>{new Date(course.startDate).toLocaleString()}</p>
                                </div>
                                <div className='typeEtProfCoursSuivantHomePage'>
                                    <p>{course.type}</p>
                                    <p>{course.teachersID}</p>
                                </div>
                                <div className='studentCount'>
                                    <p>{students.length} / {course.maxParticipants} participants</p>
                                </div>
                            </div>
                        </a>
                    );
                })
            )}
        </div>
    );
};

export default CoursesList;
