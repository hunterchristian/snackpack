import { getSession } from 'next-auth/client';
import { getIncome } from '../../../src/controllers/piggybank/get';
import { updateIncome } from '../../../src/controllers/piggybank/update';
import sentry from '../../../src/utils/sentry';

const { captureException } = sentry();

const handleGetIncome = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    const income = await getIncome(session);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(income);
  } else {
    // Not signed in
    console.error('Unauthorized call to GET /api/settings/income');
    res.status(401).send('Unauthorized');
  }
};

const handlePostIncome = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    await updateIncome(session.user.email, req.body as string);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send('OK');
  } else {
    // Not signed in
    console.error('Unauthorized call to POST /api/settings/income');
    res.status(401).send('Unauthorized');
  }
};

const incomeHandler = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET':
        await handleGetIncome(req, res);
        break;
      case 'POST':
        await handlePostIncome(req, res);
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

export default incomeHandler;
