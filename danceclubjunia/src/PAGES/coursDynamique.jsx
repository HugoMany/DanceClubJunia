import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../elements/header';

const CoursDynamique = () => {
  const { courseId,idPerson } = useParams();

  const axios = require('axios');
  const data = {
    courseId: '123' // Remplacez '123' par l'ID du cours que vous voulez récupérer
  };
  
//   axios.post('API/cours/info/', data)
//     .then(response => {
//       console.log(response.data);
//     })
//     .catch(error => {
//       console.error(error);
//     });
  // Fetch course data based on courseId or use it directly in the component

  return (
    <div>
      <Header></Header>
      <h1>Dynamic Course Page</h1>
      <p>Course ID: {courseId}</p>
      <p>Person ID: {idPerson}</p>
      {/* Render course details based on the fetched data */}
    </div>
  );
};

export default CoursDynamique;
