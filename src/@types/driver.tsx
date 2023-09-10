export interface IDriver {
    id: string;
    name: string;
    email: string;
    phone: string;
    account: string;
    avatar: string;
    username: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    email_verified_at: string;
    phone_verified_at: string;
    fcm_token: string;
    is_active: boolean;
    language: string;
}

export type DriverContextType = {
  drivers: IDriver[];
  saveDriver: (driver: IDriver) => void;
  updateDriver: (id: string) => void;
};
