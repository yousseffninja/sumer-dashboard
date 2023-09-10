import { DriverContext } from '@/contexts/driver-context';
import { useContext } from 'react';

export const useDriver = () => useContext(DriverContext);
