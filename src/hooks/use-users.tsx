import { UserContext } from '@/contexts/users-context';
import { useContext } from 'react';

export const useUser = () => useContext(UserContext);