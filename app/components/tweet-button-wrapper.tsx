'use client';

import React from 'react';
import TweetButton from './tweet-button';

interface TweetButtonWrapperProps {
  tweetText: string;
}

export default function TweetButtonWrapper({ tweetText }: TweetButtonWrapperProps) {
  return (
    <TweetButton 
      text={tweetText} 
      url={typeof window !== 'undefined' ? window.location.href : ''}
    />
  );
}