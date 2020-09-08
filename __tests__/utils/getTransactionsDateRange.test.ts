import moment from 'moment';
import { DEFAULT_TRANSACTION_RANGE_DAYS } from '../../src/utils/constants';
import getTransactionsDateRange from '../../src/utils/getTransactionsDateRange';

const OVER_30_DAYS_AGO = moment().subtract(45, 'days').format('YYYY-MM-DD');
const UNDER_30_DAYS_AGO = moment().subtract(15, 'days').format('YYYY-MM-DD');

test('getTransactionsDateRange: should return a date range between now and the time of last log in when time of last log in is greater than 30 days ago', () => {
  const { startDate, endDate } = getTransactionsDateRange({
    lastCheckTransDate: OVER_30_DAYS_AGO,
  });
  expect(startDate).toBe(OVER_30_DAYS_AGO);
  // Using hours to account for the time that has elapsed between the
  // instantiation of NOW and the instantiation of endDate
  expect(endDate).toBe(moment().format('YYYY-MM-DD'));
});

test('getTransactionsDateRange: should return a date range between now and 30 days ago when time of last log in is less than 30 days ago', () => {
  const { startDate, endDate } = getTransactionsDateRange({
    lastCheckTransDate: UNDER_30_DAYS_AGO,
  });
  expect(startDate).toBe(
    moment()
      .subtract(DEFAULT_TRANSACTION_RANGE_DAYS, 'days')
      .format('YYYY-MM-DD')
  );
  // Using hours to account for the time that has elapsed between the
  // instantiation of NOW and the instantiation of endDate
  expect(endDate).toBe(moment().format('YYYY-MM-DD'));
});
