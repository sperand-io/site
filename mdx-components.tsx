import dynamic from 'next/dynamic';
import { useMDXComponents as getThemeComponents } from 'nextra-theme-blog';

// Get the default MDX components
const themeComponents = getThemeComponents();

// Dynamically import the client component
const TweetButtonWrapper = dynamic(() => import('./app/components/tweet-button-wrapper'), {
  ssr: true,
});

// Create a custom wrapper component that respects absence of title
const customWrapper = ({ children, toc, meta }) => {
  // Get the original Wrapper
  const OriginalWrapper = themeComponents.wrapper;
  
  // Only render if it's explicitly specified that we don't want a wrapper
  if (meta?.layout === 'raw') {
    return <>{children}</>;
  }
  
  // Check if it's a post page and not a project page or homepage
  const isPostPage = meta?.title && !['Writing', 'Home', 'Projects'].includes(meta.title);
  
  // Create tweet text from defaultTweetText or fallback to title + description
  const tweetText = meta?.defaultTweetText || 
    `${meta?.title}${meta?.description ? `: ${meta?.description}` : ''}`;
  
  // For pages with no title, don't render the h1
  return (
    <div className="wrapper">
      {meta?.title && <h1>{meta.title}</h1>}
      
      {/* Display tweet button only for post pages */}
      {isPostPage && meta?.title && (
        <TweetButtonWrapper tweetText={tweetText} />
      )}
      
      {children}
    </div>
  );
};

// Merge components with our custom wrapper
export function useMDXComponents(components = {}) {
  return {
    ...themeComponents,
    wrapper: customWrapper,
    ...components
  };
}