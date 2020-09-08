import { TokenResponse } from 'plaid';
import client from './client';

const exchangePublicToken = async (publicToken): Promise<TokenResponse> =>
  new Promise(resolve => {
    client.exchangePublicToken(publicToken, function (error, tokenResponse) {
      if (error) {
        throw error;
      }
      resolve(tokenResponse);
    });
  });

export default exchangePublicToken;
