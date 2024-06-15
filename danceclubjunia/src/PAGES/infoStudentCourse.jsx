import React, { useState, useEffect } from 'react';
import { URL_DB } from '../const/const';

const InfoStudentCourse = ({ studentId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };
            
            const response = await fetch(`${URL_DB}user/searchCoursesStudent?userID=${studentId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCourses(data);
                } else {
                    throw new Error('Error fetching courses');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [studentId]);

    // Filtrer les cours à venir
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading courses: {error.message}</div>;

    return (
        <div>
            
            <ul>
                {courses.map(course => (
                    <li key={course.courseId}>

                        <p> {course.courseName}</p>
                        <p>professeur: {course.startTime}</p>
                        <p>emploi du temps: {course.shedule}</p>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

// exemple
//     return <PlanningEleve studentId="Student 3" />;
//

export default InfoStudentCourse;
