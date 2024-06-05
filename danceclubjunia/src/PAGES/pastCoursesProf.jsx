import React, { useState, useEffect } from 'react';

const TeacherPastCourses = ({ studentId }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchPastCourses = async () => {
            try {
                const response = await fetch(`http://example.com/api/courses/${studentId}`, {
                    method: 'GET', // Utilisez GET pour récupérer des données
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

    return (
        <div>
            <h2>Your Past Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.courseId}>
                        <h3>{course.title}</h3>
                        <img src={course.image} alt={course.title} />
                        <p>Type: {course.type}</p>
                        <p>Start Date: {course.startDate.toDateString()}</p>
                        <p>Start Time: {course.startTime}</p>
                        <p>Location: {course.location}</p>
                        <p>Duration: {course.duration}</p>
                        <p>Students: {course.students.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const PastCoursesProf = () => {
    return <TeacherPastCourses teacherId="Teacher 1" />;
};

export default PastCoursesProf;
