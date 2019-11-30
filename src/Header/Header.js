import React from 'react';
import {useHistory} from "react-router-dom";
import jwt from "jsonwebtoken";


function Header() {
    let history = useHistory();

    let authorized = true;
    try {
        const token = localStorage.getItem('jwt');
        jwt.verify(token, 'secret')
    } catch (e) {
        authorized = false;
    }

    const logOut = (event) => {
        event.stopPropagation();
        localStorage.removeItem('jwt');
        history.push('/');
    }

    return (
        authorized ?
        <header>
            <div></div>
            <div>
                <img src="/logo.png" className="App-logo" alt="logo" />
            </div>
            <div>
                <p className="signOut" onClick={logOut}>Log out</p>
            </div>
        </header> : ''
    );

}

export default Header;
