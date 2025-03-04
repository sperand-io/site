'use client';

import React from 'react';

interface TweetButtonProps {
  text: string;
  url: string;
}

export default function TweetButton({ text, url }: TweetButtonProps) {
  const [currentUrl, setCurrentUrl] = React.useState(url);
  
  // Update URL on the client side
  React.useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);
  
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`;
  
  return (
    <a 
      href={tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="tweet-button"
      aria-label="Share on Twitter"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24"
        fill="currentColor"
        className="inline-block x-logo mr-10"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
      </svg>
      
      <span>Share</span>
    </a>
  );
}