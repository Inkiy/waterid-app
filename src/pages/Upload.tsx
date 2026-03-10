import { useState, useRef, useCallback } from 'react';
import { Shield, Upload, Download, AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import { decodeParams, formatExpiry, isExpired, type WatermarkParams } from '../utils/urlParams';
import { applyWatermark, type WatermarkResult } from '../utils/watermark';
import { t, LANGUAGES } from '../i18n';
import type { LangCode } from '../i18n';

interface UploadPageProps {
  encoded: string;
}

type Stage = 'idle' | 'processing' | 'done' | 'error';

const VALID_LANGS = LANGUAGES.map(l => l.code);

export default function UploadPage({ encoded }: UploadPageProps) {
  const params: WatermarkParams | null = decodeParams(encoded);
  const browserLang = navigator.language.split('-')[0] as LangCode;
  const uiLang = VALID_LANGS.includes(browserLang) ? browserLang : (params?.lang ?? 'en');
  const tr = t(uiLang);

  const [stage, setStage] = useState<Stage>('idle');
  const [result, setResult] = useState<WatermarkResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!params) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg(tr.uploadFormats);
      setStage('error');
      return;
    }
    setFileName(file.name);
    setStage('processing');
    try {
      const res = await applyWatermark(file, params);
      setResult(res);
      setStage('done');
    } catch (e) {
      setErrorMsg((e as Error).message || 'Processing failed, please try again');
      setStage('error');
    }
  }, [params, tr]);

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

  // Invalid or malformed link
  if (!params) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-sm border border-slate-100">
          <AlertTriangle className="mx-auto mb-4 text-amber-500" size={40} />
          <h2 className="text-lg font-bold text-slate-800 mb-2">{tr.invalidTitle}</h2>
          <p className="text-sm text-slate-500">{tr.invalidBody}</p>
        </div>
      </div>
    );
  }

  // Expired
  if (isExpired(params.expires)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-sm border border-red-100">
          <AlertTriangle className="mx-auto mb-4 text-red-500" size={40} />
          <h2 className="text-lg font-bold text-slate-800 mb-2">{tr.expiredTitle}</h2>
          <p className="text-sm text-slate-500">
            {tr.expiredBody(params.host, formatExpiry(params.expires, tr.dateLocale))}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800">{tr.appTitle}</h1>
            <p className="text-xs text-slate-500">{tr.appSubtitle}</p>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 space-y-5">
        {/* Authorization info card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <p className="text-xs text-slate-400 mb-3 uppercase tracking-wide font-medium">{tr.authDetails}</p>
          <div className="space-y-2.5">
            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-slate-500 flex-shrink-0">{tr.authRequester}</span>
              <span className="text-sm font-semibold text-slate-800 text-right break-words min-w-0">{params.host}</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-slate-500 flex-shrink-0">{tr.authPurpose}</span>
              <span className="text-sm font-semibold text-slate-800 text-right break-words min-w-0">{params.purpose}</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="text-sm text-slate-500 flex-shrink-0">{tr.authValidUntil}</span>
              <span className="text-sm font-semibold text-slate-800 text-right">{formatExpiry(params.expires, tr.dateLocale)}</span>
            </div>
          </div>
        </div>

        {/* Security notice */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-3">
          <Shield size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-green-800">{tr.securityTitle}</p>
            <p className="text-xs text-green-700 mt-1 leading-relaxed">{tr.securityBody}</p>
          </div>
        </div>

        {/* Upload zone */}
        {stage === 'idle' && (
          <div
            onClick={() => inputRef.current?.click()}
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
            <button
              onClick={() => { setStage('idle'); setErrorMsg(''); }}
              className="text-sm text-blue-600 underline"
            >
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
              onClick={() => { setStage('idle'); setResult(null); setFileName(''); }}
              className="w-full py-3 rounded-2xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition"
            >
              {tr.btnAnother}
            </button>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-amber-700 leading-relaxed">
              {tr.tipText(params.host, params.purpose, formatExpiry(params.expires, tr.dateLocale))}
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
