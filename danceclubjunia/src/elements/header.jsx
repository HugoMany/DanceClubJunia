import danceImage from '../img/dance.png';

function Header() {
    const isAdmin = false;
    const isConnect = true ;


    return (
        <div class="header">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <a href='/'><button><span class="material-symbols-outlined">
            home
            </span></button></a>

          <h1>Dance Club </h1>
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
                <a href='/profil/'><button><span class="material-symbols-outlined">
person
</span></button></a>
                </>

            ) : (<>
            {/* <h4>isNotConnect</h4> */}
                <a href='/connexion/'><button><span class="material-symbols-outlined">
login
</span></button></a>
                </>
            )}
<br/><br/>

 

        </div>
    );

}

export default Header;