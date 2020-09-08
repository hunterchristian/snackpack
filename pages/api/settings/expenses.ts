import { getSession } from 'next-auth/client';
import { getExpenses } from '../../../src/controllers/piggybank/get';
import { updateExpenses } from '../../../src/controllers/piggybank/update';
import sentry from '../../../src/utils/sentry';

const { captureException } = sentry();

const handleGetExpenses = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    const expenses = await getExpenses(session);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(expenses);
  } else {
    // Not signed in
    console.error('Unauthorized call to GET /api/settings/expenses');
    res.status(401).send('Unauthorized');
  }
};

const handlePostExpenses = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    await updateExpenses(session.user.email, req.body);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send('OK');
  } else {
    // Not signed in
    console.error('Unauthorized call to POST /api/settings/expenses');
    res.status(401).send('Unauthorized');
  }
};

const expensesHandler = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET':
        await handleGetExpenses(req, res);
        break;
      case 'POST':
        await handlePostExpenses(req, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } catch (err) {
    // Pass error to Sentry
    captureException(err, { req, res });
  }
};

export default expensesHandler;
