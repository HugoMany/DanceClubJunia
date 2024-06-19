import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../elements/header';
import {URL_DB} from '../const/const';
import Loading from '../elements/loading';
import ConnexionRequire from '../elements/requireConnexion';

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
    // ConnexionRequire()

    
    if (course === null) return <div>No course found</div>;

    if (loading) return <Loading></Loading>;

else{
        return (
    
    <div className='coursDynamique'>
      <Header title={course.title}></Header>
      <h1>{course.title}</h1>
      <p>Type: {course.type}</p>
      <p>Start Date: {new Date(course.startDate).toDateString()}</p>
      <p>Start Time: {course.startTime}</p>
      <p>Location: {course.location}</p>
      <p>Duration: {course.duration} minutes</p>
      <p>Teachers: {course.teacher}</p>
      {/* Render course details based on the fetched data */}
    </div>
  );
};
}

export default CoursDynamique;
