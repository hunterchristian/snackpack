import connect from '../db/connect';
import UserModel from '../db/UserModel';

const updateIncome = async (userEmail: string, income: string) => {
  // Connect to the Piggybank database
  await connect();

  // tslint:disable-next-line: await-promise
  const userData = await UserModel.findOne({ email: userEmail });

  try {
    userData.income = parseInt(income, 10);
  } catch (err) {
    console.error(
      `Failed parsing income in controller.ts:updateIncome - ${err.message}`
    );
    throw err;
  }

  await userData.save();
};

export default updateIncome;
