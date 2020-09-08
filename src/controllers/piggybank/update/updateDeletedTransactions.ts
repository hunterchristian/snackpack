import { CompactedTransaction } from '../../../types/Transactions';
import connect from '../db/connect';
import UserModel from '../db/UserModel';

const updateDeletedTransactions = async (
  userEmail: string,
  deletedTransactions: CompactedTransaction[]
) => {
  // Connect to the Piggybank database
  await connect();

  // tslint:disable-next-line: await-promise
  const userData = await UserModel.findOne({ email: userEmail });
  userData.deletedTransactions = [
    ...userData.deletedTransactions,
    ...deletedTransactions,
  ];

  await userData.save();
};

export default updateDeletedTransactions;
