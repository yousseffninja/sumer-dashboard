import { ClientContext } from '@/contexts/client-context';
import { useContext } from 'react';

export const useClient = () => useContext(ClientContext);
