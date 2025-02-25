#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Base routes that should always be included
const BASE_ROUTES = [
  '/',
  '/posts',
  '/projects',
  '/posts/the-future-of-enterprise-software',
  '/projects/example-project'
];

/**
 * Recursively scans a directory for MDX files and builds route paths
 */
async function findMdxFiles(dir, baseRoute = '') {
  const routes = [];
  
  try {
    const items = await fs.promises.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
      const itemPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        // Skip node_modules and hidden directories
        if (item.name === 'node_modules' || item.name.startsWith('.')) {
          continue;
        }
        
        // Recursively scan subdirectories
        const subRoutes = await findMdxFiles(
          itemPath, 
          path.join(baseRoute, item.name)
        );
        routes.push(...subRoutes);
      } 
      else if (item.name.endsWith('.mdx') || item.name.endsWith('.md')) {
        // Convert file path to route
        const routeName = item.name.replace(/\.(mdx|md)$/, '');
        
        // Skip index files as they're covered by the directory route
        if (routeName === 'index') {
          continue;
        }
        
        let route = path.join(baseRoute, routeName);
        
        // Ensure route starts with a slash and uses forward slashes
        route = '/' + route.replace(/\\/g, '/').replace(/^\/+/, '');
        
        routes.push(route);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }
  
  return routes;
}

async function main() {
  console.log('🔍 Discovering content routes in the project...');
  
  // Start with base routes
  let allRoutes = [...BASE_ROUTES];
  
  // Find all MDX files in the content directory
  const contentDir = path.join(__dirname, 'content');
  if (fs.existsSync(contentDir)) {
    const contentRoutes = await findMdxFiles(contentDir);
    allRoutes.push(...contentRoutes);
    
    // Explicitly check posts directory
    const postsDir = path.join(contentDir, 'posts');
    if (fs.existsSync(postsDir)) {
      console.log('📝 Scanning posts directory...');
      const postEntries = await fs.promises.readdir(postsDir, { withFileTypes: true });
      
      for (const entry of postEntries) {
        if (entry.isFile() && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))) {
          // Skip index files as they're covered by the directory route
          if (entry.name === 'index.mdx' || entry.name === 'index.md') {
            continue;
          }
          
          // Add the post route
          const routeName = entry.name.replace(/\.(mdx|md)$/, '');
          const route = `/posts/${routeName}`;
          if (!allRoutes.includes(route)) {
            console.log(`  - Adding post route: ${route}`);
            allRoutes.push(route);
          }
        }
      }
    }
    
    // Explicitly check projects directory
    const projectsDir = path.join(contentDir, 'projects');
    if (fs.existsSync(projectsDir)) {
      console.log('📝 Scanning projects directory...');
      const projectEntries = await fs.promises.readdir(projectsDir, { withFileTypes: true });
      
      for (const entry of projectEntries) {
        if (entry.isFile() && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))) {
          // Skip index files as they're covered by the directory route
          if (entry.name === 'index.mdx' || entry.name === 'index.md') {
            continue;
          }
          
          // Add the project route
          const routeName = entry.name.replace(/\.(mdx|md)$/, '');
          const route = `/projects/${routeName}`;
          if (!allRoutes.includes(route)) {
            console.log(`  - Adding project route: ${route}`);
            allRoutes.push(route);
          }
        }
      }
    }
  } else {
    console.warn('⚠️ Content directory not found.');
  }
  
  // Remove any duplicates
  allRoutes = [...new Set(allRoutes)];
  
  console.log(`✅ Found ${allRoutes.length} routes:`);
  allRoutes.forEach(route => console.log(`  - ${route}`));
  
  // Write the routes to a file for the build script to use
  const routesFile = path.join(__dirname, '.discovered-routes.json');
  await fs.promises.writeFile(
    routesFile, 
    JSON.stringify({ routes: allRoutes }, null, 2)
  );
  
  console.log(`✨ Routes written to ${routesFile}`);
}

main().catch(error => {
  console.error('Failed to discover routes:', error);
  process.exit(1);
});