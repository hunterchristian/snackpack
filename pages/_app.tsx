// https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js
// https://github.com/vercel/next.js/blob/canary/examples/with-sentry/pages/_app.js
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';

import DevPanel from '../src/components/DevPanel';
import PageLayout from '../src/components/PageLayout';
import SessionContext from '../src/contexts/SessionContext';
import theme from '../src/theme';
import { ModifiedWindow } from '../src/types/Global';
import sentry from '../src/utils/sentry';

const { Sentry, captureException } = sentry();

interface OwnProps {
  pageProps: any;
  session: any;
}
interface StateProps {
  hasError: boolean;
  errorEventId: string | undefined;
}

export default class MyApp extends App<OwnProps, {}, StateProps> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorEventId: undefined,
    };
  }

  componentDidMount = () => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    ((window as unknown) as ModifiedWindow).SAVED_PROPS = {
      session: this.props.session,
    };
  };

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    try {
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
    } catch (error) {
      // Capture errors that happen during a page's getInitialProps.
      // This will work on both client and server sides.
      const errorEventId = captureException(error, ctx);

      return {
        hasError: true,
        errorEventId,
        pageProps,
      };
    }

    const session =
      typeof window !== 'undefined'
        ? ((window as unknown) as ModifiedWindow).SAVED_PROPS.session
        : ctx.req.session;

    return { pageProps, session };
  }

  static getDerivedStateFromProps(props, state) {
    // If there was an error generated within getInitialProps, and we haven't
    // yet seen an error, we add it to this.state here
    return {
      hasError: props.hasError || state.hasError || false,
      errorEventId: props.errorEventId || state.errorEventId || undefined,
    };
  }

  static getDerivedStateFromError() {
    // React Error Boundary here allows us to set state flagging the error (and
    // later render a fallback UI).
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const errorEventId = captureException(error, { errorInfo });

    // Store the event id at this point as we don't have access to it within
    // `getDerivedStateFromError`.
    this.setState({ errorEventId });
  }

  render() {
    const { Component, pageProps, session } = this.props;

    return this.state.hasError ? (
      <section>
        <h1>There was an error!</h1>
        <p>
          <a
            href='#'
            onClick={() => {
              // TODO: Sentry.showReportDialog({ eventId: this.state.errorEventId })
            }}
          >
            📣 Report this error
          </a>
        </p>
        <p>
          <a
            href='#'
            onClick={() => {
              window.location.reload();
            }}
          >
            Or, try reloading the page
          </a>
        </p>
      </section>
    ) : (
      // Render the normal Next.js page
      <React.Fragment>
        <Head>
          <title>Piggybank</title>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap'
            rel='stylesheet'
          />
        </Head>
        <SessionContext.Provider value={session}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <PageLayout>
              <DevPanel env={process.env.NEXT_PUBLIC_PLAID_ENV} />
              <Component {...pageProps} />
            </PageLayout>
          </ThemeProvider>
        </SessionContext.Provider>
      </React.Fragment>
    );
  }
}
