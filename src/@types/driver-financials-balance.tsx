export interface IDriverFinancialsBalance{
  id: string;
  name: string;
  avatar: string;
  phone: string;
  username: string;
  account: string;
  created_at: string;
  deleted_at: string;
  balance: number;
}

export type DriverFinancialsBalance = {
  drivers: IDriverFinancialsBalance[];
}