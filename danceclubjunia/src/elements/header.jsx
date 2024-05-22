
function Header() {
    const isConnect = false  ;
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
        <div style={styleHeader}>
            <h1>Dance Club</h1>
<br/>       
            {isConnect ? (
                <><h4>isConnect</h4>
                <a href='/profil/'><button>Profil</button></a>
                </>

            ) : (<><h4>isNotConnect</h4>
                <a href='/connexion/'><button>Connexion</button></a>
                <a href='/inscription/'><button>Inscription</button></a>
                </>
            )}
<br/><br/>

 

        </div>
    );

}

export default Header;