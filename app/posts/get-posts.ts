import { normalizePages } from 'nextra/normalize-pages';
import { getPageMap } from 'nextra/page-map';

// Define frontmatter type for better type safety
interface Frontmatter {
  date?: string;
  tags?: string[];
  title?: string;
  description?: string;
  [key: string]: any;
}

// Add correct types to the post object
interface Post {
  name: string;
  route: string;
  frontMatter: Frontmatter;
  [key: string]: any;
}
 
export async function getPosts() {
  const { directories } = normalizePages({
    list: await getPageMap('/posts'),
    route: '/posts'
  })
  
  return directories
    .filter((post: Post) => post.name !== 'index')
    .sort((a: Post, b: Post) => {
      // Handle missing dates by using string comparison with fallback to empty string
      const dateA = a.frontMatter?.date || '';
      const dateB = b.frontMatter?.date || '';
      
      // Simple string comparison (newer dates should be first)
      return dateB.localeCompare(dateA);
    });
}
 
export async function getTags() {
  const posts = await getPosts();
  const tags = posts.flatMap((post: Post) => post.frontMatter?.tags || []);
  
  // Create a unique tags array without using Set
  const uniqueTags: string[] = [];
  tags.forEach(tag => {
    if (!uniqueTags.includes(tag)) {
      uniqueTags.push(tag);
    }
  });
  
  return uniqueTags;
}