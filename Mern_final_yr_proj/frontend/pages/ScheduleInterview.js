// frontend/pages/ScheduleInterview.js

import { useState } from 'react';
import axios from 'axios';

const ScheduleInterview = () => {
    const [email, setEmail] = useState('');
    const [recruiterEmail, setRecruiterEmail] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [dateTime, setDateTime] = useState('');

    const handleSchedule = async () => {
        try {
            await axios.post('/api/schedule', { studentEmail: email, recruiterEmail, jobTitle, dateTime });
            alert('Interview scheduled! Email sent.');
        } catch (error) {
            console.error('Error scheduling interview:', error);
        }
    };

    return (
        <div>
            <h1>Schedule an Interview</h1>
            <input type="email" placeholder="Student Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="email" placeholder="Recruiter Email" value={recruiterEmail} onChange={(e) => setRecruiterEmail(e.target.value)} />
            <input type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
            <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
            <button onClick={handleSchedule}>Schedule</button>
        </div>
    );
};

export default ScheduleInterview;
