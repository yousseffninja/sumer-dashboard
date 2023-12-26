// hooks/socket.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface NotificationData {
  message: string;
  variant: string;
}

const socket: Socket = io('http://localhost:8000', {
  transports: ['websocket', 'polling']
}); // Replace with your server URL

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [notification, setNotification] = useState<NotificationData | null>(null);

  useEffect(() => {
    const handleConnect = () => {
      console.log('Socket connected:', socket.id);
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    };

    const handleNotification = (data: NotificationData) => {
      console.log('Received notification:', data);
      setNotification(data);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('notification', handleNotification);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('notification', handleNotification);
    };
  }, []);

  return { socket, isConnected, notification };
};
