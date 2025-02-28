// frontend/pages/AdminDashboard.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NotificationBell from '../components/NotificationBell';

const AdminDashboard = () => {
    const { data: stats } = useQuery(['adminStats'], () =>
        axios.get('/api/admin/stats').then(res => res.data)
    );

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <NotificationBell />
            <p>Total Jobs: {stats?.totalJobs}</p>
            <p>Total Applications: {stats?.totalApplications}</p>
            <h2>Jobs by Recruiter</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats?.jobsByRecruiter}>
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
            <h2>Applications per Job</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats?.applicationsByJob}>
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AdminDashboard;
