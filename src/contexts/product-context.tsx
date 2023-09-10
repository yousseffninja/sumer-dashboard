import { createContext, useState } from 'react';
import { Filter } from '@/@types/filter';
import axiosClient from '@/configs/axios-client';
import { get_products } from '@/environment/apis';

export const ProductContext = createContext<productContextType | undefined>(undefined)

export const ProductProvider = ({ children }: any) => {
  const [product, setProduct] = useState<any[]>([]);
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

  return (
    <ProductContext.Provider
      value={{
        fetchProducts,
        product,
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
  product: any[];
  count: number;
}