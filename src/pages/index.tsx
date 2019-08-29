import React from 'react'
import { PageRendererProps } from 'gatsby'
import { Head } from '../components/Head'
import { GlobalStyle } from '../styles/GlobalStyle'
import { App } from '../components/App'

export default ({ location }: PageRendererProps) => (
  <>
    <Head />
    <GlobalStyle />
    <App location={location} />
  </>
)
