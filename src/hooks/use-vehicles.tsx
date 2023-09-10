import { VehicleContext } from "@/contexts/vehicle-context";
import { useContext } from "react";

export const useVehicle = () => useContext(VehicleContext);
