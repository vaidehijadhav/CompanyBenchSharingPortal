import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminDashboard.css'; 

const AdminDashboard = () => {
    const [resourceTypes, setResourceTypes] = useState([]);
    const [newType, setNewType] = useState('');

    useEffect(() => {
        fetchResourceTypes();
    }, []);

    const fetchResourceTypes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/resource_types');
            setResourceTypes(response.data);
        } catch (error) {
            console.error('Error fetching resource types:', error);
        }
    };

    const handleAddType = async () => {
        try {
            await axios.post('http://localhost:5000/resource_types', { type_name: newType });
            setNewType('');
            fetchResourceTypes(); // Refresh the list after adding a new type
        } catch (error) {
            console.error('Error adding resource type:', error);
        }
    };

    const handleDeleteType = async (typeId) => {
        try {
            await axios.delete(`http://localhost:5000/resource_types/${typeId}`);
            fetchResourceTypes(); // Refresh the list after deleting a type
        } catch (error) {
            console.error('Error deleting resource type:', error);
        }
    };

    const handleEditType = async (typeId, newName) => {
        const updatedName = prompt('Enter new name:', newName);
        if (updatedName) {
            try {
                await axios.put(`http://localhost:5000/resource_types/${typeId}`, { type_name: updatedName });
                fetchResourceTypes(); // Refresh the list after editing a type
            } catch (error) {
                console.error('Error editing resource type:', error);
            }
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="admin-dashboard-container">
            <div className="add-type-container">
                <input
                    type="text"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    placeholder="New Resource Type"
                />
                <button onClick={handleAddType}>Add</button>
            </div>
            <ul className="resource-type-list">
                {resourceTypes.map((type) => (
                    <li key={type.id} className="resource-type-item">
                        <span>{type.type_name}</span>
                        <div>
                            <button onClick={() => handleEditType(type.id, type.type_name)}>Edit</button>
                            <button onClick={() => handleDeleteType(type.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
        
    );
};

export default AdminDashboard;
