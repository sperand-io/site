import Link from 'next/link'
import { getPosts } from '../posts/get-posts'
import { GlobTool } from '../utils/glob-tool'

export async function CTAChecker() {
  // Check if we have posts
  const posts = await getPosts()
  const hasPosts = posts?.length > 0
  
  // Check if we have projects
  const projectFiles = await GlobTool('/content/projects/**/*.mdx')
  const hasProjects = projectFiles?.length > 0
  
  return (
    <div className="cta-container">
      {hasPosts && <Link href="/posts" className="cta-link">Read my writing</Link>}
      {hasProjects && <Link href="/projects" className="cta-link">Browse my projects</Link>}
    </div>
  )
}

// Client-side fallback that only shows posts link (known to exist)
export function CTAFallback() {
  return (
    <div className="cta-container">
      <Link href="/posts" className="cta-link">Browse my writing</Link>
    </div>
  )
}