import Link from 'next/link'
import { getPosts } from '../posts/get-posts'
import { getProjects } from '../projects/get-projects'

export async function CTAChecker() {
  // Check if we have posts
  const posts = await getPosts()
  const hasPosts = posts?.length > 0
  
  // Check if we have projects
  const projects = await getProjects()
  console.log('cta',projects)
  const hasProjects = projects?.length > 0
  
  return (
    <div className="cta-container">
      {hasPosts && <Link href="/posts" className="cta-link">Read my writing</Link>}
      {hasProjects && <Link href="/projects" className="cta-link">Browse my projects</Link>}
    </div>
  )
}