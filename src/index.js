import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';
import './index.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App';
import Dapp from './desktop/Dapp'
import * as serviceWorker from './serviceWorker';

const options = {
  // you can also just use 'bot,tom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '90px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

ReactDOM.render(
  <BrowserRouter>
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
