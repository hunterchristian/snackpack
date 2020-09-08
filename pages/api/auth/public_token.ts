import receivePublicToken from '../../../src/controllers/plaid/receivePublicToken';
import sentry from '../../../src/utils/sentry';

const { captureException } = sentry();

const publicTokenHandler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      // Pass request to handler
      try {
        await receivePublicToken(req, res);
      } catch (err) {
        // Pass error to Sentry
        captureException(err, { req, res });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};

export default publicTokenHandler;
