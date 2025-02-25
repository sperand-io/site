import Link from 'next/link'

import type { Metadata } from 'next'
import { getProjects, getTags, getTechnologies } from './get-projects'

export const metadata: Metadata = {
  title: 'Projects'
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const tags = await getTags()
  const technologies = await getTechnologies()
  const allTags: Record<string, number> = Object.create(null)
  const allTechnologies: Record<string, number> = Object.create(null)
  
  for (const tag of tags) {
    allTags[tag] ??= 0
    allTags[tag] += 1
  }
  for (const technology of technologies) {
    allTechnologies[technology] ??= 0
    allTechnologies[technology] += 1
  }

  return (
    <div className="projects-container">
      <h1>Projects</h1>
      
      <div className="tags-container">
        {Object.entries(allTags).map(([tag, count]) => (
          <Link key={tag} href={`/tags/${tag}`} className="tag-link">
            {tag} ({count})
          </Link>
        ))}
      </div>

      <div className="tags-container">
        {Object.entries(allTechnologies).map(([technology, count]) => (
          <Link key={technology} href={`/technologies/${technology}`} className="tag-link">
            {technology} ({count})
          </Link>
        ))}
      </div>

      <div className="projects-list">
        {projects.map(project => (
          <div key={project.name} className="project-card">
            <h2 className="project-title">{project.frontMatter.title}</h2>
            <p className="project-description">{project.frontMatter.description}</p>
            
            <div className="tag-links">
              <h3>Tags</h3>
              {project.frontMatter.tags.map(tag => (
                <Link key={tag} href={`/tags/${tag}`} className="tag-link">{tag}</Link>
              ))}
            </div>
            <div className="tag-links">
              <h3>Technologies</h3>
              {project.frontMatter.technologies.map(technology => (
                <Link key={technology} href={`/technologies/${technology}`} className="tag-link">{technology}</Link>
              ))}
            </div>
            
            <div className="project-links">
              {project.frontMatter.github && (
                <Link href={project.frontMatter.github} className="project-link" target="_blank" rel="noopener noreferrer">
                  GitHub
                </Link>
              )}
              {project.frontMatter.demo && (
                <Link href={project.frontMatter.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                  Live Demo
                </Link>
              )}
              <Link href={`/projects/${project.name}`} className="project-link">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}