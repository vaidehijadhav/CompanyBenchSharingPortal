// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; 

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Menu</h2>
            <ul>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>
                <li>
                    <Link to="/resources/:type">Resource Details</Link>
                </li>
                <li>
                    <Link to="/booked_resources">Booked Resources</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
