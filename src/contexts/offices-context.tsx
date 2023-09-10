import { createContext, Dispatch, useState, useEffect } from "react";
import axios from "../configs/axios-client";
import { get_offices, suspend_office, restore_office, add_office ,get_office } from "../environment/apis"
import { Filter } from "@/@types/filter";

export const OfficeContext = createContext<officeContextType | undefined>(undefined);

const OfficeContextProvider = ({ children }: any) => {

  const [offices, setOffices] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [selectedOffice, setSelectedOffice] = useState<any>({});
  const [isSent, setIsSent] = useState(false);
  const fetchOffices = (page: number, rowsPerPage:number , filter?:Filter[]) => {
    axios
      .get(get_offices(page, rowsPerPage, filter))
      .then((res) => {
        setOffices(res.data.data);
        setCount(res.data.meta.total);
      })
      .catch((error) => {
      });
  };

  const getOffice = (id:string)=>{
    axios.get(get_office(id))
    .then( res => {
      setSelectedOffice(res.data)
    })
    .catch(err=>console.log(err))
  }
  const addOffice = async (username: string, name:string ,office_name:string,phone:string ,email:string,password:string ) => {
    const res =  await axios.post(add_office(),{username:username,name:name,office_name: office_name,phone: phone,email: email,password:password})
    if(res.status == 201||res.status==200)
     return true;
    else return false;
   };
 
  const suspendOffice = (id: string)=> {
    //get offic by index
    const officesIndex = offices.findIndex((offices) => offices.id === id);
    const singleOffice = offices[officesIndex];
    if(singleOffice?.deleted_at == null)
    axios
      .delete(suspend_office(id))
      .then((res) => {
        //set singleOffice deletedat to current datetime
        singleOffice.deleted_at = new Date().toUTCString();
        setOffices([...offices]);
      })
      .catch((error) => {
      });
    else  
    axios
      .put(restore_office(id))
      .then((res) => {
        singleOffice.deleted_at = null;
        setOffices([...offices]);
      })
      .catch((error) => {
      });
  }

  return (
    <OfficeContext.Provider
      value={{
        fetchOffices,
        offices,
        count,
        selectedOffice,
        isSent,
        suspendOffice,
        addOffice,
        getOffice,
      }}
    >
      {children}
    </OfficeContext.Provider>
  );
};

export default OfficeContextProvider;

export type officeContextType = {
  fetchOffices: (page: number, rowsPerPage: number, filter?: Filter[]) => void;
  offices: any[];
  count: number;
  selectedOffice: any;
  isSent: boolean;
  suspendOffice: (id: string) => void;
  addOffice: (
    username: string,
    name: string,
    office_name: string,
    phone: string,
    email: string,
    password: string
  ) =>  Promise<boolean>;
  getOffice: (id: string) => void;
};
