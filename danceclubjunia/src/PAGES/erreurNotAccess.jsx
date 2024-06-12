import React from 'react';
import Header from '../elements/header';

const ErreurNotAccess = () => {
  return (
    <div>
        <Header title={"Error"} ></Header>
        <h1>Erreur : Accès Refusé</h1>
        <p>Désolé, vous n'avez pas l'autorisation de voir cette page.</p>
    </div>
  );
};

export default ErreurNotAccess;
