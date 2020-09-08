import { Transaction } from 'plaid';
import filterDeletedTransactions from '../../../src/formatters/formatTransactionResponse/filters/filterDeletedTransactions';

test('filterDeletedTransactions: should filter deleted transactions', () => {
  const transactions = ([
    { transaction_id: 'a', amount: 10.25 },
    { transaction_id: 'b', amount: 15.25 },
    { transaction_id: 'c', amount: 20.25 },
  ] as unknown) as Transaction[];
  const deletedTransactions = ([
    { transaction_id: 'b', amount: 15.25 },
  ] as unknown) as Transaction[];

  expect(filterDeletedTransactions(transactions, deletedTransactions)).toEqual([
    { transaction_id: 'a', amount: 10.25 },
    { transaction_id: 'c', amount: 20.25 },
  ]);
});
