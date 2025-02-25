import type { Metadata } from 'next'
import { importPage } from 'nextra/pages'
import { useMDXComponents } from '../../../mdx-components'

// In Nextra 4, we need to handle generate params differently
export async function generateStaticParams() {
  // Return all project IDs for static generation
  return [
    { projectId: 'example-project' }
  ]
}

export async function generateMetadata(props): Promise<Metadata> {
  try {
    const params = await props.params
    const { metadata } = await importPage([`projects/${params.projectId}`])
    return metadata as Metadata
  } catch (error) {
    return { title: 'Project Not Found' }
  }
}

export default async function ProjectPage(props) {
  try {
    const params = await props.params
    const result = await importPage([`projects/${params.projectId}`])
    const { default: MDXContent, toc, metadata } = result
    
    const Wrapper = useMDXComponents().wrapper
    
    return (
      <div className="project-detail">
        <Wrapper toc={toc} meta={metadata}>
          <MDXContent {...props} params={params} />
        </Wrapper>
      </div>
    )
  } catch (error) {
    return (
      <div className="error-page">
        <h1>Project Not Found</h1>
        <p>The requested project could not be found.</p>
      </div>
    )
  }
}