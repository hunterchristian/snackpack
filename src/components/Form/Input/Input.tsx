import React, { forwardRef, RefObject, useState } from 'react';

interface OwnProps {
  classes: string;
  initialValue: string;
}

const Input = forwardRef(
  (props: OwnProps, ref: RefObject<HTMLInputElement>) => {
    const { classes } = props;
    const [value, setValue] = useState(props.initialValue || '');

    return (
      <div className='control'>
        <input
          className={`input is-medium${classes ? ' ' + classes : ''}`}
          {...props}
          ref={ref}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
    );
  }
);

export default Input;

export const createInput = (name, ref) => props => (
  <Input
    id={name.toLowerCase()}
    label={name}
    name={name.toLowerCase()}
    placeholder={name}
    autoComplete='off'
    required
    {...props}
    ref={ref}
  />
);
