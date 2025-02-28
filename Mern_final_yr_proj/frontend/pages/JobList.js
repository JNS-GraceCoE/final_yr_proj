// frontend/pages/JobList.js

import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get('/api/jobs')
            .then(response => setJobs(response.data))
            .catch(error => console.error('Error fetching jobs:', error));
    }, []);

    const applyForJob = async (jobId) => {
        try {
            await axios.post(`/api/jobs/${jobId}/apply`, { userId: user._id });
            alert('Application submitted!');
        } catch (error) {
            alert('Application failed');
        }
    };

    return (
        <div>
            <h1>Available Jobs</h1>
            <ul>
                {jobs.map(job => (
                    <li key={job._id}>
                        <h2>{job.title}</h2>
                        <p>{job.description}</p>
                        <p><strong>Company:</strong> {job.company}</p>
                        {user.role === 'student' && (
                            <button onClick={() => applyForJob(job._id)}>Apply</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;