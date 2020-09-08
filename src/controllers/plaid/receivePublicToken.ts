import { exchangePublicToken } from '.';
import updatePublicToken from '../piggybank/update/updatePublicToken';

const receivePublicToken = async (req, res) => {
  // First, receive the public token and set it to a variable
  const publicToken = req.body.public_token;
  // Second, exchange the public token for an access token
  const tokenResponse = await exchangePublicToken(publicToken);
  // Store public token in Piggybank DB
  await updatePublicToken(req, tokenResponse);

  res.status(200).send('OK');
};

export default receivePublicToken;
