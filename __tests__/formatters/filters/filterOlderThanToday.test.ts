import moment from 'moment';
import { Transaction } from 'plaid';
import { filterOlderThanToday } from '../../../src/formatters/formatTransactionResponse/filters';

test('filterOlderThanToday: should filter transactions that are older than today', () => {
  const transactions = ([
    { date: moment().format('YYYY-MM-DD') },
    { date: moment().subtract(1, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(7, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(30, 'days').format('YYYY-MM-DD') },
  ] as unknown) as Transaction[];

  expect(filterOlderThanToday(transactions)).toEqual([
    { date: moment().format('YYYY-MM-DD') },
  ]);
});
