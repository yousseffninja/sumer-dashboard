export interface ITransactions {
  order_status: string;
  user: string;
  order_number: number;
  id: string;
  type: string,
  amount: number,
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export type TransactionsType = {
  transations: ITransactions[];
  saveTransactions: (transations: TransactionsType) => void;
  updateTransactions: (id: string) => void;
};