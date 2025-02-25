'use client';

import React, { useRef, useState, useEffect } from 'react';
import { NeuroNoise } from '@paper-design/shaders-react';

/**
 * Renders a subtle NeuroNoise shader in the background
 */
export function NeuroShader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Set up visibility after render to help with react hydration
  useEffect(() => {
    setIsClient(true);
    
    // Give a small delay to ensure dom is ready
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Catch and log any errors
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      if (e.message.includes('WebGL') || e.message.includes('shader') || e.message.includes('canvas')) {
        console.error('WebGL Error:', e);
        setError(e.message);
      }
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  // Handle cases where WebGL isn't working
  if (error) {
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          background: 'linear-gradient(45deg, rgba(70, 90, 105, 0.02), rgba(90, 110, 125, 0.02))'
        }}
      />
    );
  }

  // Don't render anything on server side
  if (!isClient) {
    return null;
  }

  // Shader style
  const shaderStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  };
  
  // Container styles
  const containerStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -1,
    pointerEvents: 'none',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.5s ease',
    backgroundColor: 'rgba(70, 90, 105, 0.03)'
  } as React.CSSProperties;

  return (
    <div 
      ref={containerRef}
      id="neuro-shader-background"
      style={containerStyles}
    >
      <NeuroNoise
        style={shaderStyle}
        scale={0.8}
        speed={0.2}
        colorFront='rgba(70, 90, 105, .15)'
        colorBack='rgba(19, 87, 138, 0)'
        brightness={0.7}
      />
    </div>
  );
}