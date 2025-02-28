// frontend/pages/JobApplications.js

import { useState } from 'react';
import axios from 'axios';

const JobApplications = () => {
    const [email, setEmail] = useState('');
    const [jobTitle, setJobTitle] = useState('');

    const handleApply = async () => {
        try {
            await axios.post('/api/apply', { studentEmail: email, recruiterEmail: 'recruiter@example.com', jobTitle });
            alert('Application submitted! Email sent.');
        } catch (error) {
            console.error('Error applying:', error);
        }
    };

    return (
        <div>
            <h1>Apply for a Job</h1>
            <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
            <button onClick={handleApply}>Apply</button>
        </div>
    );
};

export default JobApplications;
