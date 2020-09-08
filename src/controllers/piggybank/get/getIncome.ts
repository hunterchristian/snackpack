import connect from '../db/connect';
import getUserInfo from './getUserInfo';

const getIncome = async session => {
  // Connect to the Piggybank database
  await connect();
  const userInfo = await getUserInfo(session);

  return userInfo.income;
};

export default getIncome;
