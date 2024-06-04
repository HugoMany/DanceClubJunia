import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../elements/header';

const CoursDynamique = () => {
  const { courseId,idPerson } = useParams();

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
      <Header></Header>
      <h1>Dynamic Course Page</h1>
      <p>Course ID: {courseId}</p>
      <p>Type de danse: {data.type}</p>
      <p>Person ID: {idPerson}</p>
      {/* Render course details based on the fetched data */}
    </div>
  );
};

export default CoursDynamique;
