// placement-backend/routes/jobRoutes.js

import express from 'express';
import Job from '../models/Job.js';
import { verifyJWT, authorizeRole } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all jobs (Accessible to all users)
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a job (Only recruiters can post)
router.post('/', verifyJWT, authorizeRole(['recruiter']), async (req, res) => {
    try {
        const newJob = new Job({ ...req.body, postedBy: req.user.id });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a job (Only the recruiter who posted it can edit)
router.put('/:id', verifyJWT, authorizeRole(['recruiter']), async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        if (job.postedBy.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });
        
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJob);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a job (Only admins can delete jobs)
router.delete('/:id', verifyJWT, authorizeRole(['admin']), async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
