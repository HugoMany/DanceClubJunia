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
            <h2>Past Courses</h2>
            <ul>
                {pastCourses.map(course => (
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

const PastCoursesProf = () => {
    return <StudentPastCourses studentId="Student 3" />;
};

export default PastCoursesProf;
