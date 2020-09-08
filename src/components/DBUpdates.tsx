import axios from 'axios';
import React from 'react';

const submitLCDTForm = e => {
  e.preventDefault();
  const lcdtVal = document.getElementById('lctd').value;
  // tslint:disable-next-line: no-floating-promises
  axios.post('/api/settings/_lastCheckTransDate', { date: lcdtVal });
};

const submitPValForm = e => {
  e.preventDefault();
  const pVal = document.getElementById('pVal').value;
  // tslint:disable-next-line: no-floating-promises
  axios.post('/api/settings/_piggybankValue', { value: pVal });
};

const DBUpdates = () => (
  <div>
    <form onSubmit={submitLCDTForm}>
      <label>lctd: </label>
      <input id='lctd' placeholder='YYYY-MM-DD' style={{ width: '100px' }} />
      <button type='submit'>Save</button>
    </form>
    <form onSubmit={submitPValForm}>
      <label>pVal: </label>
      <input id='pVal' placeholder='0.00' style={{ width: '100px' }} />
      <button type='submit'>Save</button>
    </form>
  </div>
);

export default DBUpdates;
