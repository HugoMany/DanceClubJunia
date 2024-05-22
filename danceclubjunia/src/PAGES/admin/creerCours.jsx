import React, { useState } from 'react';

function CreerCours() {
    const [courseId, setCourseId] = useState('');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [location, setLocation] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [price, setPrice] = useState('');
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [isEvening, setIsEvening] = useState(false);
    const [recurrence, setRecurrence] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [links, setLinks] = useState([]);
    const [students, setStudents] = useState([]);
    const [tags, setTags] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const json = {          
                "courseId": "course123",
                "image": "course_image.png",
                "title": "Introduction to Programming",
                "type": "Workshop",
                "duration": "2 hours",
                "startDate": "2024-06-01",
                "startTime": "10:00 AM",
                "location": "Room 101, Tech Building",
                "maxParticipants": 30,
                "paymentType": "Online",
                "price": 100,
                "paymentOptions": ["Credit Card", "PayPal"],
                "isEvening": false,
                "recurrence": null,
                "teachers": [
                    {
                        "teacherId": "teacher123",
                        "name": "John Smith",
                        "email": "john.smith@example.com",
                        "photo": "john_smith.png"
                    }
                ],
                "links": [
                    {
                        "description": "Course Materials",
                        "url": "http://example.com/materials"
                    },
                    {
                        "description": "Lecture Slides",
                        "url": "http://example.com/slides"
                    }
                ],
                "students": [
                    {
                        "studentId": "student123",
                        "name": "Jane Doe",
                        "email": "jane.doe@example.com"
                    },
                    {
                        "studentId": "student124",
                        "name": "Alice Johnson",
                        "email": "alice.johnson@example.com"
                    }
                ],
                "tags": ["Programming", "Beginner", "Workshop"]            
        }
        
        // Ajoutez ici la logique pour enregistrer les données du cours
    };

    return (
        <form>
            <label htmlFor="courseId">Course ID:</label>
            <input type="text" id="courseId" value={courseId} onChange={(e) => setCourseId(e.target.value)} />

            <label htmlFor="image">Image:</label>
            <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} />

            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label htmlFor="type">Type:</label>
            <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} />

            <label htmlFor="duration">Duration:</label>
            <input type="text" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />

            <label htmlFor="startDate">Start Date:</label>
            <input type="text" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

            <label htmlFor="startTime">Start Time:</label>
            <input type="text" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

            <label htmlFor="location">Location:</label>
            <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />

            <label htmlFor="maxParticipants">Max Participants:</label>
            <input type="text" id="maxParticipants" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} />

            <label htmlFor="paymentType">Payment Type:</label>
            <input type="text" id="paymentType" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} />

            <label htmlFor="price">Price:</label>
            <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />

            <label htmlFor="paymentOptions">Payment Options:</label>
            <input type="text" id="paymentOptions" value={paymentOptions} onChange={(e) => setPaymentOptions(e.target.value)} />

            <label htmlFor="isEvening">Is Evening:</label>
            <input type="checkbox" id="isEvening" checked={isEvening} onChange={(e) => setIsEvening(e.target.checked)} />

            {/* Add more input fields for the remaining variables */}

            <button type="submit">Submit</button>
        </form>
    );
}

export default CreerCours;