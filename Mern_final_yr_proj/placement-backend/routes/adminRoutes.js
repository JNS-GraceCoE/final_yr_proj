// backend/routes/adminRoutes.js

import express from 'express';
import Job from '../models/Job.js';
import Application from '../models/Application.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
    try {
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();
        const jobsByRecruiter = await Job.aggregate([{ $group: { _id: '$recruiter', count: { $sum: 1 } } }]);
        const applicationsByJob = await Application.aggregate([{ $group: { _id: '$job', count: { $sum: 1 } } }]);

        res.json({ totalJobs, totalApplications, jobsByRecruiter, applicationsByJob });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error });
    }
});

export default router;