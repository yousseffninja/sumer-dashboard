import { createContext, useState } from "react";
import axiosClient from "../configs/axios-client";
import { get_orders, get_order , cancel_order } from "../environment/apis"
import { Filter } from "@/@types/filter";

export const OrderContext = createContext<orderContextType | undefined>(undefined);

const OrderContextProvider = ({ children }: any) => {
  const [orders, setOrders] = useState<any[]>([]);  
  const [count, setCount] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<any>({});

  const fetchOrders = (page: number, rowsPerPage:number , filter?:Filter[]) => {
    axiosClient
      .get(get_orders(page, rowsPerPage, filter))
      .then((res) => {
        setOrders(res.data.data);
        setCount(res.data.meta.total);
      })
      .catch((error) => {
      });
  };

  const getOrder = (id:string) => {
    axiosClient
      .get(get_order(id))
      .then((res) => {
        setSelectedOrder(res.data.data)
      })
      .catch((error) => {
      });
  };

  const cancelOrder = async (id: string)=> {
    //get order by index
    const orderIndex = orders.findIndex((order) => order.id === id);
    const singleOrder = orders[orderIndex];
    axiosClient
      .put(cancel_order(id))
      .then((res) => {
        //set singleorder canceldat to current datetime
        singleOrder.canceld_at = new Date().toUTCString();
        setOrders([...orders]);
      })
      .catch((error) => {
      });
  }

  return (
    <OrderContext.Provider
      value={{
        fetchOrders,
        orders,
        count,
        selectedOrder,
        cancelOrder,
        getOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export type orderContextType = {
  fetchOrders: (page: number, rowsPerPage: number, filter?: Filter[]) => void;
  orders: any[];
  selectedOrder: any;
  count: number;
  getOrder: (id: string) => void;
  cancelOrder: (id: string) => void;
};
