import React, { useState, useEffect } from 'react';

// Simulated backend data and functions
let coursesData = [
    {
        courseId: '1',
        title: 'Salsa Dance',
        type: 'Salsa',
        duration: '2 hours',
        startDate: '2024-05-30',
        startTime: '18:00',
        location: 'Studio A',
        teachers: ['Teacher 1'],
        students: ['Student 1', 'Student 2']
    },
    {
        courseId: '2',
        title: 'Ballet Class',
        type: 'Ballet',
        duration: '1.5 hours',
        startDate: '2024-06-01',
        startTime: '17:00',
        location: 'Studio B',
        teachers: ['Teacher 1'],
        students: ['Student 3', 'Student 4']
    }
];

const getCoursesForTeacher = (teacherId) => {
    return coursesData.filter(course => course.teachers.includes(teacherId));
};

const deleteCourse = (courseId) => {
    coursesData = coursesData.filter(course => course.courseId !== courseId);
};

// React component
const TeacherCourses = ({ teacherId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate fetching courses for the teacher
        try {
            const data = getCoursesForTeacher(teacherId);
            // Sort courses by start date and time
            const sortedCourses = data.sort((a, b) => {
                const dateA = new Date(`${a.startDate}T${a.startTime}`);
                const dateB = new Date(`${b.startDate}T${b.startTime}`);
                return dateA - dateB;
            });
            setCourses(sortedCourses);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setError(error);
            setLoading(false);
        }
    }, [teacherId]);

    const handleDelete = (courseId) => {
        try {
            deleteCourse(courseId);
            // Remove the deleted course from the state
            setCourses(courses.filter(course => course.courseId !== courseId));
        } catch (error) {
            console.error('Error deleting course:', error);
            setError(error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading courses: {error.message}</div>;

    return (
        <div>
            <h2>Your Upcoming Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.courseId}>
                        <h3>{course.title}</h3>
                        <p>Type: {course.type}</p>
                        <p>Start Date: {course.startDate}</p>
                        <p>Start Time: {course.startTime}</p>
                        <p>Location: {course.location}</p>
                        <p>Duration: {course.duration}</p>
                        <p>Students: {course.students.length}</p>
                        <button onClick={() => handleDelete(course.courseId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Usage example
const App = () => {
    return <TeacherCourses teacherId="Teacher 1" />;
};

export default App;
