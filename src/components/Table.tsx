import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Transaction } from 'plaid';
import React from 'react';

interface OwnProps {
  className: string;
  transactions: Transaction[];
}

export default function SimpleTable({ className, transactions }: OwnProps) {
  return (
    <TableContainer component={Paper} className={className}>
      <Table style={{ minWidth: '650px' }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '150px' }}>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(t => (
            <TableRow key={t.transaction_id}>
              <TableCell component='th' scope='row'>
                {t.date}
              </TableCell>
              <TableCell>{t.name}</TableCell>
              <TableCell align='right'>${t.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
