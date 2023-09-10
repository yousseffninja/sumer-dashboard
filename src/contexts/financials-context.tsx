import { createContext, useState } from 'react';
import { IAccountFinancialsBalance } from '@/@types/account-financials-balance';
import axios from "../configs/axios-client";
import {
  get_financials_account_balance,
  get_financials_drivers_balance, get_financials_offices_balance,
  get_transactions, reset_balance
} from '@/environment/apis';
import { IDriverFinancialsBalance } from '@/@types/driver-financials-balance';
import { ITransactionsFinancials } from '@/@types/transactions-financials';
import { IOfficesFinancialsBalance } from '@/@types/offices-financials-balance';

export const FinancialsContext = createContext<accountFinancialsBalanceContextType | undefined>(undefined);

export const FinancialsProvider = ({ children }: any) => {
  const [transactions, setTransactions] = useState<ITransactionsFinancials[]>([])
  const [accounts, setAccounts] = useState<IAccountFinancialsBalance>({
    account: '',
    avatar: '',
    balance: 0,
    created_at: '',
    deleted_at: '',
    id: '',
    name: '',
    phone: '',
    username: ''
  });
  const [drivers, setDrivers] = useState<IDriverFinancialsBalance[]>([]);
  const [offices, setOffices] = useState<IOfficesFinancialsBalance[]>([]);
  const [count, setCount] = useState(0);

  const fetchTransactions = (page: number, rowsPerPage:number , filter?:string) => {
    axios
      .get(get_transactions(page, rowsPerPage, filter))
      .then((res) => {
        setTransactions(res.data.data)
        setCount(res.data.meta.total);
      })
      .catch((error) => {
      });
  }

  const fetchOffices = (page: number, rowsPerPage:number , filter?:string) => {
    axios
      .get(get_financials_offices_balance(page, rowsPerPage, filter))
      .then((res) => {
        setOffices(res.data.data)
        setCount(res.data.meta.total);
      })
      .catch((error) => {})
  }

  const fetchAccounts = () => {
    axios
      .get(get_financials_account_balance())
      .then((res) => {
        setAccounts(res.data)
      })
      .catch((error) => {
      });
  }

  const restBalance = (id: string) => {
    axios
      .post(reset_balance(id))
      .then((res) => {})
      .catch((error) => {});
  }

  const fetchDrivers = (page: number, rowsPerPage:number , filter?:string) => {
    axios
      .get(get_financials_drivers_balance(page, rowsPerPage, filter))
      .then((res) => {
        setDrivers(res.data.data)
        setCount(res.data.meta.total);
      })
      .catch((error) => {
      });
  }

  return (
    <FinancialsContext.Provider
      value={{
        transactions,
        accounts,
        drivers,
        offices,
        count,
        fetchTransactions,
        restBalance,
        fetchOffices,
        fetchAccounts,
        fetchDrivers,
      }}
    >
      {children}
    </FinancialsContext.Provider>
  )
}

export default FinancialsProvider;

export type accountFinancialsBalanceContextType = {
  fetchTransactions: (page: number, rowsPerPage:number , filter?:string) => void;
  fetchAccounts: () => void;
  fetchOffices: (page: number, rowsPerPage:number , filter?:string) => void;
  fetchDrivers: (page: number, rowsPerPage:number , filter?:string) => void;
  restBalance: (id: string) => void;
  transactions: ITransactionsFinancials[];
  offices: IOfficesFinancialsBalance[];
  accounts: IAccountFinancialsBalance;
  drivers: IDriverFinancialsBalance[];
  count: number;
};