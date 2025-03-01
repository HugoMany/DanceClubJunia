import React, { useState, useEffect } from 'react';
import GetStudentID from '../getStudentID';
const URL = 'http://90.110.227.143/'

const PlanningProf = ({ teacherId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [studentId, setStudentId] = useState('');
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {const token = localStorage.getItem('token');
            if (!token) return { valid: false };
            
            const response = await fetch(`${URL}api/user/searchCoursesTeacher?userID=${teacherId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                });

                if (response.ok) {
                    const data = await response.json();
                    const now = new Date();
                    const upcomingCourses = data.filter(course => new Date(course.startDate) > now);
                    const sortedCourses = upcomingCourses.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
                    setCourses(sortedCourses);
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
    }, [teacherId]);

    const handleDelete = async (courseId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };
            
            const response = await fetch(`${URL}api/teacher/cancelCourse`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                  teacherID: teacherId, // Utilisation de userID ici
                  courseID: courseId
                })
            });

            if (response.ok) {
                setCourses(courses.filter(course => course.courseId !== courseId));
            } else {
                throw new Error('Error deleting course');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            setError(error);
        }
    };

    const handleAddStudent = async (courseId, studentId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };
            
            const response = await fetch(`${URL}api/teacher/addStudentToCourse`, {
                method: 'PATCH', // Utilisation de la méthode PATCH
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    teacherID: teacherId,
                    courseID: courseId,
                    studentID: studentId
                })
            });
    
            if (response.ok) {
                const updatedCourse = await response.json();
                setCourses(courses.map(course =>
                    course.courseId === courseId ?
                        { ...course, students: updatedCourse.students } :
                        course
                ));
            } else {
                throw new Error('Error adding student');
            }
        } catch (error) {
            console.error('Error adding student:', error);
            setError(error);
        }
    };

    const handleRemoveStudent = async (courseId, studentId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };
            
            const response = await fetch(`${URL}api/teacher/addStudentToCourse`, {
                method: 'PATCH', // Utilisation de la méthode PATCH
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    courseID: courseId,
                    studentID: studentId
                })
            });

            if (response.ok) {
                const updatedCourse = await response.json();
                setCourses(courses.map(course =>
                    course.courseId === courseId ?
                        { ...course, students: updatedCourse.students } :
                        course
                ));
            } else {
                throw new Error('Error removing student');
            }
        } catch (error) {
            console.error('Error removing student:', error);
            setError(error);
        }
    };
    const handleAddTag = async (courseId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };
            const response = await fetch(`${URL}api/teacher/modifyCourse`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    courseID:courseId,
                   // Utilisation de userID ici
                  tag: newTag,
                })
              });
            
              
            if (response.ok) {
                const updatedCourse = await response.json();
                setCourses(courses.map(course =>
                    course.courseId === courseId ?
                        { ...course, tags: updatedCourse.tags } :
                        course
                ));
                setNewTag('');
            } else {
                throw new Error('Error adding tag');
            }
        } catch (error) {
            console.error('Error adding tag:', error);
            setError(error);
        }
    };
     
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading courses: {error.message}</div>;
    return (
        <div>
            <h2>Vos prochains cours</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.courseId}>
                        <h3>{course.title}</h3>
                        {/* Autres détails du cours */}
                        <div>
                            <GetStudentID setUserID={setStudentId} /> {/* Utilisez setStudentId au lieu de StudentId */}
                            <button onClick={() => handleAddStudent(course.courseId, studentId)}>Ajouter un étudiant</button> {/* Utilisez studentId au lieu de student */}
                        </div>
                        <ul>
                            {course.students.map(student => (
                                <li key={student}>
                                    {student}
                                    <button onClick={() => handleRemoveStudent(course.courseId, student)}>Retirer</button>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <input
                                type="text"
                                placeholder="New Tag"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                            />
                            <button onClick={() => handleAddTag(course.courseId)}>ajouter un Tag</button>
                        </div>
                        <div>
                            <button onClick={()=> handleDelete}>Supprimer le cours</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};



export default PlanningProf;