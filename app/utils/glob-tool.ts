// Edge-compatible glob utility
import { getPageMap } from 'nextra/page-map'
import { normalizePages } from 'nextra/normalize-pages'

export async function GlobTool(pattern: string): Promise<string[]> {
  // Use path parts to determine what we're looking for
  const parts = pattern.split('/').filter(Boolean);
  
  if (parts.includes('projects')) {
    try {
      // Use the same Nextra API we use for posts
      const pageMap = await getPageMap('/projects');
      
      // If the pageMap is empty or doesn't exist, return empty array
      if (!pageMap || Object.keys(pageMap).length === 0) {
        return [];
      }
      
      const { directories } = normalizePages({
        list: pageMap,
        route: '/projects'
      });
      
      // Convert to file paths, filtering out any index pages
      const projectPages = directories
        .filter(project => project.name !== 'index')
        .map(project => `/content/projects/${project.name}.mdx`);
      
      // Explicitly return empty array if no project pages found
      return projectPages.length > 0 ? projectPages : [];
    } catch (error) {
      // If there's an error or no projects directory exists yet
      console.warn('No projects directory found or error accessing it', error);
      return [];
    }
  }
  
  // Default behavior - return empty array (no files found)
  return [];
}