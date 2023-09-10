import { createContext, useState } from "react";
import axios from "../configs/axios-client";
import { post_Notification } from "@/environment/apis";

export const NotificationContext = createContext<NoticationType | undefined>(undefined);

const NoticationContextProvider = ({ children }: any) => {

   const [isSent, setIsSent] = useState(false);

  
  const addNotification = async (group: string, title_ar:string ,text_ar:string,title_en:string ,text_en:string ) => {
   const res = await  axios
      .post(post_Notification(),{group:group,title_ar:title_ar,text_ar: text_ar,title_en: title_en,text_en: text_en})
      if(res.status == 201) return true;
      else return false;
  };


  return (
    <NotificationContext.Provider
      value={{
        addNotification,
        isSent,
        setIsSent
        
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NoticationContextProvider;

export type NoticationType = {
  addNotification: (group: string, title_ar:string ,text_ar:string,title_en:string ,text_en:string) => Promise<boolean>;
  isSent:boolean;
  setIsSent:(isSent:boolean)=>void;
};
