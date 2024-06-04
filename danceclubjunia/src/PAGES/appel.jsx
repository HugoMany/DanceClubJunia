import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../elements/header';

const Appel = () => {
    const { courseId} = useParams();

  const [data,setData] = useState([]);

    useEffect(() => {
        fetch( `http://example.com/api/courses/${courseId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },);

    return (
        <div>
            <Header />
            <h1>Students in Course {data.type}</h1>
            <ul>
                {data.student.map(student => (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Appel;
