import { createContext, Dispatch, useState, useEffect } from "react";
import axiosClient from "../configs/axios-client";
import { get_contact_message, get_contact_messages } from "../environment/apis"
import { Filter } from "@/@types/filter";
export const ContactMessageContext = createContext<contactMessageContextType | undefined>(undefined);

const ContactMessageContextProvider = ({ children }: any) => {
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [selectedContactMessage, setSelectedContactMessage] = useState<any>({});
  const [count, setCount] = useState(0);

  const fetchContactMessages = (page: number, rowsPerPage:number ,  filter?:Filter[]) => {
    axiosClient
      .get(get_contact_messages(page, rowsPerPage, filter))
      .then((res) => {
        setContactMessages(res.data.data)
        setCount(res.data.meta.total)
      })
      .catch((error) => {
      });
  };
  const getContactMessage = (id:string) => {
    axiosClient
      .get(get_contact_message(id))
      .then((res) => {
        setSelectedContactMessage(res.data.data)
      })
      .catch((error) => {
      });
  };

  const deleteContactMessage = (id: string)=> {
    //get contactMessage by index
    const contactMessageIndex = contactMessages.findIndex((contactMessage) => contactMessage.id === id);
    const singleContactMessage = contactMessages[contactMessageIndex];
    axiosClient
      .delete(get_contact_message(id))
      .then((res) => {
        //set singlecontactMessage deletedat to current datetime
        singleContactMessage.deleted_at = new Date().toUTCString();
        setContactMessages([...contactMessages]);
      })
      .catch((error) => {
      });
  }

  return (
    <ContactMessageContext.Provider
      value={{
        contactMessages,
        selectedContactMessage,
        count,
        fetchContactMessages,
        deleteContactMessage,
        getContactMessage
      }}
    >
      {children}
    </ContactMessageContext.Provider>
  );
};

export default ContactMessageContextProvider;

export type contactMessageContextType = {
  contactMessages: any[];
  count: number;
  selectedContactMessage: any;
  fetchContactMessages: (page: number, rowsPerPage: number,  filter?:Filter[]) => void;
  deleteContactMessage: (id: string) => void;
  getContactMessage: (id: string) => void;
};
