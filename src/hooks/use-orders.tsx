import { OrderContext } from '@/contexts/order-context';
import { useContext } from 'react';

export const useOrder = () => useContext(OrderContext);
