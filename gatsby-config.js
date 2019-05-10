module.exports = {
  siteMetadata: {
    name: `Formula 2 Calendar`,
    tagline: `Keep track of when your (second) favorite racing series is live`,
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
        name: `logos`,
        path: `${__dirname}/static/images/logos`,
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-58105551-2',
      },
    },
  ],
}
