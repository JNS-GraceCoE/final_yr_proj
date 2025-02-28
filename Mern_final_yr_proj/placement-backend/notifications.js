// backend/notifications.js

import { Server } from 'socket.io';

let io;
export const initSocket = (server) => {
    io = new Server(server, { cors: { origin: '*' } });
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('notify', (data) => {
            io.emit('notification', data);
        });
    });
};

export const sendNotification = (data) => {
    if (io) {
        io.emit('notification', data);
    }
};