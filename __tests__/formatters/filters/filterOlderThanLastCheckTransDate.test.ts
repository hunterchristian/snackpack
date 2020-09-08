import moment from 'moment';
import { Transaction } from 'plaid';
import { filterOlderThanLastCheckTrans } from '../../../src/formatters/formatTransactionResponse/filters';

test('filterOlderThanLastCheckTrans: should filter transactions that are older than the last time a user checked their transactions', () => {
  const transactions = ([
    { date: moment().format('YYYY-MM-DD') },
    { date: moment().subtract(1, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(2, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(7, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(30, 'days').format('YYYY-MM-DD') },
    { date: moment().subtract(35, 'days').format('YYYY-MM-DD') },
  ] as unknown) as Transaction[];

  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
  expect(filterOlderThanLastCheckTrans(transactions, yesterday)).toEqual([
    { date: moment().format('YYYY-MM-DD') },
    { date: moment().subtract(1, 'days').format('YYYY-MM-DD') },
  ]);
});
