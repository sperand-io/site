import Link from 'next/link'
import { getPosts, getTags } from '../../posts/get-posts'
import { getProjects, getTags as getProjectTags } from '../../projects/get-projects'

export async function generateMetadata(props) {
  const params = await props.params
  return {
    title: `Posts and Projects Tagged with "${decodeURIComponent(params.tag)}"`
  }
}

export async function generateStaticParams() {
  const allTags = await getTags()
  const allProjectTags = await getProjectTags()
  return [...new Set([...allTags, ...allProjectTags])].map(tag => ({ tag }))
}

export default async function TagPage(props) {
  const params = await props.params
  const { title } = await generateMetadata({ params })
  const posts = await getPosts()
  const projects = await getProjects()
  const filteredPosts = posts.filter(post => {
    const tags = post.frontMatter?.tags || []
    return tags.includes(decodeURIComponent(params.tag))
  })
  const filteredProjects = projects.filter(project => {
    const tags = project.frontMatter?.tags || []
    return tags.includes(decodeURIComponent(params.tag))
  })

  return (
    <div className="tag-page">
      <h1>{title}</h1>
      
      <h2>Posts</h2>
      <Link href="/posts" className="back-link">All Posts</Link>
      <div className="posts-list">
        {filteredPosts.map(post => (
          <div key={post.route} className="post-item">
            <h2 className="post-title">
              <Link href={post.route}>{post.frontMatter?.title || post.name}</Link>
            </h2>
            <div className="post-meta">
              {post.frontMatter?.date && (
                <time dateTime={new Date(post.frontMatter.date).toISOString()}>
                  {new Date(post.frontMatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
            </div>
            {post.frontMatter?.description && (
              <p className="post-description">{post.frontMatter.description}</p>
            )}
          </div>
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
        <p className="no-posts">No posts found with this tag.</p>
      )}

      <h2>Projects</h2>
      <Link href="/projects" className="back-link">All Projects</Link>
      <div className="projects-list">
        {filteredProjects.map(project => (
          <div key={project.route} className="project-item">
            <h2 className="project-title">
              <Link href={project.route}>{project.frontMatter?.title || project.name}</Link>
            </h2>
            <div className="project-meta">
              {project.frontMatter?.date && (
                <time dateTime={new Date(project.frontMatter.date).toISOString()}>
                  {new Date(project.frontMatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
            </div>
            {project.frontMatter?.description && (
              <p className="project-description">{project.frontMatter.description}</p>
            )}
          </div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <p className="no-projects">No projects found with this tag.</p>
      )}
    </div>
  )
}