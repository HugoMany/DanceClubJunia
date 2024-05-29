import React, { useState, useEffect } from 'react';
// Define the Course class
class Course {
    constructor({
        courseId,
        image,
        title,
        type,
        duration,
        startDate,
        startTime,
        location,
        maxParticipants,
        paymentType,
        price,
        paymentOptions,
        isEvening,
        teachers,
        links,
        students,
        tags
    }) {
        this.courseId = courseId;
        this.image = image;
        this.title = title;
        this.type = type;
        this.duration = duration;
        this.startDate = new Date(startDate);
        this.startTime = startTime;
        this.location = location;
        this.maxParticipants = maxParticipants;
        this.paymentType = paymentType;
        this.price = price;
        this.paymentOptions = paymentOptions;
        this.isEvening = isEvening;
        this.teachers = teachers;
        this.links = links;
        this.students = students;
        this.tags = tags;
    }

    addStudent(studentId) {
        if (this.students.includes(studentId)) {
            throw new Error('Student is already enrolled in this course.');
        }
        this.students.push(studentId);
    }

    removeStudent(studentId) {
        this.students = this.students.filter(student => student !== studentId);
    }
}
// Simulated backend data and functions
let coursesData = [
    new Course({
        courseId: '1',
        image: 'image1.jpg',
        title: 'Salsa Dance',
        type: 'Salsa',
        duration: '2 hours',
        startDate: '2024-05-30',
        startTime: '18:00',
        location: 'Studio A',
        maxParticipants: 20,
        paymentType: 'subscription',
        price: null,
        paymentOptions: [],
        isEvening: false,
        teachers: ['Teacher 1'],
        links: [],
        students: ['Student 1', 'Student 2'],
        tags: []
    }),
    new Course({
        courseId: '2',
        image: 'image2.jpg',
        title: 'Ballet Class',
        type: 'Ballet',
        duration: '1.5 hours',
        startDate: '2024-06-01',
        startTime: '17:00',
        location: 'Studio B',
        maxParticipants: 15,
        paymentType: 'one-time',
        price: 25,
        paymentOptions: [],
        isEvening: false,
        teachers: ['Teacher 1'],
        links: [],
        students: ['Student 3', 'Student 4'],
        tags: []
    })
];

const getCoursesForTeacher = (teacherId) => {
    return coursesData.filter(course => course.teachers.includes(teacherId));
};

const deleteCourse = (courseId) => {
    coursesData = coursesData.filter(course => course.courseId !== courseId);
};

const addStudentToCourse = (courseId, studentId) => {
    const course = coursesData.find(course => course.courseId === courseId);
    if (course) {
        try {
            course.addStudent(studentId);
        } catch (error) {
            console.error(error.message);
        }
    }
};

const removeStudentFromCourse = (courseId, studentId) => {
    const course = coursesData.find(course => course.courseId === courseId);
    if (course) {
        course.removeStudent(studentId);
    }
};

// React component
const TeacherCourses = ({ teacherId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newStudentId, setNewStudentId] = useState('');

    useEffect(() => {
        // Simulate fetching courses for the teacher
        try {
            const data = getCoursesForTeacher(teacherId);
            const now = new Date();
            const upcomingCourses = data.filter(course => course.startDate > now);
            const sortedCourses = upcomingCourses.sort((a, b) => a.startDate - b.startDate);
            setCourses(sortedCourses);
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
                        <img src={course.image} alt={course.title} />
                        <p>Type: {course.type}</p>
                        <p>Start Date: {course.startDate.toDateString()}</p>
                        <p>Start Time: {course.startDate.toTimeString().slice(0, 5)}</p>
                        <p>Location: {course.location}</p>
                        <p>Duration: {course.duration}</p>
                        <p>Students: {course.students.join(', ')}</p>
                        <button onClick={() => handleDelete(course.courseId)}>Delete</button>
                        <div>
                            <input
                                type="text"
                                placeholder="New Student ID"
                                value={newStudentId}
                                onChange={(e) => setNewStudentId(e.target.value)}
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
const PlanningProf = () => {
    return <TeacherCourses teacherId="Teacher 1" />;
};

export default PlanningProf;
