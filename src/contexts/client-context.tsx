import { createContext, Dispatch, useState, useEffect } from "react";
import axiosClient from "../configs/axios-client";
import { get_client, get_clients, restore_client, suspend_client } from "../environment/apis"
import { Filter } from "@/@types/filter";

export const ClientContext = createContext<clientContextType | undefined>(undefined);

const ClientContextProvider = ({ children }: any) => {
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>({});
  const [count, setCount] = useState(0);

  const fetchClients = (page: number, rowsPerPage:number , filter?:Filter[]) => {
    axiosClient
      .get(get_clients(page, rowsPerPage, filter))
      .then((res) => {
        setClients(res.data.data)
        setCount(res.data.meta.total)
      })
      .catch((error) => {
      });
  };
  const getClient = (id:string) => {
    axiosClient
      .get(get_client(id))
      .then((res) => {
        setSelectedClient(res.data.data)
      })
      .catch((error) => {
      });
  };

  const suspendClient = (id: string)=> {
    //get client by index
    const clientIndex = clients.findIndex((client) => client.id === id);
    const singleClient = clients[clientIndex];
    if(singleClient?.deleted_at == null)
    axiosClient
      .delete(suspend_client(id))
      .then((res) => {
        //set singleclient deletedat to current datetime
        singleClient.deleted_at = new Date().toUTCString();
        setClients([...clients]);
      })
      .catch((error) => {
      });
    else  
    axiosClient
      .put(restore_client(id))
      .then((res) => {
        singleClient.deleted_at = null;
        setClients([...clients]);
      })
      .catch((error) => {
      });
  }

  return (
    <ClientContext.Provider
      value={{
        clients,
        selectedClient,
        count,
        fetchClients,
        suspendClient,
        getClient
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export default ClientContextProvider;

export type clientContextType = {
  clients: any[];
  count: number;
  selectedClient: any;
  fetchClients: (page: number, rowsPerPage: number, filter?: Filter[]) => void;
  suspendClient: (id: string) => void;
  getClient: (id: string) => void;
};
