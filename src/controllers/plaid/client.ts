import Plaid from 'plaid';
import { PLAID_SECRET } from '../../utils/secrets';

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY;
const PLAID_ENV = process.env.NEXT_PUBLIC_PLAID_ENV;

// Initialize the Plaid client
const client = new Plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  Plaid.environments[PLAID_ENV],
  { version: '2019-05-29', clientApp: 'Piggybank' }
);

export default client;
