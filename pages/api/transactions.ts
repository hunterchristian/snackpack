import moment from 'moment';
import { getSession } from 'next-auth/client';
import { Transaction } from 'plaid';
import {
  getLastCheckTransDate,
  getTransactions,
} from '../../src/controllers/piggybank/get';
import {
  updateDeletedTransactions,
  updateLastCheckTransDate,
  updatePiggybankValue,
} from '../../src/controllers/piggybank/update';
import { CompactedTransaction } from '../../src/types/Transactions';
import sentry from '../../src/utils/sentry';

const { captureException } = sentry();

const handleGetTransactions = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    const lastCheckTransDate = await getLastCheckTransDate(session);
    const transactions = await getTransactions(session, lastCheckTransDate);

    // log that the user checked their transactions
    // tslint:disable-next-line: no-floating-promises
    await updateLastCheckTransDate(
      session.user.email,
      moment().format('YYYY-MM-DD')
    );

    if (transactions.amountSavedSinceLastCheck !== 'null') {
      // tslint:disable-next-line: no-floating-promises
      await updatePiggybankValue(
        session.user.email,
        transactions.piggybankValue +
          parseFloat(transactions.amountSavedSinceLastCheck)
      );
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(transactions);
  } else {
    // Not signed in
    console.error('Unauthorized call to GET /api/transactions');
    res.status(401).send('Unauthorized');
  }
};

const handleDeleteTransactions = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    await updateDeletedTransactions(
      session.user.email,
      req.body.compactedTransactions as CompactedTransaction[]
    );
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send('OK');
  } else {
    // Not signed in
    console.error('Unauthorized call to DELETE /api/transactions');
    res.status(401).send('Unauthorized');
  }
};

const transactionsHandler = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET':
        await handleGetTransactions(req, res);
        break;
      case 'DELETE':
        await handleDeleteTransactions(req, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } catch (err) {
    // Pass error to Sentry
    captureException(err, { req, res });
  }
};

export default transactionsHandler;
