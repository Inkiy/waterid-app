import { useState, useRef, useCallback } from 'react';
import { Shield, Upload, Download, AlertTriangle, CheckCircle, Loader, ChevronDown, ArrowLeft } from 'lucide-react';
import { t, LANGUAGES, type LangCode } from '../i18n';
import { applyWatermark, type WatermarkResult } from '../utils/watermark';
import { type WatermarkParams } from '../utils/urlParams';

type Stage = 'idle' | 'processing' | 'done' | 'error';

function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export default function TenantSelf({ initialLang = 'en' }: { initialLang?: LangCode }) {
  const [lang, setLang] = useState<LangCode>(initialLang);
  const tr = t(lang);

  const [recipient, setRecipient] = useState('');
  const [purpose, setPurpose] = useState(tr.purposePresets[0]);
  const [customPurpose, setCustomPurpose] = useState('');
  const [expiryDays, setExpiryDays] = useState(30);
  const [showPurposeList, setShowPurposeList] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const [stage, setStage] = useState<Stage>('idle');
  const [result, setResult] = useState<WatermarkResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const isCustom = purpose === tr.purposeCustomLabel;
  const finalPurpose = isCustom ? customPurpose : purpose;
  const isFormValid = recipient.trim() && finalPurpose.trim();

  const handleLangChange = (newLang: LangCode) => {
    setLang(newLang);
    setPurpose(t(newLang).purposePresets[0]);
  };

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg(tr.uploadFormats);
      setStage('error');
      return;
    }
    if (!isFormValid) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);
    setFileName(file.name);
    setStage('processing');
    const params: WatermarkParams = {
      host: recipient.trim(),
      purpose: finalPurpose.trim(),
      expires: addDays(expiryDays),
      style: 'standard',
      lang,
    };
    try {
      const res = await applyWatermark(file, params);
      setResult(res);
      setStage('done');
    } catch (e) {
      setErrorMsg((e as Error).message || 'Processing failed, please try again');
      setStage('error');
    }
  }, [recipient, finalPurpose, expiryDays, lang, tr, isFormValid]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.dataUrl;
    const base = fileName.replace(/\.[^.]+$/, '');
    a.download = `${base}_watermarked.jpg`;
    a.click();
  };

  const handleReset = () => {
    setStage('idle');
    setResult(null);
    setFileName('');
    setErrorMsg('');
    setShowValidation(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => { window.location.hash = '#/'; }}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition flex-shrink-0"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Shield size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-slate-800">{tr.appTitle}</h1>
            <p className="text-xs text-slate-500 truncate">{tr.appSubtitle}</p>
          </div>
          <select
            value={lang}
            onChange={e => handleLangChange(e.target.value as LangCode)}
            className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0"
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 space-y-5">
        {/* Page title + explanation */}
        <div className="bg-green-600 rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-2">{tr.tenantSelfTitle}</h2>
          <p className="text-green-100 text-sm leading-relaxed">{tr.tenantSelfBody}</p>
        </div>

        {/* Security notice */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-3">
          <Shield size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-green-800">{tr.securityTitle}</p>
            <p className="text-xs text-green-700 mt-1 leading-relaxed">{tr.securityBody}</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
          {/* Recipient */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {tr.labelRecipient}
            </label>
            <input
              type="text"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              placeholder={tr.placeholderRecipient}
              className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                showValidation && !recipient.trim() ? 'border-red-300 bg-red-50' : 'border-slate-200'
              }`}
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
                <span className="text-slate-800">{purpose}</span>
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
        </div>

        {/* Validation message */}
        {showValidation && !isFormValid && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <AlertTriangle size={16} className="flex-shrink-0" />
            <p className="text-sm">{tr.fieldRequired}</p>
          </div>
        )}

        {/* Upload zone */}
        {stage === 'idle' && (
          <div
            onClick={() => {
              if (!isFormValid) { setShowValidation(true); return; }
              inputRef.current?.click();
            }}
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            className={`border-2 border-dashed rounded-2xl p-6 sm:p-10 text-center cursor-pointer transition ${
              dragging
                ? 'border-blue-400 bg-blue-50'
                : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />
            <Upload className="mx-auto mb-4 text-slate-300" size={40} />
            <p className="text-sm font-semibold text-slate-600">{tr.uploadClick}</p>
            <p className="text-xs text-slate-400 mt-1">{tr.uploadDrag}</p>
            <p className="text-xs text-slate-300 mt-3">{tr.uploadFormats}</p>
          </div>
        )}

        {/* Processing */}
        {stage === 'processing' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
            <Loader className="mx-auto mb-4 text-blue-600 animate-spin" size={36} />
            <p className="text-sm font-semibold text-slate-700">{tr.processingMsg}</p>
            <p className="text-xs text-slate-400 mt-1">{tr.processingNote}</p>
          </div>
        )}

        {/* Error */}
        {stage === 'error' && (
          <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6 text-center space-y-3">
            <AlertTriangle className="mx-auto text-red-500" size={32} />
            <p className="text-sm font-semibold text-slate-700">{errorMsg}</p>
            <button onClick={handleReset} className="text-sm text-blue-600 underline">
              {tr.errorRetry}
            </button>
          </div>
        )}

        {/* Done */}
        {stage === 'done' && result && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-green-50 border-b border-green-100 px-5 py-3 flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-sm font-semibold text-green-700">{tr.doneTitle}</span>
              </div>
              <div className="p-4">
                <img
                  src={result.dataUrl}
                  alt="Watermarked preview"
                  className="w-full rounded-xl object-contain max-h-80"
                />
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full py-4 rounded-2xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:scale-[0.98] transition flex items-center justify-center gap-2"
            >
              <Download size={18} />
              {tr.btnDownload}
            </button>

            <button
              onClick={handleReset}
              className="w-full py-3 rounded-2xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition"
            >
              {tr.btnAnother}
            </button>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-amber-700 leading-relaxed">
              {tr.tipText(
                recipient.trim(),
                finalPurpose.trim(),
                new Date(addDays(expiryDays)).toLocaleDateString(tr.dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })
              )}
            </div>

            <div className="bg-slate-900 rounded-2xl p-5 text-center space-y-2">
              <p className="text-white text-sm font-semibold">{tr.returnTitle}</p>
              <p className="text-slate-400 text-xs">{tr.returnSub}</p>
              <a
                href="#/"
                className="mt-1 block w-full py-3 rounded-xl bg-white text-slate-900 text-sm font-semibold hover:bg-slate-100 transition"
              >
                {tr.returnBtn}
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
