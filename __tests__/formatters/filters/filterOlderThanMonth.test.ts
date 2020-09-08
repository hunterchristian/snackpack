import moment from 'moment';
import { Transaction } from 'plaid';
import { filterOlderThanMonth } from '../../../src/formatters/formatTransactionResponse/filters';

test('filterOlderThanMonth: should filter transactions that are older than a month', () => {
  const transactions = ([
    { date: moment().format('YYYY-MM-DD') },
    { date: moment().subtract(1, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(7, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(30, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(35, 'days').format('YYYY-MM-DD') },
  ] as unknown) as Transaction[];

  expect(filterOlderThanMonth(transactions)).toEqual([
    { date: moment().format('YYYY-MM-DD') },
    { date: moment().subtract(1, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(7, 'days').format('YYYY-MM-DD') },
  ]);
});
