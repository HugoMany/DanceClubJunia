import logo from "../img/logo.jpg"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuDeroulant from "./menuDeroulant";
import { IS_ADMIN, IS_CONNECT } from "../const/const";
function Header({ title }) {


    return (
        <div>
            <a href="/" className="noTagLink"><img src={logo} className="LogoTemp" alt="Logo" />
            <div class="header">
                <h1>Dance Club</h1>
            </div></a>
            
            <div class="footer">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                <div><a href='/'><button ><span class="material-symbols-outlined">
                    home
                </span></button></a></div>

                <h1>{title}</h1>
                <br/>       
                <MenuDeroulant></MenuDeroulant>

                
            </div>
            <div id="Credit"><a href='/'><span class="material-symbols-outlined">
                confirmation_number
                </span>5</a></div>
        </div>
    );
}

export default Header;