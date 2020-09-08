import { Transaction } from 'plaid';

interface TransactionsSlice {
  items: Transaction[];
  budget: number;
}

export interface TransactionsAPIResponse {
  today: TransactionsSlice;
  week: TransactionsSlice;
  month: TransactionsSlice;
  amountSavedSinceLastCheck: string;
  anomalousTransactions: {
    items: Transaction[];
  };
  piggybankValue: number;
}

export interface CompactedTransaction {
  transaction_id: string;
}
