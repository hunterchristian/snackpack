import React, { useState } from 'react';

interface OwnProps {
  onChange(val: number): void;
}

export const IncomeForm = ({ onChange }: OwnProps) => {
  const [income, setIncome] = useState(0);

  return (
    <>
      <label htmlFor='income'>Income: </label>
      <input
        name='income'
        type='number'
        value={income}
        onChange={e => {
          if (e.target.value) {
            const val = parseInt(e.target.value, 10);
            setIncome(val);
            onChange(val);
          } else {
            setIncome(0);
          }
        }}
      />
    </>
  );
};
