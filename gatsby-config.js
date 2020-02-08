const config = {
  siteMetadata: {
    name: `Formula 2 Calendar`,
    tagline: `Keep track of when FIA Formula 2 is live`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-netlify`,
    `gatsby-transformer-ics`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `thumbnail`,
        path: `${__dirname}/static/images/backgrounds/thumbnail`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `flags`,
        path: `${__dirname}/static/images/flags`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `calendars`,
        path: `${__dirname}/static/calendars/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Formula 2 Calendar`,
        short_name: `F2 Calendar`,
        start_url: `/`,
        background_color: `#1f4c86`,
        theme_color: `#1f4c86`,
        display: `minimal-ui`,
        icon: `static/images/f2-logo.png`,
      },
    },
  ],
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: 'UA-58105551-2',
      anonymize: true,
    },
  })
}

module.exports = config
