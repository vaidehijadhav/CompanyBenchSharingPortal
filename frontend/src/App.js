import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import CompanyDashboard from './components/CompanyDashboard';
import ResourceDetails from './components/ResourceDetails';
import BookedResources from './components/BookedResources';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/admin" element={<AdminDashboard/>} />
                <Route path="/company" element={<CompanyDashboard/>} />
                <Route path="/resources/:type" element={<ResourceDetails/>} />
                <Route path="/booked_resources" element={<BookedResources/>} />
            </Routes>
        </Router>
    );
};

export default App;
