import connect from '../db/connect';
import User from '../db/UserModel';

const getUserInfo = async ({ user: { email } }) => {
  // Connect to the Piggybank database
  await connect();

  // tslint:disable-next-line: await-promise
  const userInfo = await User.findOne({ email });
  if (!userInfo) {
    throw new Error(`No user returned for email: ${email}`);
  }

  return userInfo;
};

export default getUserInfo;
