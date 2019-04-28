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
    `gatsby-plugin-ramda`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-58105551-2',
      },
    },
  ],
}
