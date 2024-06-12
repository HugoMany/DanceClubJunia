import React, { useState, useEffect } from 'react';

const PlanningEleve = ({ studentId }) => {const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCourses = async () => {
            try {const token = localStorage.getItem('token');
            if (!token) return { valid: false };
            
            const response = await fetch(`${URL}/api/student/getCourses?studentID=${studentId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                });

                if (response.ok) {
                    const data = await response.json();
                    const now = new Date();
                    const upcomingCourses = data.filter(course => new Date(course.endDate) > now);
                    setCourses(upcomingCourses);
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
            <h2>Upcoming Courses</h2>
            <ul>
                {courses.map(course => (
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
