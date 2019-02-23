import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import * as serviceWorker from './serviceWorker';
import { App } from './components/App';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'IBM Plex Sans';
    margin: 0;
    background: #F9F9F9;
  }
`;

ReactDOM.render(
  <>
    <App />
    <GlobalStyle />
  </>,
  document.getElementById('root')
);

serviceWorker.unregister();
