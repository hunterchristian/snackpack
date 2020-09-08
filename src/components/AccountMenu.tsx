import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import { signout } from 'next-auth/client';
import Router from 'next/router';
import React, { useContext } from 'react';
import SessionContext from '../contexts/SessionContext';

const useStyles = makeStyles(theme => ({
  menuItemLink: {
    textDecorationLine: 'none',
    color: 'inherit',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export const AccountMenu = () => {
  const classes = useStyles();
  const session = useContext(SessionContext);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(wasPrevOpen => !wasPrevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleNavigate = (event, route) => {
    handleClose(event);
    // tslint:disable-next-line: no-floating-promises
    Router.push(route);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current && !open) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      {!session && (
        <div>
          Not signed in <br />
          <a href='/api/auth/signin'>Sign in</a>
        </div>
      )}
      {session && (
        <>
          <div>
            <span style={{ fontWeight: 500 }}>
              {session.user.name.split(' ')[0]}
            </span>
            <IconButton
              aria-label='account of current user'
              color='inherit'
              style={{ margin: '0 12px' }}
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup='true'
              onClick={handleToggle}
            >
              <Avatar alt={session.user.name} src={session.user.image}>
                {session.user.name[0]}
              </Avatar>
            </IconButton>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id='menu-list-grow'
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          onClick={event =>
                            handleNavigate(event, '/settings/expenses-income')
                          }
                        >
                          Expenses
                        </MenuItem>
                        <MenuItem
                          onClick={event =>
                            handleNavigate(event, '/settings/expenses-income')
                          }
                        >
                          Income
                        </MenuItem>
                        <MenuItem onClick={signout}>Sign out</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </>
      )}
    </div>
  );
};
