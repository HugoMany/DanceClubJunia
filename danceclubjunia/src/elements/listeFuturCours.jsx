import React from 'react';
import CoursesList from '../PAGES/listCourse';

function ListeFuturCours() {
  return (
    <div>
    <h2>Les prochain Cours:</h2>

    <div className='listFuturCours'>
        <CoursesList></CoursesList>
    </div>
    </div>
  );
}

export default ListeFuturCours;
