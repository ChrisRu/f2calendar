import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { createGlobalStyle } from 'styled-components';
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

ReactGA.initialize('UA-58105551-2');
ReactGA.pageview(window.location.pathname + window.location.search);
