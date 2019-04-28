import React from 'react'
import { Head } from '../util/Head'
import { GlobalStyle } from '../util/GlobalStyle'
import { App } from '../components/App'

export default () => (
  <div>
    <GlobalStyle />
    <Head />
    <App />
  </div>
)
