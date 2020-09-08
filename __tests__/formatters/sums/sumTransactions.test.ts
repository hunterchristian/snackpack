import { Transaction } from 'plaid';
import sumTransactions from '../../../src/formatters/formatTransactionResponse/sums/sumTransactions';

test('sumTransactions: should sum transactions', () => {
  const transactions = ([
    { amount: 10.25 },
    { amount: 15.25 },
    { amount: 20.25 },
  ] as unknown) as Transaction[];
  expect(sumTransactions(transactions)).toBe(45.75);
});
