import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import { Direction, makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Zoom from '@material-ui/core/Zoom';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';

import TransactionsContext from '../contexts/TransactionsContext';
import TransactionsTable from './TransactionsTable';

interface TabPanelProps {
  children: JSX.Element | JSX.Element[];
  value: number;
  index: number;
  dir: Direction;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FullWidthTabs({ income, onDelete }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [rendered, setRendered] = React.useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <Fade in={rendered} timeout={500} style={{ transitionDelay: '300ms' }}>
        <div>
          <Zoom in={rendered} timeout={300}>
            <Box p={1}>
              <AppBar
                position='static'
                color='default'
                style={{ position: 'relative', bottom: '-150px' }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor='primary'
                  textColor='primary'
                  variant='fullWidth'
                  aria-label='full width tabs example'
                >
                  <Tab label='Day' {...a11yProps(0)} />
                  <Tab label='Week' {...a11yProps(1)} />
                  <Tab label='Month' {...a11yProps(2)} />
                </Tabs>
              </AppBar>
            </Box>
          </Zoom>
        </div>
      </Fade>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <TransactionsTable viewSlice='today' onDelete={onDelete} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TransactionsTable viewSlice='week' onDelete={onDelete} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <TransactionsTable viewSlice='month' onDelete={onDelete} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
