import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../elements/header';
import { URL_DB } from '../const/const';
import Loading from '../elements/loading';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const CoursDynamique = () => {
    const { courseId } = useParams();
    console.log(courseId + 'courseId1');
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [studentID, setStudentID] = useState(null);
    const [reservationMessage, setReservationMessage] = useState('');

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return { valid: false };
                console.log("oooooooooooooo")
                const response = await fetch(`${URL_DB}auth/verifyToken`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
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
                
                const token = localStorage.getItem('token');
                if (!token) return { valid: false };

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
                    console.log(filteredCourse);
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

    console.log(courseId + ' ID cours');
    console.log(studentID + ' studentID');

    if (loading) return <Loading />;

    if (error) return <div>Error: {error.message}</div>;

    if (course === null) return <div>No course found</div>;

    // Parse the studentsID and calculate the number of participants
    const students = JSON.parse(course.studentsID || '[]');
    const maxParticipants = course.maxParticipants;
    const isFull = students.length >= maxParticipants;

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
                // Optionally, refresh the course data to reflect the new participant
                setCourse(prevCourse => ({
                    ...prevCourse,
                    studentsID: JSON.stringify([...students, studentID])
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

    return (
        <div className='coursDynamique'>
            <Header title={course.title} />
            <h1>{course.title}</h1>
            <p>Type: {course.type}</p>
            <p>Start Date: {new Date(course.startDate).toDateString()}</p>
            <p>Start Time: {course.startTime}</p>
            <p>Location: {course.location}</p>
            <p>Duration: {course.duration} minutes</p>
            <p>Teachers: {course.teacher}</p>
            <Button 
                variant="contained" 
                color={isFull ? "secondary" : "primary"} 
                onClick={handleReservation} 
                disabled={isFull}
            >
                {isFull ? "Cours plein" : "Réserver"}
            </Button>
            {reservationMessage && <Alert severity="info">{reservationMessage}</Alert>}
            {/* Render course details based on the fetched data */}
        </div>
    );
};

export default CoursDynamique;
