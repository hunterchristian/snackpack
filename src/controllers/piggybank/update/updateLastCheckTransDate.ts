import connect from '../db/connect';
import User from '../db/UserModel';

const updateLastCheckTransDate = async (userEmail: string, date: string) => {
  // Connect to the Piggybank database
  await connect();

  // tslint:disable-next-line: await-promise
  const userData = await User.findOne({ email: userEmail });
  userData.lastCheckTransDate = date;

  await userData.save();
};

export default updateLastCheckTransDate;
