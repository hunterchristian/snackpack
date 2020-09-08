import { Transaction } from 'plaid';
import { sumMonthBudget } from '../../../src/formatters/formatTransactionResponse/sums';
import { Expense } from '../../../src/controllers/piggybank/db/UserModel';

test('sumTodayBudget: should calculate the amount of funds remaining for today', () => {
  const transactions = ([
    { amount: 10.25 },
    { amount: 15.25 },
    { amount: 20.25 },
  ] as unknown) as Transaction[];
  const expenses = ([
    { value: '5.25' },
    { value: '500.25' },
  ] as unknown) as Expense[];
  const monthlyNetIncome = 3000;

  expect(sumMonthBudget(transactions, monthlyNetIncome, expenses)).toBe(
    2448.75
  );
});
