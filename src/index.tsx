import React from 'react';
import { render, hydrate } from 'react-dom';
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

function renderApp() {
  const rootElement = document.getElementById('root') as HTMLElement;

  if (rootElement.hasChildNodes()) {
    hydrate(
      <>
        <GlobalStyle />
        <App />
      </>,
      rootElement
    );
  } else {
    render(
      <>
        <GlobalStyle />
        <App />
      </>,
      rootElement
    );
  }
}

declare const module: NodeModule;
if (module.hot) {
  module.hot.accept(['./components/App'], renderApp);
}

renderApp();

ReactGA.initialize('UA-58105551-2');
ReactGA.pageview(window.location.pathname + window.location.search);
