import React from "react";
import "./404.css";

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">Pagina niet gevonden!</p>
            <a href="/" className="not-found-link">Terug naar Home</a>
        </div>
    );
};

export default NotFound;