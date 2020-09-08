import connect from '../db/connect';
import getUserInfo from './getUserInfo';

const getLastCheckTransDate = async session => {
  // Connect to the Piggybank database
  await connect();
  const userInfo = await getUserInfo(session);

  return userInfo.lastCheckTransDate;
};

export default getLastCheckTransDate;
