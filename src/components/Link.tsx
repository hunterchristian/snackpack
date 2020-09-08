import axios from 'axios';
import { PlaidEnvironments } from 'plaid';
import React, { Component } from 'react';
import { PlaidLink } from 'react-plaid-link';
import sentry from '../../src/utils/sentry';

const { captureException } = sentry();

interface OwnProps {
  env: keyof PlaidEnvironments;
}

class Link extends Component<OwnProps> {
  handleOnSuccess = async (publicToken: string) => {
    // send token to client server
    let res;
    try {
      res = await axios.post('/api/auth/public_token', {
        public_token: publicToken,
      });
    } catch (err) {
      // Pass error to Sentry
      captureException(err, { res });
    }
  };

  handleOnExit = () => {
    // handle the case when your user exits Link
    // For the sake of this tutorial, we're not going to be doing anything here.
  };

  render() {
    return (
      <div>
        <PlaidLink
          clientName='React Plaid Setup'
          env={this.props.env as string}
          product={['auth', 'transactions']}
          // TODO: does this need to be hidden? Pass in as env var?
          publicKey='00205a9aae765fd1cd027b58ddda93'
          onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}
          className='test'
        >
          Open Link and connect your bank!
        </PlaidLink>
      </div>
    );
  }
}

export default Link;
