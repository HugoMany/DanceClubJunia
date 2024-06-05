import React, { useState, useEffect } from 'react';
import Header from '../../../elements/header';
import URL_DB from '../../../const/const';



const ModifCours = ({ courseId }) => {
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
    const [paymentOptions, setPaymentOptions] = useState('');
    const [isEvening, setIsEvening] = useState(false);
    const [recurrence, setRecurrence] = useState('');
    const [teachers, setTeachers] = useState('');
    const [links, setLinks] = useState('');
    const [students, setStudents] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
        if (courseId) {
            // Fetch existing course data
            fetch(URL_DB+`/${courseId}`)
                .then(response => response.json())
                .then(data => {
                    setImage(data.image);
                    setTitle(data.title);
                    setType(data.type);
                    setDuration(data.duration);
                    setStartDate(data.startDate);
                    setStartTime(data.startTime);
                    setLocation(data.location);
                    setMaxParticipants(data.maxParticipants);
                    setPaymentType(data.paymentType);
                    setPrice(data.price);
                    setPaymentOptions(data.paymentOptions.join(','));
                    setIsEvening(data.isEvening);
                    setRecurrence(data.recurrence);
                    setTeachers(JSON.stringify(data.teachers));
                    setLinks(JSON.stringify(data.links));
                    setStudents(JSON.stringify(data.students));
                    setTags(data.tags.join(','));
                })
                .catch(error => console.error('Error fetching course data:', error));
        }
    }, [courseId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const json = {
            courseId,
            image,
            title,
            type,
            duration,
            startDate,
            startTime,
            location,
            maxParticipants,
            paymentType,
            price,
            paymentOptions: paymentOptions.split(','),
            isEvening,
            recurrence,
            teachers: JSON.parse(teachers || '[]'),
            links: JSON.parse(links || '[]'),
            students: JSON.parse(students || '[]'),
            tags: tags.split(',')
        };

        console.log('Form Data:', json);

        fetch(`http://example.com/api/courses${courseId ? `/${courseId}` : ''}`, {
            method: courseId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Header></Header>
            <label htmlFor="courseId">Course ID:</label>
            <input type="text" id="courseId" value={courseId} readOnly />

            <label htmlFor="image">Image:</label>
            <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} />

            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label htmlFor="type">Type:</label>
            <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} />

            <label htmlFor="duration">Duration:</label>
            <input type="text" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />

            <label htmlFor="startDate">Start Date:</label>
            <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

            <label htmlFor="startTime">Start Time:</label>
            <input type="time" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

            <label htmlFor="location">Location:</label>
            <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />

            <label htmlFor="maxParticipants">Max Participants:</label>
            <input type="number" id="maxParticipants" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} />

            <label htmlFor="paymentType">Payment Type:</label>
            <input type="text" id="paymentType" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} />

            <label htmlFor="price">Price:</label>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />

            <label htmlFor="paymentOptions">Payment Options (comma separated):</label>
            <input type="text" id="paymentOptions" value={paymentOptions} onChange={(e) => setPaymentOptions(e.target.value)} />

            <label htmlFor="isEvening">Is Evening:</label>
            <input type="checkbox" id="isEvening" checked={isEvening} onChange={(e) => setIsEvening(e.target.checked)} />

            <label htmlFor="recurrence">Recurrence:</label>
            <input type="text" id="recurrence" value={recurrence} onChange={(e) => setRecurrence(e.target.value)} />

            <label htmlFor="teachers">Teachers (JSON format):</label>
            <textarea id="teachers" value={teachers} onChange={(e) => setTeachers(e.target.value)}></textarea>

            <label htmlFor="links">Links (JSON format):</label>
            <textarea id="links" value={links} onChange={(e) => setLinks(e.target.value)}></textarea>

            <label htmlFor="students">Students (JSON format):</label>
            <textarea id="students" value={students} onChange={(e) => setStudents(e.target.value)}></textarea>

            <label htmlFor="tags">Tags (comma separated):</label>
            <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />

            <button type="submit">Submit</button>
        </form>
    );
};




export default ModifCours;
