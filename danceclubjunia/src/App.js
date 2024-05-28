import logo from './logo.svg';
import './App.css';
import Rgpd from './PAGES/rgpd'
import Inscription from './PAGES/inscription';
import Connexion from './PAGES/connexion';
import Profil from './PAGES/profil';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './PAGES/home';
import CreerProf from './PAGES/admin/creerProf';
import CreerCours from './PAGES/admin/creerCours';
import Admin from './PAGES/admin/admin';
import CoursDynamique from './PAGES/coursDynamique';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/rgpd" element={<Rgpd />} />
          <Route path="/connexion/" element={<Connexion />} />
          <Route path="/admin/creerProf" element={<CreerProf />} />
          <Route path="/admin/creerCours" element={<CreerCours />} />
          <Route path="/admin/" element={<Admin />} />
          <Route path="/cours/:courseId/:idPerson" element={<CoursDynamique />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
