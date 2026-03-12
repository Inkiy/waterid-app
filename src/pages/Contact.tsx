import { useEffect } from 'react';

const FORM_URL = 'https://forms.gle/oxF1A5ZHekJnrLET8';

export default function Contact() {
  useEffect(() => {
    window.location.replace(FORM_URL);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <p className="text-sm text-slate-400">Redirecting… / 跳转中…</p>
    </div>
  );
}
