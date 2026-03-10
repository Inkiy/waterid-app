import { useState } from 'react';
import { Shield, Home, CheckCircle, Lock, Clock, FileText, ChevronRight, ArrowRight } from 'lucide-react';
import { LANGUAGES, type LangCode } from '../i18n';

const L = {
  en: {
    nav: 'WaterID',
    navSub: 'ID Protection for Rentals',
    hero: 'Verify Guest IDs Without the Risk',
    heroSub:
      'Send a secure link. Your guest watermarks their own ID in their browser — tied to your property, your purpose, and an expiry date. You receive a protected copy. We store nothing.',
    ctaPrimary: 'Generate Your First Link →',
    ctaLearnTenant: 'Are you a guest? →',
    howTitle: 'How it works — 3 steps',
    steps: [
      {
        n: '1',
        title: 'Enter your details',
        body: 'Type your property name and choose the purpose (check-in, deposit, contract). Set how long the link should be valid.',
      },
      {
        n: '2',
        title: 'Copy & send the link',
        body: 'Share the generated link via WhatsApp, email, or any messaging app. The link opens a secure upload page for your guest.',
      },
      {
        n: '3',
        title: 'Receive a watermarked ID',
        body: 'Your guest uploads their ID in their own browser. A watermark is stamped — tied to you, the purpose, and the expiry. They download and send it to you.',
      },
    ],
    previewTitle: 'What the watermarked ID looks like',
    previewWm: 'For Airbnb Check-in · Auth: John\'s Listing · Valid until 2025-04-01',
    whyTitle: 'Why hosts use WaterID',
    why: [
      {
        icon: '🔒',
        title: 'Zero server storage',
        body: 'Watermarking runs entirely in your guest\'s browser. You never handle raw ID files on your servers — cleaner legally and for GDPR.',
      },
      {
        icon: '🛡️',
        title: 'Tamper-proof watermark',
        body: 'The watermark tiles across the full image including the face and document number. AI inpainting cannot remove it without visibly destroying the document.',
      },
      {
        icon: '⏰',
        title: 'Auto-expiry',
        body: 'Set 1 week, 1 month, or longer. After expiry the watermark proves the ID is no longer valid for new use — protecting both parties.',
      },
      {
        icon: '📋',
        title: 'Purpose-locked',
        body: 'The watermark states the exact purpose. If the guest\'s ID is ever used elsewhere, the watermark makes misuse traceable.',
      },
      {
        icon: '🌍',
        title: '11 languages',
        body: 'The upload page auto-translates. International guests see instructions in their language — no confusion, no excuses.',
      },
      {
        icon: '💸',
        title: 'Completely free',
        body: 'No account, no subscription, no limits. Open the tool, generate a link, done.',
      },
    ],
    useCasesTitle: 'Built for these situations',
    useCases: [
      { icon: '🏠', label: 'Airbnb & short-term rentals', desc: 'Check-in ID verification tied to your listing name and move-in date.' },
      { icon: '📝', label: 'Long-term rental deposits', desc: 'Collect tenant ID for deposit agreements — watermarked, purpose-locked, legally safer.' },
      { icon: '🏨', label: 'Hotels & guesthouses', desc: 'Booking verification for non-card reservations or advance payments.' },
      { icon: '✍️', label: 'Contract signing', desc: 'Before signing a lease, collect a watermarked ID to match the signatory.' },
    ],
    faqTitle: 'Common questions',
    faqs: [
      {
        q: 'Does WaterID store my guest\'s ID?',
        a: 'No. The entire watermarking process runs in the guest\'s browser using the Canvas API. No image data is ever sent to any server. We are technically incapable of seeing their ID.',
      },
      {
        q: 'Can the watermark be removed?',
        a: 'The watermark is rendered diagonally across the entire image at high opacity, including over the photo and document number. AI inpainting tools would need to fill in the face and all document details — producing a clearly fake result. It is not removable cleanly.',
      },
      {
        q: 'What if my guest loses the link or it expires?',
        a: 'Just generate a new link. Takes under 30 seconds. The old link stops accepting uploads once it expires.',
      },
      {
        q: 'Is there an app to install?',
        a: 'No. WaterID is a web tool — it works on any smartphone, tablet, or desktop browser without installation.',
      },
    ],
    ctaBottomTitle: 'Ready to collect IDs safely?',
    ctaBottomSub: 'Generate a link in under a minute. No sign-up required.',
    ctaBottom: 'Get Started Free →',
    backToHome: '← Back to home',
  },
  zh: {
    nav: '印证',
    navSub: '租赁证件保护工具',
    hero: '无风险核验租客证件',
    heroSub:
      '生成一条专属链接发给对方。租客在自己的浏览器里给证件加上水印——绑定你的民宿名称、用途和有效期。你收到的是受保护的版本。我们不存储任何内容。',
    ctaPrimary: '立即生成链接 →',
    ctaLearnTenant: '你是租客？→',
    howTitle: '三步完成，全程不超过一分钟',
    steps: [
      {
        n: '1',
        title: '填写你的信息',
        body: '输入你的民宿/房源名称，选择证件用途（入住核验、押金担保、合同签署）。设置链接有效期。',
      },
      {
        n: '2',
        title: '复制链接，发给租客',
        body: '通过微信、短信或任意方式分享生成的链接。链接打开一个安全的上传页面，界面会自动适配租客的语言。',
      },
      {
        n: '3',
        title: '收到水印版证件',
        body: '租客在自己的设备上上传证件，水印在他们的浏览器里生成——绑定你的名称、用途和有效期。租客下载后发给你。',
      },
    ],
    previewTitle: '水印效果预览',
    previewWm: '仅用于 Airbnb 入住核验 · 授权方：张三民宿 · 有效期至 2025-04-01',
    whyTitle: '房东为什么用印证',
    why: [
      {
        icon: '🔒',
        title: '服务器零存储',
        body: '水印处理完全在租客的浏览器里完成，原始证件图片从不经过你或我们的服务器——对 GDPR 合规和法律风险更安全。',
      },
      {
        icon: '🛡️',
        title: '防 AI 清除水印',
        body: '水印密铺整张图片，覆盖人脸和证件号码。AI 修复工具若要删除水印，必须重建人脸和所有证件信息，结果必然是一张明显伪造的图片。',
      },
      {
        icon: '⏰',
        title: '自动过期',
        body: '设置 1 周、1 个月或更长。过期后水印本身即可证明该证件已不再有效——保护双方权益。',
      },
      {
        icon: '📋',
        title: '用途明确绑定',
        body: '水印注明了具体用途。如果租客的证件被用于其他场合，水印即为滥用留下可追溯证据。',
      },
      {
        icon: '🌍',
        title: '11 种语言',
        body: '上传页面自动适配语言。外国租客看到的是自己语言的说明，减少沟通障碍。',
      },
      {
        icon: '💸',
        title: '完全免费',
        body: '无需注册，无需订阅，无使用次数限制。打开即用，生成即走。',
      },
    ],
    useCasesTitle: '适用场景',
    useCases: [
      { icon: '🏠', label: 'Airbnb / 短租民宿', desc: '入住时核验证件，水印绑定你的房源名称和入住日期。' },
      { icon: '📝', label: '长租押金担保', desc: '签押金协议前收取水印版证件，用途锁定，法律风险更低。' },
      { icon: '🏨', label: '酒店/客栈预订', desc: '针对非刷卡预订或预付款场景的身份核验。' },
      { icon: '✍️', label: '合同签署前核验', desc: '在签署租房合同前，收取水印证件与签约人身份匹配。' },
    ],
    faqTitle: '常见问题',
    faqs: [
      {
        q: '印证会存储租客的证件吗？',
        a: '不会。整个水印处理过程在租客的浏览器里通过 Canvas API 完成，图片数据从不发送到任何服务器。我们在技术层面无法看到租客的证件。',
      },
      {
        q: '水印可以被 PS 掉吗？',
        a: '水印以高不透明度斜向铺满整张图，包括人脸和证件号码。AI 修复工具若要清除，必须重绘人脸和全部证件信息，结果必然是一张肉眼可见的伪造件。无法干净清除。',
      },
      {
        q: '租客链接失效了怎么办？',
        a: '重新生成一条新链接，30 秒以内搞定。旧链接在到期后自动停止接受上传。',
      },
      {
        q: '需要安装 App 吗？',
        a: '不需要。印证是纯网页工具，手机、平板、电脑的浏览器都能用，无需安装任何东西。',
      },
    ],
    ctaBottomTitle: '准备好安全收证件了吗？',
    ctaBottomSub: '一分钟内生成链接，无需注册。',
    ctaBottom: '免费开始使用 →',
    backToHome: '← 返回首页',
  },
} as const;

