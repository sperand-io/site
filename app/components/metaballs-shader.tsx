'use client';

import { Metaballs } from '@paper-design/shaders-react';
import { useEffect, useRef, useState } from 'react';

export function MetaballsShader({ 
  className = '',
  width = 80, 
  height = 80
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // These properties directly map to uniforms in the shader
  const shaderProps = {
    scale: .85,
    ballSize: 0.7,
    visibilityRange: 0.4,
    speed: 0.25,
    color1: '#465A69',
    color2: '#3A4D5C',
    color3: '#556A79'
  };

  if (!isClient) {
    // Return placeholder during server-side rendering
    return (
      <div 
        ref={containerRef}
        className={`metaballs-container ${className}`}
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          backgroundColor: 'var(--background)',
          borderRadius: '50%' 
        }}
      />
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`metaballs-container ${className}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '50%'
      }}
    >
      <Metaballs
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        {...shaderProps}
      />
    </div>
  );
}