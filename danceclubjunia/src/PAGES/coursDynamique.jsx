import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../elements/header';
import {URL_DB} from '../const/const';

const CoursDynamique = () => {
   const { courseId } = useParams();
   console.log(courseId+'courseId1');
   const [course, setCourse] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
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
                   const filteredCourse = data.courses.find(courses => courses.courseID === parseInt(courseId, 10));
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

       fetchCourses();
   },[courseId] );
        
    console.log(courseId+'ID cours');

    if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error loading courses: {error.message}</div>;
else{
        return (
    
    <div>
      <Header></Header>
      <p>Type: {course.type}</p>
      <p>Start Date: {new Date(course.startDate).toDateString()}</p>
      <p>Start Time: {course.startTime}</p>
      <p>Location: {course.location}</p>
      <p>Duration: {course.duration}</p>
      <p>Teachers: {course.teacher}</p>
      {/* Render course details based on the fetched data */}
    </div>
  );
};
}

export default CoursDynamique;
