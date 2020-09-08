import { getSession } from 'next-auth/client';
import { TokenResponse } from 'plaid';
import { encrypt } from '../../../utils/encryption';
import connect from '../db/connect';
import UserModel from '../db/UserModel';

const updatePublicToken = async (
  req,
  { access_token, item_id }: TokenResponse
) => {
  // Connect to the Piggybank database
  await connect();

  const session = await getSession({ req });
  // tslint:disable-next-line: await-promise
  const userData = await UserModel.findOne({ email: session.user.email });
  if (!userData) {
    await UserModel.create({
      email: session.user.email,
      items: [{ access_token: encrypt(access_token), item_id }],
    });

    return;
  }

  // tslint:disable-next-line: await-promise
  await UserModel.update(
    { email: session.user.email },
    {
      items: [
        ...userData.items,
        { access_token: encrypt(access_token), item_id },
      ],
    },
    { new: true, overwrite: false }
  );
};

export default updatePublicToken;
