import { useState } from 'react';
import { Shield, MessageSquare } from 'lucide-react';
import { LANGUAGES, type LangCode } from '../i18n';

const CONTACT_EMAIL = 'itsbonnibear@gmail.com';

export default function Contact({ initialLang = 'en' }: { initialLang?: LangCode }) {
  const [lang, setLang] = useState<LangCode>(initialLang);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  const isZh = lang === 'zh';

  const typeOptions = isZh
    ? ['功能建议', '问题反馈', '合作咨询', '其他']
    : ['Feature request', 'Bug report', 'Partnership', 'Other'];

  const handleLangChange = (newLang: LangCode) => {
    setLang(newLang);
    window.location.hash = newLang === 'en' ? '#/contact' : `#/contact/${newLang}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = isZh
      ? `[印证反馈] ${type || '其他'} - ${name}`
      : `[WaterID Feedback] ${type || 'Other'} - ${name}`;
    const body = isZh
      ? `姓名: ${name}\n类型: ${type}\n\n内容:\n${message}`
      : `Name: ${name}\nType: ${type}\n\nMessage:\n${message}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => { window.location.hash = '#/'; }}
            className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0"
          >
            <Shield size={20} className="text-white" />
          </button>
          <div className="flex-1">
            <p className="text-base font-bold text-slate-800">{isZh ? '印证' : 'WaterID'}</p>
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

      <main className="max-w-lg mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-100 mb-4">
            <MessageSquare size={22} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            {isZh ? '联系我们' : 'Contact & Feedback'}
          </h1>
          <p className="text-sm text-slate-500">
            {isZh
              ? '有问题、建议或合作意向，欢迎告诉我们。'
              : 'Questions, suggestions, or partnership inquiries — we'd love to hear from you.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  {isZh ? '你的名字' : 'Your name'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={isZh ? '张三' : 'Jane Smith'}
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  {isZh ? '类型' : 'Type'}
                </label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700"
                >
                  <option value="">{isZh ? '请选择' : 'Select…'}</option>
                  {typeOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                {isZh ? '内容' : 'Message'}
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={isZh ? '请描述你的问题或建议…' : 'Describe your issue or suggestion…'}
                required
                rows={5}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:scale-[0.98] transition"
            >
              {isZh ? '发送 →' : 'Send →'}
            </button>

            <p className="text-xs text-slate-400 text-center">
              {isZh
                ? '点击后会打开你的邮件应用，直接发送即可。'
                : 'Clicking will open your mail app — just hit send.'}
            </p>
          </form>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => { window.location.hash = '#/'; }}
            className="text-sm text-slate-400 hover:text-slate-600 transition"
          >
            {isZh ? '← 返回首页' : '← Back to home'}
          </button>
        </div>
      </main>
    </div>
  );
}
