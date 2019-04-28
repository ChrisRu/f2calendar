import React from 'react'
import { Helmet } from 'react-helmet'

export const Head = () => (
  <Helmet>
    <meta
      name="description"
      content="Keep track of when your (second) favorite racing series is live"
    />
    <meta name="author" content="Christian Ruigrok" />
    <meta name="theme-color" content="#000000" />
    <meta name="twitter:card" content="app" />
    <meta name="twitter:text:title" content="Formula 2 Calendar" />
    <meta name="twitter:site" content="https://f2calendar.com" />
    <meta name="twitter:creator" content="@CRuigrok" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="F2Calendar" />
    <meta property="og:title" content="Formula 2 Calendar" />
    <meta
      property="og:description"
      content="Keep track of when your (second) favorite racing series is live"
    />
    <title>F2 Calendar</title>
    <link rel="shortcut icon" href="/favicon.png" />
    <link rel="manifest" href="/manifest.json" />
    <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,700" rel="stylesheet" />
  </Helmet>
)
