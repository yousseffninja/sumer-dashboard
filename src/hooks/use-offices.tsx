import { OfficeContext } from './../contexts/offices-context';
import { useContext } from 'react';

export const useOffice = () => useContext(OfficeContext);
