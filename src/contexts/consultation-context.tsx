import { createContext, useState } from 'react';
import { Filter } from '@/@types/filter';
import axiosClient from '@/configs/axios-client';
import { get_constlant, get_consultations, get_consultation } from '@/environment/apis';

export const ConsultationContext = createContext<consultationContextType | undefined>(undefined)

export const ConsultationProvider = ({ children }: any) => {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [consultation, setConsultation] = useState<any>({})
  const [consultants, setConsultants] = useState<any[]>([]);
  const [count, setCount] = useState(0);

  const fetchConsultations = (page: number, rowsPerPage: number, filter?:Filter[]) => {
    axiosClient
      .get(get_consultations(page, rowsPerPage, filter))
      .then((res) => {
        setConsultations(res.data.data.doc);
        setCount(res.data.filteredResults);
      })
      .catch((error) => {})
  }

  const fetchConsultation = (id: string) => {
    axiosClient
      .get(get_consultation(id))
      .then((res) => {
        setConsultation(res.data.data.doc);
      })
      .catch((error) => {})
  }

  const fetchConsultants = (page: number, rowsPerPage: number, filter?:Filter[]) => {
    axiosClient
      .get(get_constlant(page, rowsPerPage, filter))
      .then((res) => {
        setConsultants(res.data.data.doc);
        setCount(res.data.filteredResults);
      })
      .catch((error) => {})
  }

  return (
    <ConsultationContext.Provider
      value={{
        fetchConsultations,
        fetchConsultants,
        fetchConsultation,
        consultations,
        consultation,
        consultants,
        count
      }}
    >
      {children}
    </ConsultationContext.Provider>
  )
}

export default ConsultationProvider;

export type consultationContextType = {
  fetchConsultations: (page: number, rowsPerPage: number, filter?:Filter[]) => void;
  fetchConsultants: (page: number, rowsPerPage: number, filter?:Filter[]) => void;
  fetchConsultation: (id: string) => void;
  consultations: any[];
  consultation: any;
  consultants: any[];
  count: number;
};