export type Transaction = {
  _id: string;
  user: string;
  amount: number;
  transaction_type: string;
  createdAt: string;
  updatedAt: string;
};

export type TransactionData = {
  success: boolean;
  transactions?: Transaction[];
  message?: string;
};

export type BalanceData = {
  success: boolean;
  balance?: string;
  message?: string;
};
