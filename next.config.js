const webpack = require('webpack');
const nextSourceMaps = require('@zeit/next-source-maps')();

module.exports = nextSourceMaps({
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    ENCRYPTION_ALGO: process.env.ENCRYPTION_ALGO,
    ENCRYPTION_IV: process.env.ENCRYPTION_IV,
    ENCRYPTION_FORMAT: process.env.ENCRYPTION_FORMAT,
    PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID,
    PLAID_PUBLIC_KEY: process.env.PLAID_PUBLIC_KEY,
    PLAID_DEV_SECRET: process.env.PLAID_DEV_SECRET,
    PLAID_SANDBOX_SECRET: process.env.PLAID_SANDBOX_SECRET,
    REACT_EDITOR: process.env.REACT_EDITOR,
    NEXT_PUBLIC_PLAID_ENV: process.env.NEXT_PUBLIC_PLAID_ENV,
    MONGODB_URI: process.env.MONGODB_URI,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    SERVER_URL: process.env.SERVER_URL,
  },
  webpack: (config, { isServer, buildId }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.SENTRY_RELEASE': JSON.stringify(buildId),
      })
    );

    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
    }

    return config;
  },
});
