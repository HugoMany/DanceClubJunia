import React, { useState, useEffect } from 'react';

const StudentPastCourses = ({ studentId }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchPastCourses = async () => {
            try {
                const response = await fetch(`http://example.com/api/courses/${studentId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCourses(data);
                } else {
                    console.error('Erreur lors de la récupération des cours terminés');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des cours terminés', error);
            }
        };

        fetchPastCourses();
    }, [studentId]);

    // Filtrer les cours passés
    const pastCourses = courses.filter(course => new Date(course.endDate) < new Date());

    return (
        <div>
            <ul>
                {pastCourses.map(course => (
                    <a href={`/cours/${course.courseId}/1/`} className='courseA' key={course.courseId}>
                        <div className="coursesCase">
                            <div className='divImageCoursSuivanteHomePage'>
                                <div className='imageCoursSuivanteHomePage'>
                                    <img src={"https://gap.asptt.com/files/2021/08/salsa.png"} alt={course.title} />
                                </div>
                            </div>
                            <div className='timeCoursSuivantHomePage'>                        
                                <h5>{course.title}</h5>
                                <p>{new Date(course.startDate).toDateString()}</p>
                                <p>{course.startTime}</p>
                            </div>
                            <div className='typeEtProfCoursSuivantHomePage'>
                                <p>{course.type}</p>
                                <p>{course.teachers.join(', ')}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </ul>
        </div>
    );
};

const PastCoursesEleve = () => {
    return <StudentPastCourses studentId="Student 3" />;
};

export default PastCoursesEleve;
