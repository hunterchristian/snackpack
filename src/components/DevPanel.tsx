import { Fade } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { AccountMenu } from './AccountMenu';
import PlaidLink from './Link';
import { SentryTest } from './SentryTest';
import DBUpdates from './DBUpdates';

interface OwnProps {
  env: string;
}

const RENDER_DELAY_MILLIS = 1000;

const styles = (
  <style jsx>{`
    .dev-panel-container {
      position: relative;
      z-index: 99999;
    }
    .dismiss {
      position: absolute;
      padding: 2px 5px;
      top: 0;
      right: 0;
      transition: background-color 0.2s ease-out;
    }
    .dismiss:hover {
      background-color: rgba(186, 11, 11, 0.75);
    }
    .toggle-panel {
      padding: 5px;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease-out;
      color: white;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px,
        inset rgba(0, 0, 0, 0.2) 0px -5px 20px;
    }
    .toggle-panel:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
    .dev-panel {
      position: fixed;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      top: 0;
      left: -271px;
      bottom: 0;
      background: rgba(51, 51, 51, 0.75);
      z-index: 9999;
      transition: left 0.2s ease-out;
      color: white;
    }
    .dev-panel.isRendered {
      left: -253px;
    }
    .dev-panel.isOpen {
      left: 0;
    }
    .dev-panel-body {
      display: flex;
      flex-direction: column;
      width: 250px;
    }
  `}</style>
);

// tslint:disable-next-line: cyclomatic-complexity
const DevPanel = ({ env }: OwnProps) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsRendered(true), RENDER_DELAY_MILLIS);
  }, []);

  return (
    <>
      {!isDismissed ? (
        <div
          className={`dev-panel${isOpen ? ' isOpen' : ''}${
            isRendered ? ' isRendered' : ''
          }`}
        >
          <Fade in={isRendered && isOpen} timeout={500}>
            <div className='dev-panel-body'>
              <span>
                <AccountMenu />
              </span>
              <span>
                <PlaidLink env={env} />
              </span>
              <span>
                <SentryTest />
              </span>
              <span>
                <DBUpdates />
              </span>
            </div>
          </Fade>
          <div className='toggle-panel' onClick={() => setIsOpen(!isOpen)}>
            <div className='dismiss' onClick={() => setIsDismissed(true)}>
              {'x'}
            </div>
            <div>{isOpen ? '<' : '>'}</div>
            <div>{isOpen ? '<' : '>'}</div>
            <div>{isOpen ? '<' : '>'}</div>
          </div>
          {styles}
        </div>
      ) : null}
    </>
  );
};

export default DevPanel;
