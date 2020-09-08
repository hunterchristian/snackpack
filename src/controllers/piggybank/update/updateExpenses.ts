import connect from '../db/connect';
import UserModel from '../db/UserModel';

const updateExpenses = async (userEmail: string, expenses: any[]) => {
  // Connect to the Piggybank database
  await connect();

  // tslint:disable-next-line: await-promise
  const userData = await UserModel.findOne({ email: userEmail });
  userData.expenses = expenses;

  await userData.save();
};

export default updateExpenses;
