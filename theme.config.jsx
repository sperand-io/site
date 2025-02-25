// Basic theme configuration file
export default {
  title: 'Chris Sperandio',
  description: 'Personal website and blog',
  darkMode: true,
  
  // Set default navigation links
  navs: [
    {
      url: '/posts',
      name: 'Posts'
    },
    {
      url: 'https://github.com/sperand-io',
      name: 'GitHub'
    },
    {
      url: 'https://twitter.com/sperand_io',
      name: 'Twitter'
    }
  ],
  
  // Footer configuration
  footer: {
    text: `${new Date().getFullYear()} © Christopher Sperandio`
  },
  
  // Default head tags
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="apple-mobile-web-app-title" content="Chris Sperandio" />
    </>
  ),
  
  // Directory configuraton
  docsRepositoryBase: 'https://github.com/sperand-io/site'
}