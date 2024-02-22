// NavItem.js
import React from "react";
import { Link } from "react-router-dom";

function NavItem({ icon, link, label, onClick }) {
    return (
        <li className="nav-item">
            <button onClick={onClick}>
                <span className="material-symbols-outlined">{icon}</span>
                <Link to={link}>{label}</Link>
            </button>
        </li>
    );
}

export default NavItem;