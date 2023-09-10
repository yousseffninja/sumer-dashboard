import { ProductContext } from "@/contexts/product-context"
import { useContext } from "react"

export const useProduct = () => useContext(ProductContext)