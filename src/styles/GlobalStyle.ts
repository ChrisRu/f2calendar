import { createGlobalStyle } from 'styled-components'
import normalize from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
    font-size: 112.5%;
    line-height: 1.45em;
  }

  body {
    font-family: 'Red Hat Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: rgba(0, 0, 0, 0.8);
    margin: 0;
    font-kerning: normal;
    font-feature-settings: 'kern', 'liga', 'clig', 'calt';
    word-wrap: break-word;
    background: #F9F9F9;
  }
`
