import { css } from '@emotion/core';
import { makeStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { captureException } from '@sentry/node';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { Transaction } from 'plaid';
import React, { useEffect, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import Piggybank from '../src/components/Piggybank';
import TransactionsTable from '../src/components/TransactionsTable';
import TransactionsTabs from '../src/components/TransactionsTabs';
import TransactionsContext from '../src/contexts/TransactionsContext';
import { getIncome } from '../src/controllers/piggybank/get';
import { filterDeletedTransactions } from '../src/formatters/formatTransactionResponse/filters';
import {
  sumMonthBudget,
  sumTodayBudget,
  sumWeekBudget,
} from '../src/formatters/formatTransactionResponse/sums';
import {
  CompactedTransaction,
  TransactionsAPIResponse,
} from '../src/types/Transactions';

const useStyles = makeStyles(() => ({
  container: { justifyContent: 'center' },
  transactions: {},
}));

const override = css``;

// tslint:disable-next-line: cyclomatic-complexity
function Home({ income }) {
  const [
    transactions,
    setTransactions,
  ] = useState<TransactionsAPIResponse | null>(null);
  const classes = useStyles();
  useEffect(() => {
    // TODO: handle error state from server and display to user
    // tslint:disable-next-line: no-floating-promises
    axios.get('/api/transactions').then(res => setTransactions(res.data));
  }, []);

  const deleteTransactions = async (deletedTransactions: Transaction[]) => {
    const filteredToday = filterDeletedTransactions(
      transactions.today.items,
      deletedTransactions
    );
    const filteredWeek = filterDeletedTransactions(
      transactions.week.items,
      deletedTransactions
    );
    const filteredMonth = filterDeletedTransactions(
      transactions.month.items,
      deletedTransactions
    );
    const newTransactions = {
      today: {
        items: filteredToday,
        budget: sumTodayBudget(filteredToday, income),
      },
      week: {
        items: filteredWeek,
        budget: sumWeekBudget(filteredWeek, income),
      },
      month: {
        items: filteredMonth,
        budget: sumMonthBudget(filteredMonth, income),
      },
      amountSavedSinceLastCheck: transactions.amountSavedSinceLastCheck,
      piggybankValue: transactions.piggybankValue,
    };
    setTransactions(newTransactions);

    try {
      await axios.delete('/api/transactions', {
        data: {
          compactedTransactions: deletedTransactions.map(
            ({ transaction_id }): CompactedTransaction => ({ transaction_id })
          ),
        },
      });
    } catch (err) {
      captureException(err);
      throw err;
    }
  };

  return (
    <TransactionsContext.Provider value={transactions}>
      <Grid container className={classes.container}>
        <Grid item xs={12} md={6} className={classes.transactions}>
          {transactions ? (
            <TransactionsTabs income={income} onDelete={deleteTransactions} />
          ) : (
            <BeatLoader css={override} size={30} color='#dde3da' />
          )}
        </Grid>
      </Grid>
    </TransactionsContext.Provider>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getSession(ctx);
  const income = await getIncome(session);

  return { props: { income } };
};

export default Home;
