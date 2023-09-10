export interface IAccountBalance {
  name: string;
  id: string;
  order_id: string;
  total: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
export type UserContextType = {
  user: IAccountBalance[];
};