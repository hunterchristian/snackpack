import connect from '../db/connect';
import User from '../db/UserModel';

const updatePiggybankValue = async (
  userEmail: string,
  newPiggybankValue: number
) => {
  // Connect to the Piggybank database
  await connect();

  // tslint:disable-next-line: await-promise
  const userData = await User.findOne({ email: userEmail });
  userData.piggybankValue = newPiggybankValue;

  await userData.save();
};

export default updatePiggybankValue;
