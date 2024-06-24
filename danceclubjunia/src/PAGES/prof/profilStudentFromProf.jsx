import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import isTeacher from '../../elements/isTeacher';
import { URL_DB } from '../../const/const';
import Header from '../../elements/header';
import { Button } from '@mui/material';
import "../../css/studentProfilQR.css";

const ProfilStudentFromProf = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [nextCourseId, setNextCourseId] = useState(null);
  const [nextCourse, setNextCourse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const getNextCourseId = async () => {
    try {
        const response = await fetch(URL_DB + 'guest/getAllCourses');
        const data = await response.json();
  
        if (data.success) {
            const now = new Date();
            const upcomingCourses = data.courses.filter(course => new Date(course.startDate) > now);
  
            if (upcomingCourses.length > 0) {
                const nextCourse = upcomingCourses.reduce((prev, curr) => new Date(prev.startDate) < new Date(curr.startDate) ? prev : curr);
                console.log('Prochain cours:', nextCourse.courseID);
                setNextCourseId(nextCourse.courseID)
                setNextCourse(nextCourse);
                return nextCourse.courseID;
            } else {
                console.log('Il n\'y a pas de cours à venir.');
                return null;
            }
        } else {
            console.log('Erreur lors de la récupération des cours.');
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des cours:', error);
        return null;
    }
  }

  const displayCourseStart = (course) => {
    const startDate = new Date(course.startDate);
    const date = startDate.toLocaleDateString();
    const time = startDate.toLocaleTimeString();

    return `le cours qui commence le ${date} à ${time}`;
}
 
  const markAttendance = async () => {
    const studentID = id; // student ID from URL params
    const courseID = nextCourseId; // Replace with actual course ID

    fetch(URL_DB + 'teacher/markAttendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
            studentID,
            courseID,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Présence marquée avec succès');
        } else {
            setErrorMessage(data.message); // Set the error message in the state
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }

  useEffect(() => {
    getNextCourseId();
    const token = localStorage.getItem('token');
    if (!token) return { valid: false };
    if (!isTeacher()) {
      window.location.href = '/error';
    } else {
      fetch(URL_DB+`teacher/getStudent?studentID=${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        
    })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setStudent(data.student);
          } else {
            // Handle error here
          }
        });
        
    }
  }, [id]);


  return (
    <div>
        <Header></Header>
        <div className='studentProfilQR'>
        {student && (
        <div>
          <h1>{student.firstname} {student.surname}</h1>
          <p>Email: {student.email}</p>
          <p>Tickets: {student.tickets}</p>
          {/* <img src={student.photo} alt={`${student.firstname} ${student.surname}`} /><br></br> */}
          <Button variant="contained" color="primary" onClick={markAttendance}> Marquer la présence</Button >
          <h6>Pour le cours du {displayCourseStart(nextCourse)}</h6>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display the error message if it exists */}
        </div>
      )}
      </div>
    </div>
  );
};

export default ProfilStudentFromProf;