import { Transaction } from 'plaid';
import getTransactionsDateRange from '../../utils/getTransactionsDateRange';
import client from './client';

const getTransactionsFromPlaidItem = async (
  accessToken,
  lastCheckTransDate?: string
): Promise<Transaction[]> => {
  const { startDate, endDate } = getTransactionsDateRange({
    lastCheckTransDate,
  });

  return new Promise((res, rej) => {
    client.getTransactions(
      accessToken,
      startDate,
      endDate,
      {
        // TODO: If user has more than 500 transactions in a week/month/period, some will be left off
        // and their budget surplus will be miscalculated.
        // TODO: Fetch all pages of data
        count: 500,
        offset: 0,
      },
      function (error, transactionsResponse) {
        if (error) {
          rej(error);
        }
        res(transactionsResponse.transactions);
      }
    );
  });
};

export default getTransactionsFromPlaidItem;
