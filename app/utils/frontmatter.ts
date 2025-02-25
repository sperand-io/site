// Utility functions for working with frontmatter

// Read and parse frontmatter from MDX files
// This is a simplified version since we can't install gray-matter
export function parseFrontmatter(mdxContent: string) {
  try {
    // Very basic frontmatter parser - in a real app, use gray-matter
    const match = mdxContent.match(/^---\n([\s\S]*?)\n---/);
    
    if (!match) return { data: {} };
    
    const frontmatterBlock = match[1];
    const data: Record<string, any> = {};
    
    // Parse each line as key-value pair
    frontmatterBlock.split('\n').forEach(line => {
      const [key, ...valueArr] = line.split(':');
      if (!key || !valueArr.length) return;
      
      const rawValue = valueArr.join(':').trim();
      
      // Handle arrays
      if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
        try {
          // Extract items between brackets and split by commas
          const arrayItems = rawValue.slice(1, -1).split(',')
            .map(item => {
              item = item.trim();
              // Remove quotes if present
              if ((item.startsWith("'") && item.endsWith("'")) || 
                  (item.startsWith('"') && item.endsWith('"'))) {
                return item.slice(1, -1);
              }
              return item;
            })
            .filter(Boolean);
          
          data[key.trim()] = arrayItems;
        } catch (e) {
          data[key.trim()] = rawValue;
        }
      } 
      // Handle string values with quotes
      else if ((rawValue.startsWith("'") && rawValue.endsWith("'")) || 
               (rawValue.startsWith('"') && rawValue.endsWith('"'))) {
        data[key.trim()] = rawValue.slice(1, -1);
      } 
      // Handle booleans
      else if (rawValue === 'true' || rawValue === 'false') {
        data[key.trim()] = rawValue === 'true';
      }
      // Handle numbers
      else if (!isNaN(Number(rawValue))) {
        data[key.trim()] = Number(rawValue);
      }
      // Default to string
      else {
        data[key.trim()] = rawValue;
      }
    });
    
    return { data };
  } catch (error) {
    console.error('Error parsing frontmatter:', error);
    return { data: {} };
  }
}