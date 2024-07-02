import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from  './sidebar';
import './companyDashboard.css'; 

const CompanyDashboard = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const fetchResources = async () => {
            const response = await axios.get('http://localhost:5000/resources');
            setResources(response.data);
        };
        fetchResources();
    }, []);

    const groupedResources = resources.reduce((acc, resource) => {
        const type = resource.type_name;
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(resource);
        return acc;
    }, {});

    return (
        <div className="company-dashboard">
            <Sidebar />
            <div className="main-content">
                <h1>Company Dashboard</h1>
                <div className="resource-cards">
                    {Object.keys(groupedResources).map((type) => (
                        <Link to={`/resources/${type}`} key={type} className="resource-card">
                            <div>
                                <h2>{type}</h2>
                                <p>{groupedResources[type].length}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompanyDashboard;