function FakeIDWithWatermark({ watermarkText, lang }: { watermarkText: string; lang: 'en' | 'zh' }) {
  const label = lang === 'zh' ? '证件照' : 'Photo';
  const nameLabel = lang === 'zh' ? '姓名' : 'Name';
  const dobLabel = lang === 'zh' ? '出生日期' : 'Date of Birth';
  const idLabel = lang === 'zh' ? '证件号' : 'ID Number';

  const repeats = Array.from({ length: 9 });

  return (
    <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 rounded-2xl p-5 overflow-hidden select-none shadow-inner">
      {/* ID card layout */}
      <div className="flex gap-4 relative z-10">
        {/* Photo placeholder */}
        <div className="w-20 h-24 bg-slate-200 rounded-xl flex-shrink-0 flex flex-col items-center justify-center gap-1 border border-slate-300">
          <div className="w-10 h-10 rounded-full bg-slate-300" />
          <div className="w-14 h-6 rounded bg-slate-300" />
          <p className="text-[9px] text-slate-400 font-medium">{label}</p>
        </div>
        {/* Fields */}
        <div className="flex-1 space-y-2 pt-1">
          <div>
            <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wide mb-0.5">{nameLabel}</p>
            <div className="h-3 bg-slate-300 rounded w-28" />
          </div>
          <div>
            <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wide mb-0.5">{dobLabel}</p>
            <div className="h-3 bg-slate-300 rounded w-20" />
          </div>
          <div>
            <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wide mb-0.5">{idLabel}</p>
            <div className="h-3 bg-slate-200 rounded w-32" />
          </div>
          <div className="h-2 bg-slate-200 rounded w-16 mt-1" />
        </div>
      </div>

      {/* Watermark overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {repeats.map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 text-blue-500/35 font-bold whitespace-nowrap text-[10px] leading-none"
            style={{
              top: `${i * 28 - 20}px`,
              transform: 'rotate(-25deg) translateX(-20px)',
              letterSpacing: '0.05em',
            }}
          >
            {watermarkText} &nbsp;&nbsp;&nbsp; {watermarkText}
          </div>
        ))}
      </div>
    </div>
  );
}

type Step = { n: string; title: string; body: string };
function StepFlow({ steps }: { steps: readonly Step[] }) {
  return (
    <div className="space-y-4">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          {/* Number + connector */}
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-md">
              {step.n}
            </div>
            {i < steps.length - 1 && (
              <div className="w-0.5 h-8 bg-blue-200 mt-1" />
            )}
          </div>
          {/* Content */}
          <div className="pb-2">
            <p className="font-semibold text-slate-800 text-sm">{step.title}</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LandingHost({ initialLang = 'en' }: { initialLang?: LangCode }) {
  const [lang, setLang] = useState<LangCode>(initialLang);
  const displayLang = lang === 'zh' ? 'zh' : 'en';
  const tr = L[displayLang];

  const handleLangChange = (newLang: LangCode) => {
    setLang(newLang);
    window.location.hash = newLang === 'en' ? '#/for-hosts' : `#/for-hosts/${newLang}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => { window.location.hash = '#/'; }}
            className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0"
          >
            <Shield size={16} className="text-white" />
          </button>
          <div className="flex-1 min-w-0">
            <span className="text-sm font-bold text-slate-800">{tr.nav}</span>
            <span className="text-xs text-slate-400 ml-2 hidden sm:inline">{tr.navSub}</span>
          </div>
          <select
            value={lang}
            onChange={e => handleLangChange(e.target.value as LangCode)}
            className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-12">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-xs font-semibold mb-2">
            <Home size={13} />
            {displayLang === 'zh' ? '适合房东 / 民宿主' : 'For Hosts & Landlords'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {tr.hero}
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {tr.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => { window.location.hash = lang === 'en' ? '#/host' : `#/host/${lang}`; }}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold rounded-xl px-6 py-3.5 text-sm hover:bg-blue-700 active:scale-[0.98] transition shadow-md"
            >
              {tr.ctaPrimary}
            </button>
            <button
              onClick={() => { window.location.hash = lang === 'en' ? '#/for-tenants' : `#/for-tenants/${lang}`; }}
              className="inline-flex items-center justify-center gap-1 text-slate-500 text-sm hover:text-blue-600 transition"
            >
              {tr.ctaLearnTenant}
            </button>
          </div>
        </section>

        {/* How it works + ID preview side-by-side */}
        <section className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-base font-bold text-slate-800 mb-5">{tr.howTitle}</h2>
            <StepFlow steps={tr.steps} />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4">
            <h2 className="text-base font-bold text-slate-800">{tr.previewTitle}</h2>
            <FakeIDWithWatermark watermarkText={tr.previewWm} lang={displayLang} />
            <div className="flex items-start gap-2 bg-blue-50 rounded-xl p-3">
              <CheckCircle size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-700 leading-relaxed">
                {displayLang === 'zh'
                  ? '水印密铺整张图，覆盖人脸区域，AI 工具无法干净清除'
                  : 'Watermark tiles over the entire image including the face — AI tools cannot cleanly remove it'}
              </p>
            </div>
          </div>
        </section>

        {/* Why hosts use WaterID */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">{tr.whyTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tr.why.map((w, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="text-2xl mb-3">{w.icon}</div>
                <p className="font-semibold text-slate-800 text-sm mb-1">{w.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use cases */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-5 text-center">{tr.useCasesTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tr.useCases.map((uc, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex gap-4">
                <span className="text-2xl flex-shrink-0">{uc.icon}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{uc.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Security trust bar */}
        <section className="bg-slate-900 rounded-2xl p-6 text-white">
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Lock size={22} className="text-blue-400" />
              <p className="text-sm font-semibold">
                {displayLang === 'zh' ? '服务器零存储' : 'Zero server storage'}
              </p>
              <p className="text-xs text-slate-400">
                {displayLang === 'zh' ? '图片全程不离开租客设备' : 'Images never leave the guest\'s device'}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FileText size={22} className="text-green-400" />
              <p className="text-sm font-semibold">
                {displayLang === 'zh' ? '无需注册' : 'No account needed'}
              </p>
              <p className="text-xs text-slate-400">
                {displayLang === 'zh' ? '打开即用，没有任何门槛' : 'Open and use — no sign-up, no friction'}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock size={22} className="text-amber-400" />
              <p className="text-sm font-semibold">
                {displayLang === 'zh' ? '一分钟搞定' : 'Under one minute'}
              </p>
              <p className="text-xs text-slate-400">
                {displayLang === 'zh' ? '从打开到链接发出，全程不超过 60 秒' : 'From open to link sent in under 60 seconds'}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-5 text-center">{tr.faqTitle}</h2>
          <div className="space-y-3">
            {tr.faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm group">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                  <span className="font-medium text-slate-800 text-sm pr-4">{faq.q}</span>
                  <ChevronRight size={16} className="text-slate-400 flex-shrink-0 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA bottom */}
        <section className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">{tr.ctaBottomTitle}</h2>
          <p className="text-blue-100 text-sm mb-6">{tr.ctaBottomSub}</p>
          <button
            onClick={() => { window.location.hash = lang === 'en' ? '#/host' : `#/host/${lang}`; }}
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold rounded-xl px-8 py-3.5 text-sm hover:bg-blue-50 active:scale-[0.98] transition shadow-md"
          >
            {tr.ctaBottom}
            <ArrowRight size={16} />
          </button>
        </section>

        {/* Back */}
        <div className="text-center pb-6">
          <button
            onClick={() => { window.location.hash = '#/'; }}
            className="text-sm text-slate-400 hover:text-slate-600 transition"
          >
            {tr.backToHome}
          </button>
        </div>
      </main>
    </div>
  );
}
