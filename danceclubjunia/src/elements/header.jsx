import danceImage from '../img/dance.png';

function Header() {
    const isAdmin = true;
    const isConnect = true  ;
    const styleHeader = {
        display: 'flex',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#FDD93B',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        alignItems: 'center',
        };
    return (
        <div class="header" style={styleHeader}>
            <a href='/'><img style={{ width: '150px' }} src={danceImage} alt="Dance" /></a>
<br/>       
        {isAdmin ? (
                <>
                {/* <h4>isAdmin</h4> */}
                                <a href='/admin/' ><button class="styled-button">Admin</button></a>
                </>

            ) : (<>
            {/* <h4>isNotAdmin</h4> */}
                </>
            )}
            {isConnect ? (
                <>
                {/* <h4>isConnect</h4> */}
                <a href='/profil/'><button>Profil</button></a>
                </>

            ) : (<>
            {/* <h4>isNotConnect</h4> */}
                <a href='/connexion/'><button>Connexion</button></a>
                <a href='/inscription/'><button>Inscription</button></a>
                </>
            )}
<br/><br/>

 

        </div>
    );

}

export default Header;