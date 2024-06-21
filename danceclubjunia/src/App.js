import logo from './img/logo.jpg';
import './App.css';
import Rgpd from './PAGES/rgpd'
import Inscription from './PAGES/inscription';
import Connexion from './PAGES/connexion';
import Profil from './PAGES/profil';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './PAGES/home';
import "./css/prof.css"

import AdminProf from './PAGES/admin/GestionProf/adminProf';
import AdminCours from './PAGES/admin/GestionCours/adminCours';
import AdminEleve from './PAGES/admin/GestionEleve/adminEleve';

import { Helmet } from 'react-helmet';

import Admin from './PAGES/admin/admin';
import CoursDynamique from './PAGES/coursDynamique';
import PlanningProf from './PAGES/prof/planningProf';
import PlanningEleve from './PAGES/planningEleve';
import CoursesList from './PAGES/listCourse';
import ConnexionEtInscriptionSlider from './elements/connexionEtInscriptionSlider';

import Recherche from './PAGES/recherche';
import Results from './PAGES/results.jsx';

import ReservationPage from './PAGES/reservationPage';
import CreerEleve from './PAGES/admin/GestionEleve/creerEleve'
import Loading from './elements/loading';

import ModifCours from './PAGES/admin/GestionCours/modifCours';
import GetStudentID from './PAGES/getStudentID';
import AjoutCredits from './PAGES/ajoutCredits';
import Prof from './PAGES/prof/prof';
import Appel from './PAGES/prof/appel';
import CreerProf from './PAGES/admin/GestionProf/creerProf';
import CreditEleve from './PAGES/admin/GestionEleve/creditEleve';
import ErreurNotAccess from './PAGES/erreurNotAccess';
import Logout from './elements/logout';

import SupprimerCours from './PAGES/admin/GestionCours/suppirmerCours';
import ModifProf from './PAGES/admin/GestionProf/modifProf';
import ModifEleve from './PAGES/admin/GestionEleve/modifEleve';
import SupprimerEleve from './PAGES/admin/GestionEleve/supprimerEleve';
import SupprimerProf from './PAGES/admin/GestionProf/supprimerProf';

import InfoStudent from './PAGES/prof/infoStudent';
import InfoStudentCourse from './PAGES/prof/infoStudentCourse';
import InfoStudentForProf from './PAGES/prof/infoStudentForProf';
import AddTagToACours from './PAGES/prof/addTagToACours';
import Compta from './PAGES/admin/Compta/compta';
import InfoModerneDance from './PAGES/blog/infoModerneDance';
import InfoRockDance from './PAGES/blog/infoRockDance';

import Boutique from './PAGES/boutique';

import CreateCardPage from './PAGES/admin/GestionAbo/createCardPage.jsx';

import AllContacts from './PAGES/prof/allContacts';
import InfoClassiqueDance from './PAGES/blog/infoClassiqueDance';
import MdpForget from './PAGES/mdpForget.jsx';
import MdpRecovery from './PAGES/mdpRecovery.jsx';
import CoursDynamiqueProf from './PAGES/prof/coursDynamiqueProf.jsx';

import Revenu from './PAGES/admin/Compta/revenu.jsx';

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
          <Route path="/admin/abo" element={<CreateCardPage />} />


          <Route path="/admin/cours/modifCours/:idParam" element={<ModifCours />} />
          <Route path="/admin/cours/supp/:idParam" element={<SupprimerCours />} />

          <Route path="/admin/teacher/modif/:idParam" element={<ModifProf />} />
          <Route path="/admin/teacher/supp/:idParam" element={< SupprimerProf/>} />


          <Route path="/admin/student/modif/:idParam" element={<ModifEleve />} />
          <Route path="/admin/student/supp/:idParam" element={<SupprimerEleve />} />


          <Route path="/admin/eleve" element={<AdminEleve />} />

          <Route path="/admin/" element={<Admin />} />
          <Route path="/cours/:courseId" element={<CoursDynamique />} />

          <Route path='addTagToACours' element={<AddTagToACours/>}/>

          <Route path="/admin/compta" element={<Compta/>}/>

          <Route path="/recherche" element={<Recherche />} />
          <Route path="/results" element={<Results />} />

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
          <Route path="/prof/allContact" element={<AllContacts/>} />
          <Route path="/prof/cours/:idCours" element={<CoursDynamiqueProf/>} />


          <Route path="/appel" element={<Appel/>}/>
          <Route path="/creerProf" element={<CreerProf/>}/>
          <Route path="/creditEleve" element={<CreditEleve/>}/>
          <Route path="/infoStudent" element={<InfoStudent/>}/>
          <Route path="/infoStudentCourse" element={<InfoStudentCourse/>}/>
          <Route path="/infoStudentForProf" element={<InfoStudentForProf/>}/>

          <Route path="/blog/moderne" element={<InfoModerneDance/>}/>
          <Route path="/blog/rock" element={<InfoRockDance/>}/>
          <Route path="/blog/classique" element={<InfoClassiqueDance/>}/>
          <Route path="/connexion/forget" element={<MdpForget/>}/>
          <Route path="/reset-password/token/:token" element={<MdpRecovery/>}/>



          <Route path="/boutique" element={<Boutique/>}/>
          <Route path="/admin/revenu" element={<Revenu/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
