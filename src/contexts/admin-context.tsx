import { createContext, Dispatch, useState, useEffect } from "react";
import axiosClient from "../configs/axios-client";
import { get_admin, get_admins, restore_admin, suspend_admin,add_admin,edit_admin } from "../environment/apis";
import { Filter } from "@/@types/filter";
export const AdminContext = createContext<adminContextType | undefined>(undefined);

const AdminContextProvider = ({ children }: any) => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<any>({});
  const [count, setCount] = useState(0);

  const fetchAdmins = (page: number, rowsPerPage: number, filter?:Filter[]) => {
    axiosClient
      .get(get_admins(page, rowsPerPage, filter))
      .then((res) => {
        setAdmins(res.data.data);
        setCount(res.data.meta.total);
      })
      .catch((error) => {});
  };
  const getAdmin = (id: string) => {
    axiosClient
      .get(get_admin(id))
      .then((res) => {
        setSelectedAdmin(res.data.data);
      })
      .catch((error) => {});
  };

  const suspendAdmin = (id: string) => {
    //get client by index
    const adminIndex = admins.findIndex((admin) => admin.id === id);
    const singleAdmin = admins[adminIndex];
    if (singleAdmin?.deleted_at == null)
      axiosClient
        .delete(suspend_admin(id))
        .then((res) => {
          //set singleclient deletedat to current datetime
          singleAdmin.deleted_at = new Date().toUTCString();
          setAdmins([...admins]);
        })
        .catch((error) => {});
    else
      axiosClient
        .put(restore_admin(id))
        .then((res) => {
          singleAdmin.deleted_at = null;
          setAdmins([...admins]);
        })
        .catch((error) => {});
  };

  const addAdmin = async (username: string, name:string ,phone:string ,email:string,password:string,permissions:string ) => {
    
   const res = await axiosClient.post(add_admin(),{username:username,name:name,phone: phone,email: email,password:password})
    if(res.status == 201||res.status==200) return true;
      else return false;
   };
  const editAdmin = async (id:string,username: string, name:string ,phone:string ,email:string,password:string,permissions:string ) => {
    
   const res = await axiosClient.put(edit_admin(id),{username:username,name:name,phone: phone,email: email,password:password})
    if(res.status == 201||res.status == 200) return true;
      else return false;
   };

  return (
    <AdminContext.Provider
      value={{
        admins,
        selectedAdmin,
        count,
        fetchAdmins,
        suspendAdmin,
        getAdmin,
        addAdmin,
        editAdmin
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

export type adminContextType = {
  admins: any[];
  count: number;
  selectedAdmin: any;
  fetchAdmins: (page: number, rowsPerPage: number, filter?: Filter[]) => void;
  suspendAdmin: (id: string) => void;
  getAdmin: (id: string) => void;
  addAdmin:(username: string, name:string ,phone:string ,email:string,password:string,permissions:string)=>Promise<boolean>;
  editAdmin:(id: string,username: string, name:string ,phone:string ,email:string,password:string,permissions:string)=>Promise<boolean>;
};
