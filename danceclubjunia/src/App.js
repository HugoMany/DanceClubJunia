import logo from './logo.svg';
import './App.css';
import Rgpd from './PAGES/rgpd'
import Inscription from './PAGES/inscription';
//import Connexion from '.PAGES/connexion.jsx';
import Profil from './PAGES/profil';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Inscription />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/rgpd" element={<Rgpd />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
