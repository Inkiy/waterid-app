import { useEffect, useState } from 'react';
import Generator from './pages/Generator';
import UploadPage from './pages/Upload';

// Hash-based routing: no server config needed for static deployments
// Routes:
//   #/          → Generator (host side)
//   #/upload/:encoded  → Upload page (tenant side)
function parseRoute(hash: string): { route: 'generator' | 'upload'; encoded?: string } {
  const path = hash.replace(/^#\//, '');
  if (path.startsWith('upload/')) {
    return { route: 'upload', encoded: path.slice('upload/'.length) };
  }
  return { route: 'generator' };
}

export default function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));

  useEffect(() => {
    const handler = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  if (route.route === 'upload' && route.encoded) {
    return <UploadPage encoded={route.encoded} />;
  }
  return <Generator />;
}
