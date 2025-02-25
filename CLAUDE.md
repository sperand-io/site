# CLAUDE.md - Configuration and Preferences

This file contains important information for Claude's reference when working with this codebase.

## Commands

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Frontmatter Reference

When creating MDX files, refer to the README.md for a complete reference of all valid frontmatter fields.

### Minimal Requirements

For posts:
```
---
title: 'Post Title'
description: 'Post description'
date: 'YYYY-MM-DD'
tags: ['tag1', 'tag2']
---
```

For projects:
```
---
title: 'Project Title'
description: 'Project description'
date: 'YYYY-MM-DD'
tags: ['tag1', 'tag2']
---
```

## Style Preferences

- Use JetBrains Mono as the primary font for UI elements, navigation, and headings
- Use Inter (sans-serif) only for article body text content
- Color scheme uses a steely dark blue-grey accent color (#465A69) instead of bright blue
- Maintain a clean, minimal design with subtle shadows and rounded corners
- Use semantic HTML elements
- Follow a component-based architecture
- Subtle animations for interactive elements