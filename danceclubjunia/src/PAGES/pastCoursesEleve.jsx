import React, { useState, useEffect } from 'react';

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
}

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
        students: ['Student 1', 'Student 3'],
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

// Function to get courses for a student
const getCoursesForStudent = (studentId) => {
    return coursesData.filter(course => course.students.includes(studentId));
};

// Component to display past courses for a student
const StudentPastCourses = ({ studentId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const data = getCoursesForStudent(studentId);
            const now = new Date();
            const pastCourses = data.filter(course => course.startDate < now);
            const sortedCourses = pastCourses.sort((a, b) => b.startDate - a.startDate);
            setCourses(sortedCourses);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setError(error);
            setLoading(false);
        }
    }, [studentId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading courses: {error.message}</div>;

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
                        <p>Teachers: {course.teachers.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const PlanningEleve = () => {
    return <StudentPastCourses studentId="Student 3" />;
};

export default PlanningEleve;
