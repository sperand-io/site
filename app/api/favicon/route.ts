import { NextResponse } from 'next/server';

// In server mode, we can set more flexible caching
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Simple empty favicon response to prevent errors
export async function GET() {
  // Return a transparent 1x1 pixel ICO as a minimal favicon
  const transparentICO = new Uint8Array([
    0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 16, 16, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]);
  
  return new NextResponse(transparentICO, {
    headers: {
      'Content-Type': 'image/x-icon',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
}