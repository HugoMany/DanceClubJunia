import React, { useEffect } from 'react';
import Header from './header';

function Logout() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        alert("Vous êtes déconnecté(e)");
        window.location.href = '/';
    };

    useEffect(() => {
        handleLogout();
    }, []);

    return (
        <div>
            <Header />
            <h1>Vous êtes déconnecté(e)</h1>
        </div>
    );
}

export default Logout;
