import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../elements/header';
import { URL_DB } from '../const/const';
import Loading from '../elements/loading';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const CoursDynamique = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [studentID, setStudentID] = useState(null);
    const [reservationMessage, setReservationMessage] = useState('');
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return { valid: false };

                const response = await fetch(`${URL_DB}auth/verifyToken`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    return { valid: true, userID: data.userId };
                } else {
                    return { valid: false };
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                return { valid: false };
            }
        };

        const fetchCourse = async () => {
            try {
                const tokenVerification = await verifyToken();
                if (!tokenVerification.valid) {
                    setLoading(false);
                    return;
                }

                const token = localStorage.getItem('token');
                setStudentID(tokenVerification.userID);

                const response = await fetch(`${URL_DB}guest/getAllCourses`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const filteredCourse = data.courses.find(course => course.courseID === parseInt(courseId, 10));
                    setCourse(filteredCourse);
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

        fetchCourse();
    }, [courseId]);

    useEffect(() => {
        if (course) {
            const teacherIDs = JSON.parse(course.teachersID || '[]');
            fetchTeachersInfo(teacherIDs);
        }
    }, [course]);

    const fetchTeachersInfo = async (teacherIDs) => {
        try {
            const response = await fetch(`${URL_DB}guest/getContactsTeachers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userIDs: teacherIDs }),
            });

            if (response.ok) {
                const data = await response.json();
                setTeachers(data.contacts);
            } else {
                throw new Error('Error fetching teachers');
            }
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const handleReservation = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await fetch(`${URL_DB}student/reserveCourse`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentID: studentID,
                    courseID: parseInt(courseId, 10),
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setReservationMessage('Vous êtes bien inscrit au cours.');
                setCourse(prevCourse => ({
                    ...prevCourse,
                    studentsID: JSON.stringify([...JSON.parse(prevCourse.studentsID || '[]'), studentID])
                }));
            } else {
                const errorData = await response.json();
                setReservationMessage(errorData.message || 'Error reserving course');
            }
        } catch (error) {
            console.error('Error reserving course:', error);
            setReservationMessage(error.message);
        }
    };

    if (loading) return <Loading />;

    if (error) return <div>Error: {error.message}</div>;

    if (course === null) return <div>No course found</div>;

    const students = JSON.parse(course.studentsID || '[]');
    const maxParticipants = course.maxParticipants;
    const isFull = students.length >= maxParticipants;

    // Extract the start time from the startDate
    const startTime = new Date(course.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className='coursDynamique'>
            <Header title={course.title} />
            <h1>{course.title}</h1>
            <p>Type: {course.type}</p>
            <p>Start Date: {new Date(course.startDate).toDateString()}</p>
            <p>Start Time: {startTime}</p>
            <p>Location: {course.location}</p>
            <p>Duration: {course.duration} minutes</p>
            <p>Teachers: {teachers.map(teacher => teacher.surname).join(', ')}</p>
            <Button 
                variant="contained" 
                color={isFull ? "secondary" : "primary"} 
                onClick={handleReservation} 
                disabled={isFull}
            >
                {isFull ? "Cours plein" : "Réserver"}
            </Button>
            {reservationMessage && <Alert severity="info">{reservationMessage}</Alert>}
        </div>
    );
};

export default CoursDynamique;
