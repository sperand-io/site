import type { Metadata } from 'next'
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')
 
export async function generateMetadata(props): Promise<Metadata> {
  try {
    const params = await props.params
    if (!params.mdxPath) {
      return { title: 'Chris Sperandio' }
    }
    const { metadata } = await importPage(params.mdxPath)
    return metadata as Metadata
  } catch (error) {
    // Return default metadata if page not found
    return { title: 'Chris Sperandio' }
  }
}
 
const Wrapper = useMDXComponents().wrapper
 
export default async function Page(props) {
  try {
    const params = await props.params
    
    // Handle special paths
    if (Array.isArray(params.mdxPath) && params.mdxPath.includes('favicon.ico')) {
      return null;
    }
    
    // Important: Handle root path but don't return null
    // Set empty array for root path to properly load index.mdx
    if (!params.mdxPath) {
      params.mdxPath = [];
    }
    
    const result = await importPage(params.mdxPath)
    const { default: MDXContent, toc, metadata } = result
  
  // Check if this is the home page (empty mdxPath or just index)
  const isHomePage = !params.mdxPath || 
                     params.mdxPath.length === 0 || 
                     (params.mdxPath.length === 1 && params.mdxPath[0] === 'index');

  const isProjectPage = params.mdxPath.includes('projects')
  
  // For the home page, completely remove the title property to prevent the underline
  // This prevents any title-related rendering in the wrapper
  return (
    <Wrapper toc={toc} meta={isHomePage ? 
      (({ title, ...rest }) => rest)(metadata) : 
      metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
  } catch (error) {
    // Handle errors gracefully
    console.error('Error rendering page:', error);
    return (
      <div className="error-page">
        <h1>Page not found</h1>
        <p>The requested content could not be found.</p>
      </div>
    );
  }
}