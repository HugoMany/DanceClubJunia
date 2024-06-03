import logo from "../img/logo.jpg"
function Header({ title }) {
    const isAdmin = true;
    const isConnect = false ;

    return (
        <div>
            <img src={logo} className="LogoTemp" alt="Logo" />
            <div class="header">
                <h1>Dance Club</h1>
            </div>
            {isAdmin ? (
                    <>
                        {/* <h4>isAdmin</h4> */}
                        <div className="AdminButton"><a href='/admin/' ><button class="styled-button">Admin</button></a></div>
                    </>

                ) : (
                    <>
                        {/* <h4>isNotAdmin</h4> */}
                    </>
                )}
            <div class="footer">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                <div><a href='/'><button><span class="material-symbols-outlined">
                    home
                </span></button></a></div>

                <h1>{title}</h1>
                <br/>       
                
                {isConnect ? (
                    <>
                        {/* <h4>isConnect</h4> */}
                        <div>
                            <a href='/profil/'><button><span class="material-symbols-outlined">
                                person
                            </span></button></a>
                        </div>
                    </>

                ) : (
                    <>
                        {/* <h4>isNotConnect</h4> */}
                        <div>
                            <a href='/connexion/'><button><span class="material-symbols-outlined">
                                login
                            </span></button></a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;