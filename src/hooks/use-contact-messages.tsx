import { ContactMessageContext } from '@/contexts/contact-message-context';
import { useContext } from 'react';

export const useContactMessage = () => useContext(ContactMessageContext);
