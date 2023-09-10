import { ConsultationContext } from "@/contexts/consultation-context";
import { useContext } from "react";

export const useConsultation = () => useContext(ConsultationContext);