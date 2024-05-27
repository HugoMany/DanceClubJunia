// Express server setup (assumed to be already set up)
import React, { useState, useEffect } from 'react';


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Course = require('./models/Course'); // Assume Course model is defined in models/Course

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/danceclub', { useNewUrlParser: true, useUnifiedTopology: true });

// Endpoint to get all courses
app.get('/api/courses', (req, res) => {
    Course.find()
        .then(courses => res.json(courses))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});



const AvailableCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all courses
        fetch('http://localhost:5000/api/courses')
            .then(response => response.json())
            .then(data => {
                // Sort courses by start date and time
                const sortedCourses = data.sort((a, b) => {
                    const dateA = new Date(a.startDate);
                    const dateB = new Date(b.startDate);
                    return dateA - dateB;
                });
                setCourses(sortedCourses);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading courses: {error.message}</div>;

    return (
        <div>
            <h2>Available Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course.courseId}>
                        <h3>{course.title}</h3>
                        <p>Type: {course.type}</p>
                        <p>Start Date: {new Date(course.startDate).toLocaleDateString()}</p>
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

export default AvailableCourses;
