import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './resourcedetails.css'; 
import Sidebar from './sidebar';

const ResourceDetails = () => {
    const { type } = useParams();
    const [resources, setResources] = useState([]);

    useEffect(() => {
        const fetchResourcesByType = async () => {
            const response = await axios.get('http://localhost:5000/resources');
            setResources(response.data.filter(resource => resource.type_name === type));
        };
        fetchResourcesByType();
    }, [type]);

    const handleBook = async (resourceId) => {
        const userId = 1; // Replace with actual logged-in user ID
        await axios.post('http://localhost:5000/book_resource', { resource_id: resourceId, user_id: userId });
        // Optionally refresh the list of resources or show a success message
    };

    return (
        <div>
            <Sidebar/>
            <h1>{type} Resources</h1>
            <table className="resource-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Available From</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {resources.map(resource => (
                        <tr key={resource.id}>
                            <td>{resource.name}</td>
                            <td>{resource.description}</td>
                            <td>{resource.available_from}</td>
                            <td>
                                <button onClick={() => handleBook(resource.id)}>Book for Me</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResourceDetails;
