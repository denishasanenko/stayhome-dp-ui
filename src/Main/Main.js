import React from 'react';
import {Link} from "react-router-dom";

function Main() {
    return (
        <div className="Main">
            <header className="Main-header">
                <p>
                    Main page
                </p>
                <Link to="/board">Go to board</Link>
            </header>
        </div>
    );
}

export default Main;
