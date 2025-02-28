// frontend/pages/Analytics.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
    const [data, setData] = useState({ jobs: 0, applications: 0, users: 0, roleDistribution: [] });

    useEffect(() => {
        axios.get('/api/analytics')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching analytics:', error));
    }, []);

    return (
        <div>
            <h1>Admin Analytics Dashboard</h1>
            <div style={{ width: '50%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[{ name: 'Stats', jobs: data.jobs, applications: data.applications, users: data.users }]}> 
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="jobs" fill="#0088FE" />
                        <Bar dataKey="applications" fill="#00C49F" />
                        <Bar dataKey="users" fill="#FFBB28" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div style={{ width: '50%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data.roleDistribution} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                            {data.roleDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Analytics;
