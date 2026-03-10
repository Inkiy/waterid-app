import { useEffect, useState } from 'react';
import Generator from './pages/Generator';
import UploadPage from './pages/Upload';
import Landing from './pages/Landing';
import TenantSelf from './pages/TenantSelf';
import LandingHost from './pages/LandingHost';
import LandingTenant from './pages/LandingTenant';
import type { LangCode } from './i18n';

// Hash-based routing: no server config needed for static deployments
// Routes:
//   #/               → Landing (default lang)
//   #/zh             → Landing in Chinese
//   #/host           → Generator (default lang)
//   #/host/zh        → Generator in Chinese
//   #/tenant/zh      → TenantSelf in Chinese
//   #/for-hosts      → Host landing page
//   #/for-hosts/zh   → Host landing page in Chinese
//   #/for-tenants    → Tenant landing page
//   #/for-tenants/zh → Tenant landing page in Chinese
//   #/upload/:encoded → Upload page (tenant via host link)
//   #ENCODED         → Upload page (short format)
type Route = 'landing' | 'host' | 'tenant' | 'upload' | 'landingHost' | 'landingTenant';

const LANG_CODES = ['en','zh','es','fr','de','ja','ko','pt','it','ru','tr'];

function parseLang(s: string): LangCode {
  return (LANG_CODES.includes(s) ? s : 'en') as LangCode;
}

function parseRoute(hash: string): { route: Route; encoded?: string; lang?: LangCode } {
  // New short format: #ENCODED (no leading slash)
  if (hash.length > 1 && !hash.startsWith('#/')) {
    return { route: 'upload', encoded: hash.slice(1) };
  }
  const path = hash.replace(/^#\//, '');
  // Legacy format: #/upload/ENCODED
  if (path.startsWith('upload/')) {
    return { route: 'upload', encoded: path.slice('upload/'.length) };
  }
  if (path === 'host' || path.startsWith('host/')) {
    return { route: 'host', lang: parseLang(path.slice(5)) };
  }
  if (path === 'tenant' || path.startsWith('tenant/')) {
    return { route: 'tenant', lang: parseLang(path.slice(7)) };
  }
  if (path === 'for-hosts' || path.startsWith('for-hosts/')) {
    return { route: 'landingHost', lang: parseLang(path.slice(10)) };
  }
  if (path === 'for-tenants' || path.startsWith('for-tenants/')) {
    return { route: 'landingTenant', lang: parseLang(path.slice(12)) };
  }
  // Landing: #/ or #/zh etc.
  return { route: 'landing', lang: parseLang(path) };
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
  if (route.route === 'host') return <Generator initialLang={route.lang ?? 'en'} />;
  if (route.route === 'tenant') return <TenantSelf initialLang={route.lang ?? 'en'} />;
  if (route.route === 'landingHost') return <LandingHost initialLang={route.lang ?? 'en'} />;
  if (route.route === 'landingTenant') return <LandingTenant initialLang={route.lang ?? 'en'} />;
  return <Landing initialLang={route.lang ?? 'en'} />;
}
