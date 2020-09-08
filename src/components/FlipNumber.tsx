import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import debounce from 'lodash.debounce';
import React from 'react';

interface OwnProps {
  initialValue: number;
  destinationValue?: number;
  style?: any;
  className?: string;
  testId?: string;
}
interface StateProps {
  value: number;
  rendered: boolean;
  showBudget: boolean;
}

const DISPLAY_BUDGET_DELAY_MILLIS = 1500;

export default class FlipNumber extends React.Component<OwnProps, StateProps> {
  updateDisplayOnInterval: (newVal: number, oldVal: number) => void = debounce(
    (newVal, oldVal) => {
      const diff = newVal - oldVal;
      const NUM_ITERATIONS = 250;
      let counter = 0;
      const id = setInterval(() => {
        this.setState({ value: this.state.value + diff / NUM_ITERATIONS });
        counter += 1;
        if (counter === NUM_ITERATIONS) {
          clearInterval(id);
        }
      }, 1);
    },
    1000,
    {
      leading: true,
    }
  );
  constructor(props: OwnProps) {
    super(props);
    this.state = {
      value: props.initialValue - 50,
      rendered: false,
      showBudget: true,
    };
  }

  componentDidMount() {
    this.setState({ rendered: true });
    // setTimeout(() => {
    //   if (this.state.rendered) {
    //     this.updateDisplayOnInterval(this.props.initialValue, this.state.value);
    //     this.setState({ showBudget: true });
    //   }
    // }, DISPLAY_BUDGET_DELAY_MILLIS);
  }

  componentWillUnmount() {
    this.setState({ rendered: false });
  }

  UNSAFE_componentWillReceiveProps(nextProps: OwnProps) {
    const oldVal = this.props.initialValue;
    const newVal = nextProps.initialValue;
    if (newVal !== oldVal) {
      this.updateDisplayOnInterval(newVal, oldVal);
    }
  }

  getDisplayColor() {
    const { showBudget, value } = this.state;
    let color;
    // tslint:disable-next-line: prefer-conditional-expression
    if (!showBudget) {
      color = '#dde3da';
    } else if (value < 0) {
      color = '#ff5959';
    } else if (value >= 0) {
      color = '#3b7553';
    }

    return color;
  }

  render() {
    return (
      <Fade
        in={this.state.rendered}
        timeout={500}
        style={{ transitionDelay: '100ms', ...(this.props.style || {}) }}
      >
        <div>
          <Zoom in={this.state.rendered} timeout={300}>
            <Typography
              data-testid={this.props.testId}
              className={this.props.className}
              style={{
                color: this.getDisplayColor(),
                transform: this.state.showBudget ? 'none' : 'scale(0.8)',
                ...this.props.style,
              }}
              variant='h2'
              gutterBottom
            >
              {`$${this.state.value && this.state.value.toFixed(2)}`}
            </Typography>
          </Zoom>
        </div>
      </Fade>
    );
  }
}
