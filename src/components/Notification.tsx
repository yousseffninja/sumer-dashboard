// components/Notification.tsx
import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';

interface NotificationProps {
  message: string;
  variant: string;
}

const Notification: React.FC<NotificationProps> = ({ message, variant }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message, {
        variant: variant as "default" | "error" | "success" | "warning" | "info" | undefined,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        }
      });
    }
  }, [message, enqueueSnackbar, variant]);

  return null;
};

export default Notification;
