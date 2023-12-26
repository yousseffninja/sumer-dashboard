import { createContext, useState } from 'react';
import { Filter } from '@/@types/filter';
import axiosClient from '@/configs/axios-client';
import socket from '@/configs/socket-client';
import { get_vouchers, get_voucher, create_voucher } from '@/environment/apis';

export const VoucherContext = createContext<voucherContextType | undefined>(undefined)

export const VoucherProvider = ({ children }: any) => {
  const [vouchers, setVoucher] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);

  const fetchVouchers = (page: number, rowsPerPage: number, filter?:Filter[]) => {
    axiosClient
      .get(get_vouchers(page, rowsPerPage, filter))
      .then((res) => {
        setVoucher(res.data.data.doc);
        setCount(res.data.filteredResults);
      })
      .catch((error) => {})
  };

  const fetchVoucher = (id: string) => {
    axiosClient
      .get(get_voucher(id))
      .then((res) => {
        setVoucher(res.data.data.doc);
      })
      .catch((error) => {})
  };

  const createVoucher = (data: any) => {
    axiosClient
      .post(create_voucher(), data)
      .then((res) => {
        socket.emit('notification', {message: `There is a new voucher code: ${data.code} ! Check it out!`, variant: 'info'});
        setVoucher(res.data.data.doc);
        
      })
      .catch((error) => {
      })
  };

  return (
    <VoucherContext.Provider
      value={{
        fetchVouchers,
        fetchVoucher,
        createVoucher,
        vouchers,
        count
      }}
    >
      {children}
    </VoucherContext.Provider>
  )
};

export default VoucherProvider;

export type voucherContextType = {
  vouchers: any[],
  count: number,
  fetchVouchers: (page: number, rowsPerPage: number, filter?:Filter[]) => void,
  fetchVoucher: (id: string) => void,
  createVoucher: (data: any) => void
}