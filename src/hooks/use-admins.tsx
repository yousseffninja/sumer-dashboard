import { AdminContext } from "@/contexts/admin-context";
import { useContext } from "react";

export const useAdmin = () => useContext(AdminContext);
