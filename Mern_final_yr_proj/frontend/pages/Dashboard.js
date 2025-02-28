// frontend/pages/Dashboard.js

import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    if (!user) return <h2>Loading...</h2>;

    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            {user.role === 'student' && (
                <>
                    <p>View job listings and apply.</p>
                    <Link to="/jobs">View Jobs</Link>
                </>
            )}
            {user.role === 'recruiter' && (
                <>
                    <p>Post and manage job vacancies.</p>
                    <Link to="/post-job">Post a Job</Link>
                    <Link to="/applications">View Applications</Link>
                </>
            )}
            {user.role === 'admin' && (
                <>
                    <p>Monitor and control all activities.</p>
                    <Link to="/admin">Admin Dashboard</Link>
                </>
            )}
        </div>
    );
};

export default Dashboard;

