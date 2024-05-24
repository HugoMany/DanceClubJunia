import '../font/Hagrid-Text-Extrabold-trial.ttf'; // Import the font file
import React from 'react';
import Header from '../elements/header';
import '../css/home.css';

function Home (){
    const h1Style = {
        fontFamily: 'Hagrid-Text-Extrabold-trial', // Use the font family name
    };
    const handleAcheterClick = () => {
        window.open('/gerer-achat', '_blank', 'width=500,height=500');
    };
    return(
        <div>
               <Header ></Header>
           
        <br/>
        
        <>Dance Club -----------------</><br></br>

       
            <h2>Choisissez votre cours</h2>

        <div>
           
            <div>
                        <div className="cours">
                            <h3>Rock</h3>
                            <p>Le rock est une danse très populaire en France. Elle se danse en couple et est très simple à apprendre.</p>
                            <img src="" alt="" srcSet="" />
                            <button onClick={handleAcheterClick}>Acheter</button>
                        </div>
                    </div>
            <div class="cours">
                <h3>Classique</h3>
                <p>La danse classique est une danse très technique qui demande beaucoup de rigueur.</p>
                <img src="" alt="" srcset="" />
                <button>Acheter</button>
            </div>
            <div class="cours">
                <h3>Contemporain</h3>
                <p>La danse contemporaine est une danse très libre qui permet de s'exprimer.</p>
                <img src="" alt="" srcset="" />
                <button>Acheter</button>
            </div>
        </div>




        <a href='/rgpd/'>RGPD</a><br></br>
        <a href='/connexion/'>Connexion</a><br></br>
        <a href='/profil/'>Profil</a><br></br>
        <a href='/inscription/'>Créer un compte</a>

        
        </div>
    );

}

export default Home;