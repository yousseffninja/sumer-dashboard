import { createContext, useState } from 'react';
import { Filter } from '@/@types/filter';
import axiosClient from '@/configs/axios-client';
import { get_invoices, get_products } from '@/environment/apis';

export const ProductContext = createContext<productContextType | undefined>(undefined)

export const ProductProvider = ({ children }: any) => {
  const [product, setProduct] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>([]);
  const [count, setCount] = useState(0);

  const fetchProducts = (page: number, rowsPerPage: number, filter?:Filter[]) => {
    axiosClient
      .get(get_products(page, rowsPerPage, filter))
      .then((res) => {
        
        setProduct(res.data.Products);
        setCount(res.data.results);
      })
      .catch((error) => {})
  }

  const fetchInvoices = (page: number, rowsPerPage: number, filter?:Filter[]) => {
    axiosClient
      .get(get_invoices(page, rowsPerPage, filter))
      .then((res) => {
        setInvoices(res.data.data.doc);
        setCount(res.data.filteredResults);
      })
      .catch((error) => {})
  }

  return (
    <ProductContext.Provider
      value={{
        fetchProducts,
        fetchInvoices,
        product,
        invoices,
        count
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}


export default ProductProvider

export type productContextType = {
  fetchProducts: (page: number, rowsPerPage: number, filter?:Filter[]) => void;
  fetchInvoices: (page: number, rowsPerPage: number, filter?:Filter[]) => void;
  product: any[];
  invoices: any[];
  count: number;
}