// Nextra 4.x blog configuration
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
  }
}