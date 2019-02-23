import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import * as serviceWorker from './serviceWorker';
import { App } from './components/App';
import { NodeModule } from './lib/module';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'IBM Plex Sans';
    margin: 0;
    background: #F9F9F9;
  }
`;

function render() {
  ReactDOM.render(
    <>
      <GlobalStyle />
      <App />
    </>,
    document.getElementById('root')
  );
}

declare const module: NodeModule;
if (module.hot) {
  module.hot.accept(['./components/App'], render);
}

render();

serviceWorker.unregister();
