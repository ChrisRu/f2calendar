import React from 'react'
import { Helmet } from 'react-helmet'

export function Head() {
  return (
    <Helmet>
      <meta name="description" content="Keep track of when FIA Formula 2 races are live" />
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
      <meta property="og:description" content="Keep track of when FIA Formula 2 races are live" />
      <meta property="og:image" content="https://f2calendar.com/images/og-image.png" />
      <title>2019 F2 Calendar</title>
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Red+Hat+Display:400,600&display=swap"
      />
    </Helmet>
  )
}
