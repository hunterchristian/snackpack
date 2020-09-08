import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React from 'react';
import { AccountMenu } from './AccountMenu';
import Logo from './svgs/Logo';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  },
  logo: {
    marginRight: theme.spacing(2),
    width: '1.5em',
    height: '1.5em',
    cursor: 'pointer',
  },
  title: {
    flexGrow: 1,
    color: 'inherit',
    textDecorationLine: 'none',
    cursor: 'pointer',
  },
  appBar: {
    color: theme.palette.primary.main,
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Container maxWidth='md'>
          <Toolbar>
            <Logo
              style={{
                width: '1.5em',
                height: '1.5em',
                position: 'relative',
                top: '-2px',
              }}
            />
            <Link href='/'>
              <Typography variant='h6' className={classes.title}>
                AvoSmash
              </Typography>
            </Link>
            <AccountMenu />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
