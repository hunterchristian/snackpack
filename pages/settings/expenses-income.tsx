import axios from 'axios';
import React, { useRef, useState } from 'react';
import { createForm } from '../../src/components/Form';
import { createInput } from '../../src/components/Form/Input';

const ExpensesIncome = ({ income, expenses }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const incomeInputRef = useRef(null);

  const handleExpenseChange = (index, key, event) =>
    (expenses[index][key] = event.target.value);

  const renderExpensesInputs = () =>
    expenses.map(({ name, value }, index) => (
      <div key={index} className='input-group'>
        <label>Name:</label>
        <input
          type='text'
          className='form-control'
          onChange={handleExpenseChange.bind(null, index, 'name')}
          placeholder={name}
        />
        <label>Amount:</label>
        <input
          type='text'
          className='form-control'
          onChange={handleExpenseChange.bind(null, index, 'value')}
          placeholder={value}
        />
      </div>
    ));

  const saveExpenses = async () => {
    await axios.post('/api/settings/expenses', expenses);
  };

  const handleIncomeSubmit = submitFormWithData =>
    submitFormWithData(incomeInputRef.current.value);

  const IncomeForm = createForm('/api/settings/income', {
    200: () => setSuccessMessage('Success!'),
  });
  const IncomeInput = createInput('Income', incomeInputRef);

  return (
    <>
      <IncomeForm
        onSubmit={handleIncomeSubmit}
        noValidate
        style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
      >
        <div style={{ display: 'flex' }}>
          <label>Monthly Net Income (after taxes):</label>
          <IncomeInput
            initialValue={
              incomeInputRef.current ? incomeInputRef.current.value : income
            }
            autofocus
          />
          <button type='submit'>Save</button>
        </div>
      </IncomeForm>
      {successMessage && (
        <span style={{ color: '#3b7553', fontWeight: 700 }}>
          {successMessage}
        </span>
      )}
      <hr style={{ width: '100%' }} />
      {renderExpensesInputs()}
      <button onClick={saveExpenses}>Save</button>
    </>
  );
};

ExpensesIncome.getInitialProps = async ctx => {
  let income;
  let expenses;
  if (typeof window !== 'undefined') {
    income = await axios.get('/api/settings/income');
    expenses = await axios.get('/api/settings/expenses');
  } else {
    const { getIncome, getExpenses } = await import(
      '../../src/controllers/piggybank/get'
    );
    income = await getIncome(ctx.req.session);
    expenses = await getExpenses(ctx.req.session);
  }

  return { income, expenses };
};

export default ExpensesIncome;
