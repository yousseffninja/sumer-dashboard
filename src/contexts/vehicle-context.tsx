import {
  get_verified_vehicles,
  suspend_vehicle,
  restore_vehicle,
  get_vehicle,
  verify_vehicle,
  reject_vehicle,
  get_inreview_vehicles,
} from "@/environment/apis";
import axiosClient from "../configs/axios-client";
import { useState, createContext } from "react";
import { Filter } from "@/@types/filter";

export const VehicleContext = createContext<vehicleContextType | undefined>(undefined);

const VehicleContextProvider = ({ children }: any) => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [unverifiedVehicles, setUnverifiedVehicles] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any>([]);
  const [count, setCount] = useState(0);
  const [unverifiedCount, setUnverifiedCount] = useState(0);

  //Fetching All Vehicles
  const fetchVehicles = (page: number, rowsPerPage: number, filter?:Filter[]) => {
    axiosClient
      .get(get_verified_vehicles(page, rowsPerPage, filter))
      .then((res) => {
        setVehicles(res.data.data);
        setCount(res.data.meta.total);
      })
      .catch((error) => {});
  };

  //Fetching unverified Vehicles
  const fetchUnverifiedVehicles = (page: number, rowsPerPage: number, filter?:Filter[]) => {
    axiosClient
      .get(get_inreview_vehicles(page, rowsPerPage, filter))
      .then((res) => {
        setUnverifiedVehicles(res.data.data);
        setUnverifiedCount(res.data.meta.total);
      })
      .catch((error) => {});
  };

  // Get single vehicle
  const getVehicle = (id: string) => {
    axiosClient
      .get(get_vehicle(id))
      .then((res) => {
        setSelectedVehicle(res.data.data);
      })
      .catch((error) => {});
  };

  // Rejecting Vehicle
  const rejectVehicle = (id: string, reason: string) => {
    //Get single vehicle by ID
    const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id == id);
    const singleVehicle = vehicles[vehicleIndex];
    //Applying rejection
    axiosClient
      .put(reject_vehicle(id, reason))
      .then((res) => {
        singleVehicle.status = "UNVERIFIED";
        singleVehicle.reject_reason = reason;
        // Updating Vehicles array on STATE
        setVehicles([...vehicles]);
      })
      .catch((err) => console.log(err));
  };

  //Verifying vehicle
  const verifyVehicle = (id: string) => {
    //Get single vehicle by ID
    const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id == id);
    const singleVehicle = vehicles[vehicleIndex];

    //Applying Acceptance
    axiosClient
      .put(verify_vehicle(id))
      .then((res) => {
        singleVehicle.status = "VERIFIED";
        // Updating Vehicles array on STATE
        setVehicles([...vehicles]);
      })
      .catch((err) => console.log(err));
  };

  // Suspending & Restoring Vehicle (Function to toggle between suspend and restore)

  const suspendVehicle = (id: string) => {
    // Get Vehicle By ID
    const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id == id);
    const singleVehicle = vehicles[vehicleIndex];

    //Check if vehicle is not suspened already (by making sure it does not have deleted_at value)
    if (singleVehicle?.deleted_at == null)
      // Vehicle is not suspened >> Do SUSPEND
      axiosClient
        .delete(suspend_vehicle(id))
        .then((res) => {
          // set singleVehicle deleted_at to current date time
          singleVehicle.deleted_at = new Date().toUTCString();
          // Updating Vehicles array on STATE
          setVehicles([...vehicles]);
        })
        .catch((error) => {});
    // Vehicle is suspened >> Do RESTORE
    else
      axiosClient
        .put(restore_vehicle(id))
        .then((res) => {
          // Clear deleted_at Value
          singleVehicle.delete_at = null;
          // Updating Vehicles array on STATE
          setVehicles([...vehicles]);
        })
        .catch((error) => {});
  };

  return (
    <VehicleContext.Provider
      value={{
        fetchVehicles,
        fetchUnverifiedVehicles,
        vehicles,
        unverifiedVehicles,
        getVehicle,
        verifyVehicle,
        rejectVehicle,
        selectedVehicle,
        count,
        unverifiedCount,
        suspendVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export default VehicleContextProvider;

export type vehicleContextType = {
  fetchVehicles: (page: number, rowsPerPage: number, filter?:Filter[]) => void;
  fetchUnverifiedVehicles: (page: number, rowsPerPage: number, filter?:Filter[]) => void;
  vehicles: any[];
  unverifiedVehicles: any[];
  getVehicle: (id: string) => void;
  verifyVehicle: (id: string) => void;
  rejectVehicle: (id: string, reason: string) => void;
  selectedVehicle: any[];
  count: number;
  unverifiedCount: number;
  suspendVehicle: (id: string) => void;
};
