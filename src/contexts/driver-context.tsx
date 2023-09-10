import { createContext, Dispatch, useState, useEffect } from "react";
import axios from "../configs/axios-client";
import { get_drivers, restore_driver, suspend_driver } from "../environment/apis"
import { Filter } from "@/@types/filter";
export const DriverContext = createContext<driverContextType | undefined>(undefined);

const DriverContextProvider = ({ children }: any) => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [count, setCount] = useState(0);

  const fetchDrivers = (page: number, rowsPerPage:number , filter?:Filter[]) => {
    axios
      .get(get_drivers(page, rowsPerPage, filter))
      .then((res) => {
        setDrivers(res.data.data);
        setCount(res.data.meta.total);
      })
      .catch((error) => {
      });
  };

  const suspendDriver = (id: string)=> {
    //get driver by index
    const driverIndex = drivers.findIndex((driver) => driver.id === id);
    const singleDriver = drivers[driverIndex];
    if(singleDriver?.deleted_at == null)
    axios
      .delete(suspend_driver(id))
      .then((res) => {
        //set singledriver deletedat to current datetime
        singleDriver.deleted_at = new Date().toUTCString();
        setDrivers([...drivers]);
      })
      .catch((error) => {
      });
    else  
    axios
      .put(restore_driver(id))
      .then((res) => {
        singleDriver.deleted_at = null;
        setDrivers([...drivers]);
      })
      .catch((error) => {
      });
  }

  return (
    <DriverContext.Provider
      value={{
        fetchDrivers,
        drivers,
        count,
        suspendDriver,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export default DriverContextProvider;

export type driverContextType = {
  fetchDrivers: (page: number, rowsPerPage: number, filter?: Filter[]) => void;
  drivers: any[];
  count: number;
  suspendDriver: (id: string) => void;
};
