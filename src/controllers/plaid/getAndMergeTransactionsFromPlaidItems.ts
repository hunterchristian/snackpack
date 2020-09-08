import { Transaction } from 'plaid';
import { getTransactionsFromPlaidItem } from '.';
import { decrypt } from '../../utils/encryption';

const getAndMergeTransactionsFromPlaidItems = async (
  userEmail,
  items,
  lastCheckTransDate: string
): Promise<Transaction[]> => {
  if (!items || !items.length) {
    throw new Error(`No items returned for user: ${JSON.stringify(userEmail)}`);
  }

  // Fetch transactions for all items
  const accessTokens = items.map(i => decrypt(i.access_token));
  const promises = [];
  accessTokens.forEach(t =>
    promises.push(getTransactionsFromPlaidItem(t, lastCheckTransDate))
  );
  const promiseReturnVals = await Promise.all(promises);
  const mergedTransactions = promiseReturnVals.flat();

  return mergedTransactions as Transaction[];
};

export default getAndMergeTransactionsFromPlaidItems;
