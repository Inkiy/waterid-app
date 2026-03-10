import { useEffect, useState } from 'react';
import Generator from './pages/Generator';
import UploadPage from './pages/Upload';
import Landing from './pages/Landing';
import TenantSelf from './pages/TenantSelf';

// Hash-based routing: no server config needed for static deployments
// Routes:
//   #/               → Landing (role selection)
//   #/host           → Generator (host side)
//   #/tenant         → TenantSelf (tenant self-service)
//   #/upload/:encoded → Upload page (tenant via host link)
type Route = 'landing' | 'host' | 'tenant' | 'upload';

function parseRoute(hash: string): { route: Route; encoded?: string } {
  const path = hash.replace(/^#\//, '');
  if (path.startsWith('upload/')) {
    return { route: 'upload', encoded: path.slice('upload/'.length) };
  }
  if (path === 'host') return { route: 'host' };
  if (path === 'tenant') return { route: 'tenant' };
  return { route: 'landing' };
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
  if (route.route === 'host') return <Generator />;
  if (route.route === 'tenant') return <TenantSelf />;
  return <Landing />;
}
