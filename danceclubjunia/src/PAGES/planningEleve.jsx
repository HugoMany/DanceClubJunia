import React, { useState, useEffect } from 'react';

const PlanningEleve = ({ studentId }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchUpcomingCourses = async () => {
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
                    console.error('Erreur lors de la récupération des cours à venir');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des cours à venir', error);
            }
        };

        fetchUpcomingCourses();
    }, [studentId]);

    // Filtrer les cours à venir
    const upcomingCourses = courses.filter(course => new Date(course.startDate) > new Date());

    return (
        <div>
            <h2>Upcoming Courses</h2>
            <ul>
                {upcomingCourses.map(course => (
                    <li key={course.courseId}>
                        <h3>{course.title}</h3>
                        <img src={course.image} alt={course.title} />
                        <p>Type: {course.type}</p>
                        <p>Start Date: {new Date(course.startDate).toDateString()}</p>
                        <p>Start Time: {course.startTime}</p>
                        <p>Location: {course.location}</p>
                        <p>Duration: {course.duration}</p>
                        <p>Teachers: {course.teachers.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// exemple
//     return <PlanningEleve studentId="Student 3" />;
//

export default PlanningEleve;
