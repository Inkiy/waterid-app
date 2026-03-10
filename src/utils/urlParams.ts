import type { LangCode } from '../i18n';

export interface WatermarkParams {
  host: string;
  purpose: string;
  expires: string;
  style: 'standard' | 'strict' | 'official';
  lang?: LangCode;
}

export function encodeParams(params: WatermarkParams): string {
  return btoa(encodeURIComponent(JSON.stringify(params)));
}

export function decodeParams(encoded: string): WatermarkParams | null {
  try {
    const decoded = JSON.parse(decodeURIComponent(atob(encoded)));
    if (!decoded.host || !decoded.purpose || !decoded.expires) return null;
    return decoded as WatermarkParams;
  } catch {
    return null;
  }
}

export function buildUploadUrl(params: WatermarkParams): string {
  const encoded = encodeParams(params);
  return `${window.location.origin}${window.location.pathname}#/upload/${encoded}`;
}

export function formatExpiry(isoDate: string, locale = 'en-US'): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
}

export function isExpired(isoDate: string): boolean {
  return new Date(isoDate) < new Date();
}
