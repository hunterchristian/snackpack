// tslint:disable-next-line: no-import-side-effect
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Page from '../../pages';
import mockTransactionsResponse from '../__mocks__/api/transactions';
import wait from '../__utils__/wait';

const MOCK_NET_MONTHLY_INCOME = 6500;
const BUDGET_DISPLAY_DELAY_MILLIS = 2500;

const server = setupServer(
  rest.get('/api/transactions', (req, res, ctx) =>
    res(ctx.json(mockTransactionsResponse))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays a list of transactions with a calculated budget', async () => {
  render(<Page income={MOCK_NET_MONTHLY_INCOME} />);

  await waitFor(() => screen.getByText('Transactions'));
  expect(screen.getByRole('tabpanel')).toHaveTextContent(
    'QUADMED, INC. #...0055'
  );

  expect(screen.getByTestId('budget-display')).toHaveTextContent('$-38.45');
});

// TODO: handle error status from server
