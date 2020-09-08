import connect from '../db/connect';
import getUserInfo from './getUserInfo';

const getExpenses = async session => {
  // Connect to the Piggybank database
  await connect();
  const userInfo = await getUserInfo(session);

  return userInfo.expenses;
};

export default getExpenses;
