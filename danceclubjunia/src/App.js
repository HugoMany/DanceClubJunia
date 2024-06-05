import logo from './img/logo.jpg';
import './App.css';
import Rgpd from './PAGES/rgpd'
import Inscription from './PAGES/inscription';
import Connexion from './PAGES/connexion';
import Profil from './PAGES/profil';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './PAGES/home';

import AdminProf from './PAGES/admin/GestionProf/adminProf';
import AdminCours from './PAGES/admin/GestionCours/adminCours';
import AdminEleve from './PAGES/admin/GestionEleve/adminEleve';

import { Helmet } from 'react-helmet';

import Admin from './PAGES/admin/admin';
import CoursDynamique from './PAGES/coursDynamique';
import PlanningProf from './PAGES/planningProf';
import PlanningEleve from './PAGES/planningEleve';
import CoursesList from './PAGES/listCourse';
import ConnexionEtInscriptionSlider from './PAGES/connexionEtInscriptionSlider';
import Recherche from './PAGES/recherche';

import CreerEleve from './PAGES/admin/GestionEleve/creerEleve'
import Loading from './elements/loading';
function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Dance Club</title>
        <link rel="icon" href={logo} />
      </Helmet>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/rgpd" element={<Rgpd />} />
          <Route path="/connexion/" element={<ConnexionEtInscriptionSlider />} />

          <Route path="/admin/prof" element={<AdminProf />} />
          <Route path="/admin/cours" element={<AdminCours />} />
          <Route path="/admin/eleve" element={<AdminEleve />} />

          <Route path="/admin/" element={<Admin />} />
          <Route path="/cours/:courseId/:idPerson" element={<CoursDynamique />} />

          <Route path="/recherche" element={<Recherche />} />
          <Route path="/planningProf" element={<PlanningProf/>} />
          <Route path="/planningEleve" element={<PlanningEleve/>}/>
          <Route path="/listCourse" element={<CoursesList/>}/>

          <Route path='/load' element={<Loading></Loading>}/>

          <Route path="/creerEleve" element={<CreerEleve/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
