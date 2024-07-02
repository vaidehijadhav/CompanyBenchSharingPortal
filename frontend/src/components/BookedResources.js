import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './bookedResources.css'; 
import Sidebar from './sidebar';

const BookedResources = () => {
    const [bookedResources, setBookedResources] = useState([]);

    useEffect(() => {
        const fetchBookedResources = async () => {
            const userId = 1; // Replace with actual user ID
            const response = await axios.get(`http://localhost:5000/booked_resources?user_id=${userId}`);
            setBookedResources(response.data);
        };
        fetchBookedResources();
    }, []);

    const handleRelease = async (resourceId) => {
        await axios.post('http://localhost:5000/release_resource', { resource_id: resourceId });
        const userId = 1; // Replace with actual user ID
        const response = await axios.get(`http://localhost:5000/booked_resources?user_id=${userId}`);
        setBookedResources(response.data);
    };

    return (
        <div>
            <Sidebar/>
            <h1>Booked Resources</h1>
            <ul className="booked-resource-list">
                {bookedResources.map((resource) => (
                    <li key={resource.id} className="booked-resource-item">
                        {resource.name} - {resource.description}
                        <button onClick={() => handleRelease(resource.id)}>Release Resource</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookedResources;
