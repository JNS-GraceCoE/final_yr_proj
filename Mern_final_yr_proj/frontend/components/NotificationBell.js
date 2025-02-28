// frontend/components/NotificationBell.js

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socket.on('notification', (data) => {
            setNotifications((prev) => [...prev, data]);
        });
    }, []);

    return (
        <div>
            <button>🔔 {notifications.length}</button>
            <ul>
                {notifications.map((notif, index) => (
                    <li key={index}>{notif.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationBell;