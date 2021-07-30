module.exports = {
  siteMetadata: {
    siteUrl: process.env.URL,
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "@chakra-ui/gatsby-plugin",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Gatsby Netlify Form Starter | Courier",
        short_name: "Gatsby Netlify Form Starter",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#9121C2",
        display: "standalone",
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-plugin-prettier-eslint",
      options: {
        prettier: {
          patterns: [
            // the pattern "**/*.{js,jsx,ts,tsx}" is not used because we will rely on `eslint --fix`
            "**/*.{css,scss,less}",
            "**/*.{json,json5}",
            "**/*.{graphql}",
            "**/*.{md,mdx}",
            "**/*.{html}",
            "**/*.{yaml,yml}",
          ],
        },
        eslint: {
          patterns: "**/*.{js,jsx,ts,tsx}",
          customOptions: {
            fix: true,
            cache: true,
          },
        },
      },
    },
  ],
};
