import { createContext, useState } from 'react';
import { Filter } from '@/@types/filter';
import axiosClient from '@/configs/axios-client';
import { get_salons } from '@/environment/apis';

export const SalonContext = createContext<salonContextType | undefined>(undefined)

export const SalonProvider = ({ children }: any) => {
  const [salons, setSalons] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [selectedSalon, setSelectedSalon] = useState<any>([]);

  const fetchSalons = (page: number, rowsPerPage: number, filter?:Filter[]) => {
    axiosClient
      .get(get_salons(page, rowsPerPage, filter))
      .then((res) => {
        setSalons(res.data.salons);
        setCount(res.data.meta.total);
      })
      .catch((error) => {})
  }

  return (
    <SalonContext.Provider
      value={{
        fetchSalons,
        salons,
        count
      }}
    >
      {children}
    </SalonContext.Provider>
  )
}

export default  SalonProvider

export type salonContextType = {
  fetchSalons: (page: number, rowsPerPage: number, filter?:Filter[]) => void;
  salons: any[];
  count: number;
}