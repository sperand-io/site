import Link from 'next/link'
import { getProjects, getTechnologies } from '../../projects/get-projects'

export async function generateMetadata(props) {
  const params = await props.params
  return {
    title: `Projects Using "${decodeURIComponent(params.technology)}"`
  }
}

export async function generateStaticParams() {
  const allTechnologies = await getTechnologies()
  return [...new Set(allTechnologies)].map(technology => ({ technology }))
}

export default async function TechnologyPage(props) {
  const params = await props.params
  const { title } = await generateMetadata({ params })
  const projects = await getProjects()
  const filteredProjects = projects.filter(project => {
    const technologies = project.frontMatter?.technologies || []
    return technologies.includes(decodeURIComponent(params.technology))
  })

  return (
    <div className="tag-page">
      <h1>{title}</h1>
      <Link href="/projects" className="back-link">All Projects</Link>
      
      <div className="posts-list">
        {filteredProjects.map(project => (
          <div key={project.route} className="post-item">
            <h2 className="post-title">
              <Link href={project.route}>{project.frontMatter?.title || project.name}</Link>
            </h2>
            <div className="post-meta">
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
              <p className="post-description">{project.frontMatter.description}</p>
            )}
          </div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <p className="no-posts">No projects found with this technology.</p>
      )}
    </div>
  )
}