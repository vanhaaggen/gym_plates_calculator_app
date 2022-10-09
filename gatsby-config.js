/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Weight Plates Calulator",
    description:
      "Easy to use Weight Plates Calculator to never rack wrong again your bar",
    author: "Christian Haag",
  },

  plugins: [
    `gatsby-plugin-sass
    gatsby-plugin-preload-fonts`,
    `gatsby-plugin-preload-fonts`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-plugin-preload-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto`,
            variants: [`400`, `700`],
          },
          {
            family: `Open Sans`,
            variant: [`300`, `400`],
          },
        ],
      },
    },
  ],
}
