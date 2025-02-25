import Link from 'next/link'
import { getPosts, getTags } from '../../posts/get-posts'

export async function generateMetadata(props) {
  const params = await props.params
  return {
    title: `Posts Tagged with "${decodeURIComponent(params.tag)}"`
  }
}

export async function generateStaticParams() {
  const allTags = await getTags()
  return [...new Set(allTags)].map(tag => ({ tag }))
}

export default async function TagPage(props) {
  const params = await props.params
  const { title } = await generateMetadata({ params })
  const posts = await getPosts()
  const filteredPosts = posts.filter(post => {
    const tags = post.frontMatter?.tags || []
    return tags.includes(decodeURIComponent(params.tag))
  })

  return (
    <div className="tag-page">
      <h1>{title}</h1>
      <Link href="/posts" className="back-link">All Posts</Link>
      
      <div className="posts-list">
        {filteredPosts.map(post => (
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
      
      {filteredPosts.length === 0 && (
        <p className="no-posts">No posts found with this tag.</p>
      )}
    </div>
  )
}