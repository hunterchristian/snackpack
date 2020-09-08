import React, { useState } from 'react';

const handleFormSubmit = async (url, handlers, setErrorMessage, data) => {
  if (handlers.onBeforeSubmit) {
    handlers.onBeforeSubmit();
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (handlers[response.status]) {
      handlers[response.status](setErrorMessage, response);
    } else {
      handlers.onUnhandledStatus(response, url);
    }
  } catch (error) {
    handlers.onUnexpectedError(error);
  }
};

export const createForm = (url, theirResponseHandlers) => props => {
  const [errorMessage, setErrorMessage] = useState('');
  const responseHandlers = {
    onBeforeSubmit: () => {
      setErrorMessage('');
    },
    onUnhandledStatus: response => {
      setErrorMessage(`${response.status} ${response.statusText} - ${url}`);
      console.error(
        `Handler not found for response status: ${response.status}`
      );
    },
    onUnexpectedError: error => {
      setErrorMessage(error.message ? error.message : error);
      console.error(`Unexpected error occured: ${error.message}`);
    },
    404: () => {
      setErrorMessage(`404 not found - ${url}`);
    },
    500: () => {
      setErrorMessage('Internal server error');
    },
    ...theirResponseHandlers,
  };
  const theirOnSubmit = props.onSubmit;
  const onSubmit = e => {
    e.preventDefault();
    theirOnSubmit(
      handleFormSubmit.bind(null, url, responseHandlers, setErrorMessage)
    );
  };
  const formChildren = props.children;
  const formProps = { ...props, onSubmit };
  delete formProps.children;

  return (
    <form className='form' {...formProps}>
      {formChildren}
      {errorMessage && <p className='error'>Error: {errorMessage}</p>}
    </form>
  );
};
