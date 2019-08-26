import React from 'react'
import { Head } from '../util/Head'
import { GlobalStyle } from '../util/GlobalStyle'
import { App } from '../components/App'
import { PageRendererProps } from 'gatsby'

export default ({ location }: PageRendererProps) => (
  <>
    <GlobalStyle />
    <Head />
    <App host={location.host} protocol={location.protocol} />
  </>
)
