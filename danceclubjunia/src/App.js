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
import ConnexionEtInscriptionSlider from './elements/connexionEtInscriptionSlider';
import Recherche from './PAGES/recherche';

import ReservationPage from './PAGES/reservationPage';
import CreerEleve from './PAGES/admin/GestionEleve/creerEleve'
import Loading from './elements/loading';

import ModifCours from './PAGES/admin/GestionCours/modifCours';
import GetStudentID from './PAGES/getStudentID';
import AjoutCredits from './PAGES/ajoutCredits';
import Prof from './PAGES/prof';
import Appel from './PAGES/appel';
import CreerProf from './PAGES/admin/GestionProf/creerProf';
import CreditEleve from './PAGES/admin/GestionEleve/creditEleve';
import ErreurNotAccess from './PAGES/erreurNotAccess';
import Logout from './elements/logout';
import SupprimerCours from './PAGES/admin/GestionCours/suppirmerCours';
import ModifProf from './PAGES/admin/GestionProf/modifProf';
import ModifEleve from './PAGES/admin/GestionEleve/modifEleve';
import SupprimerEleve from './PAGES/admin/GestionEleve/supprimerEleve';
import SupprimerProf from './PAGES/admin/GestionProf/supprimerProf';

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
          <Route path="/admin/cours" element={<AdminCours />} />

          <Route path="/admin/cours/modifCours/:courseId" element={<ModifCours />} />
          <Route path="/admin/cours/suppCours/:courseId" element={<SupprimerCours />} />

          <Route path="/admin/cours/modifProf/:profId" element={<ModifProf />} />
          <Route path="/admin/cours/suppProf/:prof" element={< SupprimerProf/>} />

          <Route path="/admin/cours/suppStudent/:studentId" element={<ModifEleve />} />
          <Route path="/admin/cours/suppStudent/:studentId" element={<SupprimerEleve />} />


          <Route path="/admin/eleve" element={<AdminEleve />} />

          <Route path="/admin/" element={<Admin />} />
          <Route path="/cours/:courseId" element={<CoursDynamique />} />

          <Route path="/recherche" element={<Recherche />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/planningProf" element={<PlanningProf/>} />
          <Route path="/planningEleve" element={<PlanningEleve/>}/>
          <Route path="/listCourse" element={<CoursesList/>}/>

          <Route path='/load' element={<Loading></Loading>}/>

          <Route path='logout' element={<Logout></Logout>}></Route>

          <Route path='/error' element={<ErreurNotAccess></ErreurNotAccess>}/>

          <Route path="/creerEleve" element={<CreerEleve/>}/>
          <Route path="/getStudentID" element={<GetStudentID/>}/>
          <Route path="/ajoutCredits" element={<AjoutCredits/>}/>
          <Route path="/prof" element={<Prof/>}/>

          <Route path="/appel" element={<Appel/>}/>
          <Route path="/creerProf" element={<CreerProf/>}/>
          <Route path="/creditEleve" element={<CreditEleve/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
