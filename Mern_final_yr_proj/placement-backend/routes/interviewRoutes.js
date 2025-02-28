// backend/routes/interviewRoutes.js

import express from 'express';
import { google } from 'googleapis';
import { sendEmail } from '../emailService.js';
import { sendNotification } from '../notifications.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();
const calendar = google.calendar({ version: 'v3', auth: process.env.GOOGLE_API_KEY });

router.post('/schedule', [
    body('studentEmail').isEmail(),
    body('recruiterEmail').isEmail(),
    body('jobTitle').notEmpty(),
    body('dateTime').isISO8601(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { studentEmail, recruiterEmail, jobTitle, dateTime } = req.body;

        const event = {
            summary: `Interview for ${jobTitle}`,
            start: { dateTime, timeZone: 'UTC' },
            end: { dateTime, timeZone: 'UTC' },
            attendees: [{ email: studentEmail }, { email: recruiterEmail }],
        };

        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });

        await sendEmail(studentEmail, 'Interview Scheduled', `Your interview for ${jobTitle} is scheduled on ${dateTime}.`);
        await sendEmail(recruiterEmail, 'Interview Scheduled', `You scheduled an interview for ${jobTitle} on ${dateTime}.`);
        sendNotification({ message: `New interview scheduled for ${jobTitle}`, type: 'info' });

        res.status(201).json({ message: 'Interview scheduled and emails sent', event: response.data });
    } catch (error) {
        res.status(500).json({ message: 'Error scheduling interview', error });
    }
});

export default router;