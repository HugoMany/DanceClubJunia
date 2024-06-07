import React, { useState, useEffect } from 'react';

// React component
const PlanningProf = ({ teacherId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newStudentId, setNewStudentId] = useState('');
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`http://example.com/api/courses/${teacherId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
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
            const response = await fetch(`http://example.com/api/courses/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
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

    const handleAddStudent = async (courseId) => {
        try {
            const response = await fetch(`http://example.com/api/courses/${courseId}/students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ studentId: newStudentId })
            });

            if (response.ok) {
                const updatedCourse = await response.json();
                setCourses(courses.map(course =>
                    course.courseId === courseId ?
                        { ...course, students: updatedCourse.students } :
                        course
                ));
                setNewStudentId('');
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
            const response = await fetch(`http://example.com/api/courses/${courseId}/students/${studentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
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
            const response = await fetch(`http://example.com/api/courses/${courseId}/tags`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tag: newTag })
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
            <h2>Your Upcoming Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.courseId}>
                        <h3>{course.title}</h3>
                        {/* Autres détails du cours */}
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
                        <div>
                            <input
                                type="text"
                                placeholder="New Tag"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                            />
                            <button onClick={() => handleAddTag(course.courseId)}>Add Tag</button>
                        </div>
                        <div>
                            <button onClick={()=> handleDelete}>Delete Course</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};



export default PlanningProf;