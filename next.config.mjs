import nextra from 'nextra'
 
const withNextra = nextra({
  // Nextra 4.x uses a simplified configuration
  defaultShowCopyCode: true,
  readingTime: true,
  staticImage: true
})
 
// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra({
  // Make sure we properly handle MDX files
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  
  // Improve debugging
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 4,
  },
  
  // OpenNext will handle the worker/serverless aspects
  // Instead of static export, we'll use standard build
  // output mode with trailingSlash for better URL consistency
  trailingSlash: true,
  
  // Ensure images work in static export
  images: {
    unoptimized: true
  }
})