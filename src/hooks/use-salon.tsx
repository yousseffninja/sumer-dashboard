import { SalonContext } from "@/contexts/salon-context"; 
import { useContext } from "react" ;

export const useSalon = () => useContext(SalonContext);