import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <p>
        <Link href="/">
          Return to home
        </Link>
      </p>
      
      <div className="suggestions">
        <h2>You might be looking for:</h2>
        <ul>
          <li>
            <Link href="/posts">
              Blog Posts
            </Link>
          </li>
          <li>
            <Link href="/projects">
              Projects
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}