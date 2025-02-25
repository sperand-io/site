import { normalizePages } from 'nextra/normalize-pages';
import { getPageMap } from 'nextra/page-map';

// Define frontmatter type for better type safety
interface Frontmatter {
  date?: string;
  tags?: string[];
  title?: string;
  description?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  published?: boolean;
  technologies?: string[];
  [key: string]: any;
}

// Add correct types to the post object
interface Project {
  name: string;
  route: string;
  frontMatter: Frontmatter;
  [key: string]: any;
}
 
export async function getProjects() {
  const { directories } = normalizePages({
    list: await getPageMap('/projects'),
    route: '/projects'
  })

  const projects = directories
    .filter((project: Project) => project.name !== 'index')
    .filter((project: Project) => project.frontMatter?.published)
    .sort((a: Project, b: Project) => {
      // Handle missing dates by using string comparison with fallback to empty string
      const dateA = a.frontMatter?.date || '';
      const dateB = b.frontMatter?.date || '';
      
      // Simple string comparison (newer dates should be first)
      return dateB.localeCompare(dateA);
    });

    return projects
}
 
export async function getTags() {
  const projects = await getProjects();
  const tags = projects.flatMap((project: Project) => project.frontMatter?.tags || []);
  
  // Create a unique tags array using Set
  const uniqueTags: string[] = [...new Set(tags)];
  return uniqueTags;
}

export async function getTechnologies() {
  const projects = await getProjects();
  const technologies = projects.flatMap((project: Project) => project.frontMatter?.technologies || []);

  const uniqueTechnologies: string[] = [...new Set(technologies)];
  return uniqueTechnologies;
}
