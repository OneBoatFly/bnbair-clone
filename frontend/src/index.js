import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';

import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';

import {ModalProvider} from './context/Modal';
import {ModalWholeProvider} from './context/ModalWhole';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ReactGA from 'react-ga4';

const store = configureStore();
ReactGA.initialize('G-0686J16687');

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  // console.log('*** Root rendered ***')
  // console.log('Root: ', store.getState())
  return (
    <ReduxProvider store={store}>
      <ModalProvider>
        <ModalWholeProvider>
          <BrowserRouter>
            <ScrollToTop />
            <App />
          </BrowserRouter>
        </ModalWholeProvider>
      </ModalProvider>
    </ReduxProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
