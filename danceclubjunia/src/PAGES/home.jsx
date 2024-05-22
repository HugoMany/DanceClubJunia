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
        


        <a href='/rgpd/'>RGPD</a>

        </div>
    );

}

export default Home;