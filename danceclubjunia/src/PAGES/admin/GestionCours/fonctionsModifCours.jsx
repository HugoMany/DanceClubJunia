import { URL_DB } from '../../../const/const';
import React, { useState } from 'react';


const FetchCourses = async (courseId) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const [formData, setFormData] = useState({});
    try {
    const token = localStorage.getItem('token');
    if (!token) return { valid: false };
    
    const response = await fetch(`${URL_DB}guest/getAllCourses`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        });
        console.log(response);
        if (response.ok) {
         const data = await response.json();
         console.log(data)
         const filteredCourse = data.courses.find(course => course.courseID ===  parseInt(courseId, 10));
         setCourseData(filteredCourse);
         setFormData(filteredCourse);
         console.log(filteredCourse)
        } else {
            throw new Error('Error fetching courses 101');
        }
    } catch (error) {
        console.error('Error fetching courses:', error);
        setError(error);
    } finally {
        setLoading(false);
    }
};