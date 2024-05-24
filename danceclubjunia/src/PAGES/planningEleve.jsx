// Endpoint to get courses for a specific student 
// app.get('/api/students/:studentId/courses', (req, res) => {
//     const { studentId } = req.params;
//     // Retrieve courses for the student from the database
//     const courses = db.getCoursesForStudent(studentId);
//     res.json(courses);
// });


import React, { useState, useEffect } from 'react';

const StudentCourses = ({ studentId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the courses for the student
        fetch(`http://example.com/api/students/${studentId}/courses`)
            .then(response => response.json())
            .then(data => {
                // Sort courses by start date and time
                const sortedCourses = data.sort((a, b) => {
                    const dateA = new Date(`${a.startDate}T${a.startTime}`);
                    const dateB = new Date(`${b.startDate}T${b.startTime}`);
                    return dateA - dateB;
                });
                setCourses(sortedCourses);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
                setError(error);
                setLoading(false);
            });
    }, [studentId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading courses: {error.message}</div>;

    return (
        <div>
            <h2>Upcoming Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.courseId}>
                        <h3>{course.title}</h3>
                        <p>Type: {course.type}</p>
                        <p>Start Date: {course.startDate}</p>
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

export default StudentCourses;
