import { useMDXComponents as getThemeComponents } from 'nextra-theme-blog';
import React from 'react';

// Get the default MDX components
const themeComponents = getThemeComponents();

// Create a custom wrapper component that respects absence of title
const customWrapper = ({ children, toc, meta }) => {
  // Get the original Wrapper
  const OriginalWrapper = themeComponents.wrapper;
  
  // Only render if it's explicitly specified that we don't want a wrapper
  if (meta?.layout === 'raw') {
    return <>{children}</>;
  }
  
  // For pages with no title, don't render the h1
  return (
    <div className="wrapper">
      {meta?.title && <h1>{meta.title}</h1>}
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