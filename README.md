# Chris Sperandio's Personal Site

My personal site built with Next.js and Nextra.

## Frontmatter Reference

This site uses MDX files with frontmatter for both posts and projects. Below is a reference of all valid frontmatter fields:

### Common Frontmatter (Both Posts and Projects)

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `title` | String | The title of the post/project | Yes |
| `description` | String | A short description | Yes |
| `date` | String | Publication date in YYYY-MM-DD format | Yes |
| `tags` | Array | List of related tags | No |
| `showTitle` | Boolean | Controls whether to show the title automatically (default: true) | No |
| `layout` | String | Specify a custom layout (e.g., "raw") | No |

### Post-Specific Frontmatter

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `author` | String | Author of the post | No |
| `image` | String | Featured image path | No |
| `excerpt` | String | Manual excerpt for preview | No |
| `published` | Boolean | Whether the post is published (default: true) | No |

### Project-Specific Frontmatter

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `github` | String | GitHub repository URL | No |
| `demo` | String | Live demo URL | No |
| `featured` | Boolean | Whether to feature the project (default: false) | No |
| `status` | String | Current project status (e.g., "completed", "in-progress") | No |
| `technologies` | Array | List of technologies used | No |

## Examples

### Post Example

```md
---
title: 'Understanding React Hooks'
description: 'A deep dive into React hooks and how they work'
date: '2023-12-15'
tags: ['react', 'javascript', 'hooks']
author: 'Chris Sperandio'
image: '/images/posts/react-hooks.jpg'
published: true
---

Post content here...
```

### Project Example

```md
---
title: 'Enterprise SaaS Platform'
description: 'A modular SaaS platform built with React, TypeScript, and Node.js'
date: '2023-11-15'
tags: ['React', 'TypeScript', 'Node.js', 'MongoDB']
github: 'https://github.com/sperand-io/enterprise-saas'
demo: 'https://demo.example.com'
featured: true
technologies: ['React', 'Node.js', 'MongoDB', 'AWS']
published: true
---

Project content here...
```

## Directory Structure

- `content/` - Contains all MDX content files
  - `posts/` - Blog posts
  - `projects/` - Project descriptions
- `app/` - Next.js application code
  - `components/` - Reusable React components
  - `utils/` - Utility functions
  - `styles.css` - Global styles

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```