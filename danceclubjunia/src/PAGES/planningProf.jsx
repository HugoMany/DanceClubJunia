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

const addStudentToCourse = (courseId, studentId) => {
    const course = coursesData.find(course => course.courseId === courseId);
    if (course && !course.students.includes(studentId)) {
        course.students.push(studentId);
    }
};

const removeStudentFromCourse = (courseId, studentId) => {
    const course = coursesData.find(course => course.courseId === courseId);
    if (course) {
        course.students = course.students.filter(student => student !== studentId);
    }
};

// React component
const TeacherCourses = ({ teacherId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newStudentId, setNewStudentId] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');

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

    const handleAddStudent = (courseId) => {
        try {
            addStudentToCourse(courseId, newStudentId);
            // Update the course list with the new student added
            setCourses(courses.map(course => 
                course.courseId === courseId 
                ? { ...course, students: [...course.students, newStudentId] }
                : course
            ));
            setNewStudentId('');
        } catch (error) {
            console.error('Error adding student:', error);
            setError(error);
        }
    };

    const handleRemoveStudent = (courseId, studentId) => {
        try {
            removeStudentFromCourse(courseId, studentId);
            // Update the course list with the student removed
            setCourses(courses.map(course => 
                course.courseId === courseId 
                ? { ...course, students: course.students.filter(student => student !== studentId) }
                : course
            ));
        } catch (error) {
            console.error('Error removing student:', error);
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
                        <p>Students: {course.students.join(', ')}</p>
                        <button onClick={() => handleDelete(course.courseId)}>Delete</button>
                        <div>
                            <input
                                type="text"
                                placeholder="New Student ID"
                                value={newStudentId}
                                onChange={(e) => {
                                    setNewStudentId(e.target.value);
                                    setSelectedCourseId(course.courseId);
                                }}
                            />
                            <button onClick={() => handleAddStudent(course.courseId)}>Add Student</button>
                        </div>
                        <ul>
                            {course.students.map(student => (
                                <li key={student}>
                                    {student}
                                    <button onClick={() => handleRemoveStudent(course.courseId, student)}>Remove</button>
                                </li>
                            ))}
                        </ul>
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
