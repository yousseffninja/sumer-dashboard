export interface ITransactionsFinancials{
  order_number: number;
  order_status: string;
  user: string;
  type: string;
  amount: number;
  created_at: string;
}

export type TransactionsFinancials = {
  transactions: ITransactionsFinancials[]
}