import sumExpenses from '../../../src/formatters/formatTransactionResponse/sums/sumExpenses';

test('sumExpenses: should sum expenses', () => {
  const expenses = [
    { name: 'foo', value: '10.25' },
    { name: 'foo', value: '15.25' },
    { name: 'foo', value: '20.25' },
  ];
  expect(sumExpenses(expenses)).toBe(45.75);
});
