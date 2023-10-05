import { AuthProvider } from "./auth-context";
import ClientContextProvider from "./client-context";
import ContactMessageContextProvider from "./contact-message-context";
import DriverContextProvider from "./driver-context";
import OrderContextProvider from "./order-context";
import VehicleContextProvider from "./vehicle-context";
import AdminContextProvider from "./admin-context";
import FinancialsProvider from '@/contexts/financials-context';
import ProductProvider from '@/contexts/product-context';
import SalonProvider from '@/contexts/salon-context';
import ConsultationContext  from "./consultation-context";
import UserContext from "./users-context";
import VoucherProvider from "./voucher-context";

const ContextProvider = ({ children }: any) => {
  return (
    <ClientContextProvider>
      <DriverContextProvider>
        <ContactMessageContextProvider>
          <OrderContextProvider>
            <VehicleContextProvider>
              <AdminContextProvider>
                <FinancialsProvider>
                  <ProductProvider>
                    <SalonProvider>
                      <ConsultationContext>
                        <VoucherProvider>
                          <UserContext>
                            <AuthProvider>{children}</AuthProvider>
                          </UserContext>
                        </VoucherProvider>
                      </ConsultationContext>
                    </SalonProvider>
                  </ProductProvider>
                </FinancialsProvider>
              </AdminContextProvider>
            </VehicleContextProvider>
          </OrderContextProvider>
        </ContactMessageContextProvider>
      </DriverContextProvider>
    </ClientContextProvider>
  );
};
export default ContextProvider;
