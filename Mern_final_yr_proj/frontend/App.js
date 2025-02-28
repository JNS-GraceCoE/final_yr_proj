// frontend/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JobList from './pages/JobList';
import JobPost from './pages/JobPost';
import JobApplications from './pages/JobApplications';
import AdminDashboard from './pages/AdminDashboard';
import Chat from './pages/Chat';
import Analytics from './pages/Analytics';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const App = () => {
    useEffect(() => {
        socket.on('notification', (message) => {
            alert(message);
        });
    }, []);

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/jobs" element={<JobList />} />
                    <Route path="/post-job" element={<JobPost />} />
                    <Route path="/applications" element={<JobApplications />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/analytics" element={<Analytics />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;