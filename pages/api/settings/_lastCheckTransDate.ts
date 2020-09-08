import { getSession } from 'next-auth/client';

import { updateLastCheckTransDate } from '../../../src/controllers/piggybank/update';
import sentry from '../../../src/utils/sentry';

const { captureException } = sentry();

const lastCheckTransDateHandler = async (req, res) => {
  try {
    switch (req.method) {
      case 'POST':
        const session = await getSession({ req });
        if (session) {
          await updateLastCheckTransDate(session.user.email, req.body.date);
          res.status(200).send('OK');
        } else {
          // Not signed in
          console.error(
            'Unauthorized call to GET /api/settings/_lastCheckTransDate'
          );
          res.status(401).send('Unauthorized');
        }
        break;
      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } catch (err) {
    // Pass error to Sentry
    captureException(err, { req, res });
  }
};

export default lastCheckTransDateHandler;
