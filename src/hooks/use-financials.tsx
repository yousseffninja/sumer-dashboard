import { useContext } from 'react';
import { FinancialsContext } from '@/contexts/financials-context';

export const useFinancials = () => useContext(FinancialsContext);