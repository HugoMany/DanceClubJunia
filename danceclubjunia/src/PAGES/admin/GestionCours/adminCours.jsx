import React from 'react';
import Header from '../../../elements/header';
import ModifCours from './modifCours';

const AdminCours = () => {
  return (
    <div>
        <Header title="Admin Cours"></Header>
      <h1>Admin Cours</h1>
      <ModifCours idCours={3}></ModifCours>
    </div>
  );
};

export default AdminCours;
