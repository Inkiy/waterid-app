import { useState } from 'react';
import { Shield, Copy, Check, Link, ChevronDown, Upload } from 'lucide-react';
import { buildUploadUrl, type WatermarkParams } from '../utils/urlParams';
import { LANGUAGES, t, type LangCode } from '../i18n';

function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export default function Generator({ initialLang = 'en' }: { initialLang?: LangCode }) {
  const [lang, setLang] = useState<LangCode>(initialLang);
  const tr = t(lang);

  const [host, setHost] = useState('');
  const [purpose, setPurpose] = useState(tr.purposePresets[0]);
  const [customPurpose, setCustomPurpose] = useState('');
  const [expiryDays, setExpiryDays] = useState(30);
  const [style] = useState<WatermarkParams['style']>('standard');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showPurposeList, setShowPurposeList] = useState(false);

  const isCustom = purpose === tr.purposeCustomLabel;
  const finalPurpose = isCustom ? customPurpose : purpose;
  const canGenerate = host.trim() && finalPurpose.trim();

  const handleLangChange = (newLang: LangCode) => {
    setLang(newLang);
    setPurpose(t(newLang).purposePresets[0]);
    setGeneratedUrl('');
  };

  const handleGenerate = () => {
    const params: WatermarkParams = {
      host: host.trim(),
      purpose: finalPurpose.trim(),
      expires: addDays(expiryDays),
      style,
      lang,
    };
    setGeneratedUrl(buildUploadUrl(params));
  };

  const shareText = generatedUrl ? tr.shareMsg(finalPurpose || tr.purposePresets[0]) + generatedUrl : '';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Shield size={20} className="text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-bold text-slate-800">{tr.appTitle}</h1>
            <p className="text-xs text-slate-500">{tr.appSubtitle}</p>
          </div>
          {/* Mobile: single dropdown */}
          <select
            value={lang}
            onChange={e => handleLangChange(e.target.value as LangCode)}
            className="sm:hidden ml-auto text-xs border border-slate-200 rounded-lg px-2 py-2 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
          {/* Desktop: pills + more dropdown */}
          <div className="hidden sm:flex ml-auto flex-shrink-0 items-center gap-1">
            {LANGUAGES.slice(0, 5).map(l => (
              <button
                key={l.code}
                onClick={() => handleLangChange(l.code)}
                className={`text-xs px-2 py-1 rounded-md font-medium transition ${
                  lang === l.code
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {l.label}
              </button>
            ))}
            <select
              value={LANGUAGES.slice(0, 5).some(l => l.code === lang) ? '' : lang}
              onChange={e => e.target.value && handleLangChange(e.target.value as LangCode)}
              className="text-xs border border-slate-200 rounded-md px-1.5 py-1 bg-white text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">More…</option>
              {LANGUAGES.slice(5).map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Intro card */}
        <div className="bg-blue-600 rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-2">{tr.heroTitle}</h2>
          <p className="text-blue-100 text-sm leading-relaxed">{tr.heroBody}</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
          {/* Host name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {tr.labelHost}
            </label>
            <input
              type="text"
              value={host}
              onChange={e => setHost(e.target.value)}
              placeholder={tr.placeholderHost}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {tr.labelPurpose}
            </label>
            <div className="relative">
              <button
                onClick={() => setShowPurposeList(!showPurposeList)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <span className={purpose ? 'text-slate-800' : 'text-slate-400'}>{purpose}</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${showPurposeList ? 'rotate-180' : ''}`} />
              </button>
              {showPurposeList && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden">
                  {tr.purposePresets.map(p => (
                    <button
                      key={p}
                      onClick={() => { setPurpose(p); setShowPurposeList(false); }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition ${purpose === p ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {isCustom && (
              <input
                type="text"
                value={customPurpose}
                onChange={e => setCustomPurpose(e.target.value)}
                placeholder={tr.purposeCustomPlaceholder}
                className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            )}
          </div>

          {/* Expiry */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {tr.labelExpiry}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {tr.expiryOpts.map(opt => (
                <button
                  key={opt.days}
                  onClick={() => setExpiryDays(opt.days)}
                  className={`py-2.5 rounded-xl text-sm font-medium transition border ${
                    expiryDays === opt.days
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-200 text-slate-600 hover:border-blue-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {new Date(addDays(expiryDays)).toLocaleDateString(tr.dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <Link size={16} />
            {tr.btnGenerate}
          </button>
        </div>

        {/* Generated URL card */}
        {generatedUrl && (
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-green-700">{tr.linkReady}</span>
            </div>

            {/* Message preview */}
            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 leading-relaxed whitespace-pre-wrap select-all">
              {shareText}
            </div>

            <button
              onClick={handleCopy}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 ${
                copied
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-slate-900 text-white hover:bg-slate-700'
              }`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? tr.btnCopied : tr.btnCopy}
            </button>

            <button
              onClick={() => {
                window.location.hash = generatedUrl.substring(generatedUrl.indexOf('#'));
              }}
              className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition flex items-center justify-center gap-2"
            >
              <Upload size={15} />
              {tr.btnUseSelf}
            </button>

            <div className="text-xs text-slate-400 text-center">
              {tr.flowHint}
            </div>
          </div>
        )}

        {/* How it works */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">
            {lang === 'zh' ? '为什么这个比直接发照片更安全？' : 'Why is this safer than sending a photo directly?'}
          </h3>
          <div className="space-y-3">
            {[
              ['🔒', lang === 'zh' ? '图片不离开设备' : 'Images stay on device', lang === 'zh' ? '水印在对方浏览器中完成，我们的服务器从不接触任何证件图片' : 'Watermarking happens in the recipient\'s browser — our servers never touch any ID images'],
              ['🛡️', lang === 'zh' ? '多层防 AI 抹除' : 'Multi-layer anti-AI removal', lang === 'zh' ? '水印密铺整张图片，横穿关键内容，AI 无法在不损坏证件的情况下清除' : 'Watermarks tile across the entire image, making AI inpainting removal impossible without destroying the document'],
              ['⏰', lang === 'zh' ? '有效期限制' : 'Expiry limits', lang === 'zh' ? '水印标注授权时间范围，证件截图在过期后失去授权合法性' : 'The watermark records the authorization window — screenshots lose legal authorization after expiry'],
              ['📋', lang === 'zh' ? '用途明示' : 'Purpose stated', lang === 'zh' ? '明确标注证件仅用于特定目的，一旦滥用留有证据' : 'The document is clearly marked for a specific purpose — any misuse leaves evidence'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="flex gap-3">
                <span className="text-xl flex-shrink-0">{icon}</span>
                <div>
                  <p className="text-sm font-medium text-slate-700">{title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
