import formatTransactionsResponse from '../../../formatters/formatTransactionResponse';
import { TransactionsAPIResponse } from '../../../types/Transactions';
import { getAndMergeTransactionsFromPlaidItems } from '../../plaid';
import connect from '../db/connect';
import getUserInfo from './getUserInfo';

const getTransactions = async (
  session,
  lastCheckTransDate: string
): Promise<TransactionsAPIResponse> => {
  // Connect to the Piggybank database
  await connect();
  const {
    deletedTransactions,
    income,
    items,
    email,
    expenses,
    piggybankValue,
  } = await getUserInfo(session);
  const transactions = await getAndMergeTransactionsFromPlaidItems(
    email,
    items,
    lastCheckTransDate
  );

  const formattedTransactions = formatTransactionsResponse(
    transactions,
    deletedTransactions,
    lastCheckTransDate,
    income,
    expenses,
    piggybankValue
  );

  // TODO: Move any transaction that is OVER THE DAILY BUDGET into a separate list
  // so that the user can verify the transaction or put it into a payment plan

  return formattedTransactions as TransactionsAPIResponse;
};

export default getTransactions;
