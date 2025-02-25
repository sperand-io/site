import Link from 'next/link'
import { getPosts, getTags } from './get-posts'

export const metadata = {
  title: 'Writing'
}

export default async function PostsPage() {
  const tags = await getTags()
  const posts = await getPosts()
  const allTags: Record<string, number> = Object.create(null)

  for (const tag of tags) {
    allTags[tag] ??= 0
    allTags[tag] += 1
  }
  
  return (
    <div className="posts-container">
      <h1>{metadata.title}</h1>
      
      <div className="tags-container">
        {Object.entries(allTags).map(([tag, count]) => (
          <Link key={tag} href={`/tags/${tag}`} className="tag-link">
            {tag} ({count})
          </Link>
        ))}
      </div>
      
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.route} className="post-item">
            <h2 className="post-title">
              <Link href={post.route}>{post.frontMatter?.title || post.name}</Link>
            </h2>
            <div className="post-meta">
              {post.frontMatter?.date && (
                <time dateTime={new Date(post.frontMatter.date).toISOString()}>
                  {new Date(post.frontMatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
            </div>
            {post.frontMatter?.description && (
              <p className="post-description">{post.frontMatter.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}