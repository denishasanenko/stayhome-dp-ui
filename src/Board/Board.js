import React from 'react';
import { Link } from 'react-router-dom';

function Board() {
    return (
        <div className="Board">
            <header className="Board-header">
                <p>
                    Board page
                </p>
                <Link to="/list">Go to boards list</Link>
            </header>
        </div>
    );
}

export default Board;
