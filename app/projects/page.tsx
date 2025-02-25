import fs from 'fs/promises'
import Link from 'next/link'
import path from 'path'
import { parseFrontmatter } from '../utils/frontmatter'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects'
}

// Define a constant for the title to use in the component
const TITLE = 'Projects'

// Get project data from frontmatter
async function getProjects() {
  try {
    const projectsDir = path.join(process.cwd(), 'content/projects')
    
    // Check if directory exists first to avoid errors
    try {
      await fs.access(projectsDir)
    } catch (e) {
      // Directory doesn't exist, create it
      await fs.mkdir(projectsDir, { recursive: true })
      return [] // Return empty array since no projects exist yet
    }
    
    const files = await fs.readdir(projectsDir)
    
    const projects = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async (file) => {
          const filePath = path.join(projectsDir, file)
          const content = await fs.readFile(filePath, 'utf8')
          const { data } = parseFrontmatter(content)
          
          return {
            id: file.replace(/\.mdx$/, ''),
            title: data.title,
            description: data.description,
            tags: data.tags || [],
            github: data.github,
            demo: data.demo,
            featured: data.featured || false,
            date: data.date
          }
        })
    )
    
    // Sort by date, most recent first
    return projects.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return 0
    })
  } catch (error) {
    console.error('Error getting projects:', error)
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  
  return (
    <div className="projects-container">
      <h1>{TITLE}</h1>
      
      <div className="projects-list">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
            
            <div className="project-tags">
              {project.tags.map(tag => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>
            
            <div className="project-links">
              {project.github && (
                <Link href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                  GitHub
                </Link>
              )}
              {project.demo && (
                <Link href={project.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                  Live Demo
                </Link>
              )}
              <Link href={`/projects/${project.id}`} className="project-link">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}