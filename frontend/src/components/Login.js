import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import your CSS file

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simulate login process (replace with actual API call)
            if (username === 'admin' && password === 'admin' && userType === 'admin') {
                navigate('/admin/dashboard');
            } else if (username === 'company' && password === 'company' && userType === 'company') {
                navigate('/company/dashboard');
            } else {
                console.error('Invalid credentials or user type');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <h1>Company Bench Sharing Portal</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="admin"
                                checked={userType === 'admin'}
                                onChange={() => setUserType('admin')}
                            />
                            Admin
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="company"
                                checked={userType === 'company'}
                                onChange={() => setUserType('company')}
                            />
                            Company
                        </label>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
