import { createContext, useState } from 'react';
import { Filter } from '@/@types/filter';
import axiosClient from '@/configs/axios-client';

import { get_user, get_users } from '@/environment/apis'; 

export const UserContext = createContext<userContextType | undefined>(undefined)

export const UserProvider = ({ children }: any) => {
  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState<any>({});
  const [count, setCount] = useState(0);

  const fetchUsers = (page: number, rowsPerPage: number, filter?:Filter[]) => {
    axiosClient
      .get(get_users(page, rowsPerPage, filter))
      .then((res) => {
        setUsers(res.data.data.doc);
        setCount(res.data.filteredResults);
      })
      .catch((error) => {})
  }

  const getUser = (id: string) => {
    axiosClient
      .get(get_user(id))
      .then((res) => {
        setUser(res.data.user)
      })
      .catch((error) => {
      });
  }

  return (
    <UserContext.Provider
      value={{
        fetchUsers,
        getUser,
        users,
        user,
        count
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;

export type userContextType = {
  fetchUsers: (page: number, rowsPerPage: number, filter?:Filter[]) => void;
  getUser: (id: string) => void;
  users: any[];
  user: any;
  count: number;
}