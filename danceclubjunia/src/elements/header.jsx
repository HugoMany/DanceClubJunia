import danceImage from '../img/dance.png';

function Header() {
    const isAdmin = false;
    const isConnect = true ;


    return (
        <div class="header">
            <a href='/' style={{ textDecoration: 'none', color: 'white' }}> <h1>Dance <br></br>Club </h1></a>
<br/>       
        {isAdmin ? (
                <>
                {/* <h4>isAdmin</h4> */}
                                <a href='/admin/' ><button class="styled-button">A</button></a>
                </>

            ) : (<>
            {/* <h4>isNotAdmin</h4> */}
                </>
            )}
            {isConnect ? (
                <>
                {/* <h4>isConnect</h4> */}
                <a href='/profil/'><button>P</button></a>
                </>

            ) : (<>
            {/* <h4>isNotConnect</h4> */}
                <a href='/connexion/'><button>C</button></a>
                </>
            )}
<br/><br/>

 

        </div>
    );

}

export default Header;