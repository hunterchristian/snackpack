import { makeStyles } from '@material-ui/core';
import FlipNumber from './FlipNumber';
import Pig from './svgs/Pig';

interface OwnProps {
  value: number;
}

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '75px',
    },
  },
  pig: {
    width: '20em',
    height: '18em',
    [theme.breakpoints.down('sm')]: {
      width: '10em',
      height: '9em',
    },
  },
  flipNumberContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipNumber: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px',
    },
  },
}));

const Piggybank = ({ value }: OwnProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ position: 'relative' }}>
      <Pig
        className={classes.pig}
        style={{
          fill: value >= 0 ? '#eff3f1' : '#fff1f1',
        }}
      />
      <div className={classes.flipNumberContainer}>
        <FlipNumber initialValue={value} className={classes.flipNumber} />
      </div>
    </div>
  );
};

export default Piggybank;
