import { t, type LangCode } from '../i18n';

export interface WatermarkParams {
  host: string;
  purpose: string;
  expires: string;
  style: 'standard' | 'strict' | 'official';
  lang?: LangCode;
}

// v3: pipe-delimited, preset purposes encoded as single digit index
// Format: "host|purposeIdxOrText|YYMMDD|lang"
// e.g. "ivy|0|260409|en" → base64 → ~20 chars
// Custom purpose prefix with "~": "ivy|~my purpose|260409|en"
export function encodeParams(params: WatermarkParams): string {
  const lang = params.lang ?? 'en';
  const presets = t(lang).purposePresets;
  const presetIdx = presets.indexOf(params.purpose);
  const purposePart = presetIdx >= 0 ? String(presetIdx) : `~${params.purpose}`;
  // Compact date: YYMMDD (2026-04-09 → 260409)
  const datePart = params.expires.replace(/-/g, '').slice(2);
  const raw = `${params.host}\x00${purposePart}\x00${datePart}\x00${lang}`;
  return btoa(unescape(encodeURIComponent(raw)));
}

export function decodeParams(encoded: string): WatermarkParams | null {
  // Try v3 pipe format (null-byte separated)
  try {
    const raw = decodeURIComponent(escape(atob(encoded)));
    const parts = raw.split('\x00');
    if (parts.length === 4) {
      const [host, purposePart, datePart, langCode] = parts;
      const lang = langCode as LangCode;
      const expires = `20${datePart.slice(0, 2)}-${datePart.slice(2, 4)}-${datePart.slice(4, 6)}`;
      const purpose = purposePart.startsWith('~')
        ? purposePart.slice(1)
        : (t(lang).purposePresets[parseInt(purposePart)] ?? purposePart);
      if (host && purpose && expires) {
        return { host, purpose, expires, style: 'standard', lang };
      }
    }
  } catch { /* */ }

  // Try v2 compact JSON format
  try {
    const d = JSON.parse(decodeURIComponent(escape(atob(encoded))));
    if (d.h && d.p && d.e) {
      return { host: d.h, purpose: d.p, expires: d.e, style: 'standard', lang: d.l };
    }
    if (d.host && d.purpose && d.expires) {
      return { ...d, style: d.style ?? 'standard' } as WatermarkParams;
    }
  } catch { /* */ }

  // Try v1 legacy format (old btoa(encodeURIComponent(...)))
  try {
    const d = JSON.parse(decodeURIComponent(atob(encoded)));
    if (!d.host || !d.purpose || !d.expires) return null;
    return { ...d, style: d.style ?? 'standard' } as WatermarkParams;
  } catch {
    return null;
  }
}

export function buildUploadUrl(params: WatermarkParams): string {
  const encoded = encodeParams(params);
  return `${window.location.origin}${window.location.pathname}#${encoded}`;
}

export function formatExpiry(isoDate: string, locale = 'en-US'): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
}

export function isExpired(isoDate: string): boolean {
  return new Date(isoDate) < new Date();
}
