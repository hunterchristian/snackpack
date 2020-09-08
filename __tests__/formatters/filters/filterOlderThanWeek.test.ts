import moment from 'moment';
import { Transaction } from 'plaid';
import { filterOlderThanWeek } from '../../../src/formatters/formatTransactionResponse/filters';

test('filterOlderThanWeek: should filter transactions that are older than a week', () => {
  const transactions = ([
    { date: moment().format('YYYY-MM-DD') },
    { date: moment().subtract(1, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(7, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(30, 'days').format('YYYY-MM-DD') },
  ] as unknown) as Transaction[];

  expect(filterOlderThanWeek(transactions)).toEqual([
    { date: moment().format('YYYY-MM-DD') },
    { date: moment().subtract(1, 'days').format('YYYY-MM-DD') },
  ]);
});
