import { VoucherContext } from "@/contexts/voucher-context";
import { useContext } from "react";

export const useVoucher = () => useContext(VoucherContext);
