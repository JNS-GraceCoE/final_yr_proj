// frontend/pages/JobPost.js

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/jobs', { title, description, company });
            navigate('/jobs');
        } catch (error) {
            alert('Job posting failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Job Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="text" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} required />
            <button type="submit">Post Job</button>
        </form>
    );
};

export default JobPost;