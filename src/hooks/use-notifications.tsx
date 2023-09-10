import { NotificationContext } from '@/contexts/notifications-context';
import { useContext } from 'react';

export const useNotifictions = () => useContext(NotificationContext);
