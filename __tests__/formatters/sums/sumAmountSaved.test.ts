import moment from 'moment';
import { Transaction } from 'plaid';
import sumAmountSaved from '../../../src/formatters/formatTransactionResponse/sums/sumAmountSaved';

const TRANSACTIONS = [
  {
    amount: 25.25,
    date: moment().format('YYYY-MM-DD'),
    name: 'First transaction',
  },
  {
    amount: 50.5,
    date: moment().format('YYYY-MM-DD'),
    name: 'First transaction',
  },
];

test('sumAmountSaved: should calculate amount saved when transactions were checked yesterday', () => {
  const deletedTransactions = [];
  const monthlyNetIncome = 3000;
  const expenses = [];

  const lastCheckTransDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const amountSavedSinceLastCheck = sumAmountSaved(
    lastCheckTransDate,
    monthlyNetIncome,
    expenses,
    (TRANSACTIONS as unknown) as Transaction[],
    deletedTransactions
  );
  expect(amountSavedSinceLastCheck).toBe('24.25');
});

test('sumAmountSaved: should calculate amount saved when transactions were checked 2 days ago', () => {
  const deletedTransactions = [];
  const monthlyNetIncome = 3000;
  const expenses = [];

  const lastCheckTransDate = moment().subtract(2, 'days').format('YYYY-MM-DD');
  const amountSavedSinceLastCheck = sumAmountSaved(
    lastCheckTransDate,
    monthlyNetIncome,
    expenses,
    (TRANSACTIONS as unknown) as Transaction[],
    deletedTransactions
  );
  expect(amountSavedSinceLastCheck).toBe('124.25');
});

test('sumAmountSaved: should calculate amount saved when transactions were checked 2 days ago and there are monthly expenses', () => {
  const deletedTransactions = [];
  const monthlyNetIncome = 3000;
  const expenses = [{ value: '100.5', name: 'foo' }];

  const lastCheckTransDate = moment().subtract(2, 'days').format('YYYY-MM-DD');
  const amountSavedSinceLastCheck = sumAmountSaved(
    lastCheckTransDate,
    monthlyNetIncome,
    expenses,
    (TRANSACTIONS as unknown) as Transaction[],
    deletedTransactions
  );
  expect(amountSavedSinceLastCheck).toBe('117.55');
});

test('sumAmountSaved: should return "null" if transactions were already checked today', () => {
  const deletedTransactions = [];
  const monthlyNetIncome = 3000;
  const expenses = [{ value: '100.5', name: 'foo' }];

  const lastCheckTransDate = moment().format('YYYY-MM-DD');
  const amountSavedSinceLastCheck = sumAmountSaved(
    lastCheckTransDate,
    monthlyNetIncome,
    expenses,
    (TRANSACTIONS as unknown) as Transaction[],
    deletedTransactions
  );
  expect(amountSavedSinceLastCheck).toBe('null');
});
