import { useState } from 'react';
import { Shield, Home, User } from 'lucide-react';
import { t, LANGUAGES, type LangCode } from '../i18n';

export default function Landing({ initialLang = 'en' }: { initialLang?: LangCode }) {
  const [lang, setLang] = useState<LangCode>(initialLang);
  const tr = t(lang);

  const handleLangChange = (newLang: LangCode) => {
    setLang(newLang);
    window.location.hash = newLang === 'en' ? '#/' : `#/${newLang}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-base font-bold text-slate-800">{tr.appTitle}</h1>
            <p className="text-xs text-slate-500">{tr.appSubtitle}</p>
          </div>
          <select
            value={lang}
            onChange={e => handleLangChange(e.target.value as LangCode)}
            className="text-xs border border-slate-200 rounded-lg px-2 py-2 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-10 space-y-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{tr.appTitle}</h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">{tr.appSubtitle}</p>
        </div>

        {/* Host card */}
        <button
          onClick={() => { window.location.hash = lang === 'en' ? '#/host' : `#/host/${lang}`; }}
          className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-left hover:border-blue-300 hover:shadow-md active:scale-[0.99] transition group"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition">
              <Home size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-800 mb-1">{tr.roleHostTitle}</p>
              <p className="text-sm text-slate-500">{tr.roleHostDesc}</p>
            </div>
            <span className="ml-auto text-slate-300 text-xl self-center">›</span>
          </div>
        </button>
        <button
          onClick={() => { window.location.hash = lang === 'en' ? '#/for-hosts' : `#/for-hosts/${lang}`; }}
          className="w-full text-xs text-blue-500 hover:text-blue-700 transition text-center -mt-2 pb-1"
        >
          {lang === 'zh' ? '了解房东如何使用 →' : 'How does it work for hosts? →'}
        </button>

        {/* Tenant card */}
        <button
          onClick={() => { window.location.hash = lang === 'en' ? '#/tenant' : `#/tenant/${lang}`; }}
          className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-left hover:border-green-300 hover:shadow-md active:scale-[0.99] transition group"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition">
              <User size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-800 mb-1">{tr.roleTenantTitle}</p>
              <p className="text-sm text-slate-500">{tr.roleTenantDesc}</p>
            </div>
            <span className="ml-auto text-slate-300 text-xl self-center">›</span>
          </div>
        </button>
        <button
          onClick={() => { window.location.hash = lang === 'en' ? '#/for-tenants' : `#/for-tenants/${lang}`; }}
          className="w-full text-xs text-green-500 hover:text-green-700 transition text-center -mt-2 pb-1"
        >
          {lang === 'zh' ? '了解租客如何使用 →' : 'How does it work for tenants? →'}
        </button>
      </main>
    </div>
  );
}
