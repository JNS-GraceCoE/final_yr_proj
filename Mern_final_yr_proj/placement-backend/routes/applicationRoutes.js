// backend/routes/applicationRoutes.js

import express from 'express';
import { sendEmail } from '../emailService.js';
import Application from '../models/Application.js';

const router = express.Router();

router.post('/apply', async (req, res) => {
    try {
        const { studentEmail, recruiterEmail, jobTitle } = req.body;
        const application = new Application(req.body);
        await application.save();

        await sendEmail(studentEmail, 'Application Received', `You applied for ${jobTitle}.`);
        await sendEmail(recruiterEmail, 'New Application Submitted', `A student applied for ${jobTitle}.`);

        res.status(201).json({ message: 'Application submitted and emails sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error processing application', error });
    }
});

export default router;