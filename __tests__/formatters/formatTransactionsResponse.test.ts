import moment from 'moment';
import formatTransactionsResponse from '../../src/formatters/formatTransactionResponse/formatTransactionsResponse';

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

test('formatTransactionsResponse: should calculate budgets for day, week, and month', () => {
  const deletedTransactions = [];
  const lastCheckTransDate = '2020-07-08';
  const monthlyNetIncome = 3000;
  const expenses = [];
  const piggybankValue = 0;

  const formattedResponse = formatTransactionsResponse(
    TRANSACTIONS,
    deletedTransactions,
    lastCheckTransDate,
    monthlyNetIncome,
    expenses,
    piggybankValue
  );

  expect(formattedResponse.today.budget).toBe(24.25);
  expect(formattedResponse.week.budget).toBe(674.25);
  expect(formattedResponse.month.budget).toBe(2924.25);
});

test('formatTransactionsResponse: should calculate amount saved since transactions were last checked', () => {
  const deletedTransactions = [];
  const monthlyNetIncome = 3000;
  const expenses = [];
  const piggybankValue = 0;

  const lastCheckTransDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const formattedResponse = formatTransactionsResponse(
    TRANSACTIONS,
    deletedTransactions,
    lastCheckTransDate,
    monthlyNetIncome,
    expenses,
    piggybankValue
  );
  expect(formattedResponse.amountSavedSinceLastCheck).toBe('24.25');
});
