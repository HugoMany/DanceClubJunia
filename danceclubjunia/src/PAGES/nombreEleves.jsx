import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../elements/header';
import { URL_DB } from '../const/const';

const NombreEleve = () => {
    const userID = "1";
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [studentCount, setStudentCount] = useState(0);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return { valid: false };

                const response = await fetch(`${URL_DB}guest/getAllCourses`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const filteredCourses = data.courses.filter(course => {
                        const teachers = JSON.parse(course.teachersID);
                        const isPastCourse = new Date(course.startDate) < new Date();
                        return teachers.includes(parseInt(userID)) && isPastCourse;
                    });

                    const uniqueStudents = new Set();
                    filteredCourses.forEach(course => {
                        const students = JSON.parse(course.studentsID);
                        students.forEach(student => uniqueStudents.add(student));
                    });

                    setCourse(filteredCourses);
                    setStudentCount(uniqueStudents.size);
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
    }, [courseId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading courses: {error.message}</div>;
    if (!course || course.length === 0) return <div>Aucun cours trouvé</div>;

    return (
        <div>
            <Header />
            <p>Nombre d'élèves ayant participé aux cours: {studentCount}</p>
            {/* You can also list the filtered courses here if needed */}
        </div>
    );
};

export default NombreEleve;
