import '../font/Hagrid-Text-Extrabold-trial.ttf'; // Import the font file
import React from 'react';
import Header from '../elements/header';

function Home (){
    const h1Style = {
        fontFamily: 'Hagrid-Text-Extrabold-trial', // Use the font family name
    };
    return(
        <div>
               <Header ></Header>
           
        <br/>
        

        <a href='/rgpd/'>RGPD</a><br></br>
        <a href='/connexion/'>Connexion</a><br></br>
            <a href='/profil/'>Profil</a><br></br>
            <a href='/inscription/'>Créer un compte</a>


        <h1 style={h1Style}>Bienvenue sur le site de la dance</h1>
        
        </div>
    );

}

export default Home;