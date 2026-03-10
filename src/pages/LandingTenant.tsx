import { useState } from 'react';
import { Shield, User, CheckCircle, Lock, Eye, EyeOff, ChevronRight, ArrowRight, Smartphone } from 'lucide-react';
import { LANGUAGES, type LangCode } from '../i18n';

const L = {
  en: {
    nav: 'WaterID',
    navSub: 'ID Protection for Renters',
    badge: 'For Tenants & Guests',
    hero: 'Share Your ID Without Risking Misuse',
    heroSub:
      "Your landlord or host needs ID — but you can't control what they do with it. WaterID stamps a watermark that limits use to their name, your stated purpose, and an expiry date. Processed entirely in your browser. We never see your document.",
    ctaPrimary: 'Add Watermark to My ID →',
    ctaLearnHost: 'Are you a host? →',
    howTitle: 'How it works for tenants',
    steps: [
      {
        n: '1',
        title: 'Open the link — or use self-service',
        body: "If your host sent you a link, open it. Or tap the button below to fill in the details yourself — who it's for and why.",
      },
      {
        n: '2',
        title: 'Upload your ID',
        body: "Select your ID photo from your phone or computer. The image is loaded directly into your browser's memory — it never travels anywhere.",
      },
      {
        n: '3',
        title: 'Download the watermarked copy',
        body: 'The watermark is stamped on your ID in seconds. Download the protected copy and send it to your host. Keep the original safe.',
      },
    ],
    wmExplainTitle: 'What the watermark does',
    wmPoints: [
      {
        icon: '🏷️',
        title: 'Locks it to one recipient',
        body: "The host's name is embedded in the watermark. If your ID surfaces somewhere else, the watermark shows who received it.",
      },
      {
        icon: '📋',
        title: 'States the exact purpose',
        body: 'Whether it\'s "Airbnb check-in" or "rental deposit", the purpose is written across the document. Using it for anything else is visibly fraudulent.',
      },
      {
        icon: '⏰',
        title: 'Expires automatically',
        body: "After the validity period, the watermark shows the authorization has ended. A screenshot taken later is clearly expired and unauthorized.",
      },
      {
        icon: '🛡️',
        title: 'Cannot be cleanly removed',
        body: 'The watermark tiles diagonally over your photo and all document details. AI tools cannot inpaint over it without visibly destroying the document.',
      },
    ],
    previewTitle: 'Before vs. After',
    previewBefore: 'Original ID',
    previewAfter: 'Watermarked copy',
    previewBeforeWarn: 'Anyone who receives this can use it for anything.',
    previewAfterOk: 'Use is locked to this host, this purpose, and this expiry.',
    privacyTitle: 'Your privacy, guaranteed',
    privacy: [
      { icon: '🖥️', title: '100% in-browser processing', body: 'The watermark is drawn using the Canvas API inside your browser tab. No upload. No server. No log.' },
      { icon: '👁️', title: 'We cannot see your ID', body: 'We have no server infrastructure that touches your image. Technically impossible for us to view it.' },
      { icon: '📵', title: 'No account required', body: 'No email, no sign-up, no tracking. Open the link, upload, download, done.' },
      { icon: '🗑️', title: 'Nothing is retained', body: "Once you close the tab, the image is gone from memory. There's nothing to delete because nothing was stored." },
    ],
    faqTitle: 'Questions tenants ask',
    faqs: [
      {
        q: "My host just asked for my ID by email. Do I need their link?",
        a: "No. Use the self-service option on the home page: tap 'I'm a Tenant / Guest', fill in the host's name and purpose yourself, upload your ID, and send them the watermarked copy. No link from them needed.",
      },
      {
        q: 'Will the watermark affect the readability of my ID?',
        a: 'The watermark is semi-transparent and repeating. All key fields — photo, name, document number, expiry — remain readable. The host can verify your identity; they just cannot misuse the document.',
      },
      {
        q: "Can I trust this site with my ID photo?",
        a: 'You can verify it yourself: open your browser\'s Network tab (DevTools → Network), then upload your photo. You will see zero outgoing requests with image data. The processing is entirely local.',
      },
      {
        q: 'What if the host rejects the watermarked copy?',
        a: "A legitimate host has no reason to reject it — the watermark doesn't obscure any verification fields. If they insist on an unwatermarked ID, that's a significant red flag worth considering before proceeding.",
      },
      {
        q: 'Is WaterID a company that stores my data?',
        a: 'WaterID is a static web tool. There is no backend database. Your image never leaves your device, and no personal information is collected.',
      },
    ],
    ctaBottomTitle: 'Protect your ID before you send it',
    ctaBottomSub: "Takes 20 seconds. Your document never leaves your device.",
    ctaBottom: 'Add Watermark Now →',
    backToHome: '← Back to home',
  },
  zh: {
    nav: '印证',
    navSub: '租客证件保护工具',
    badge: '适合租客 / 住客',
    hero: '发证件，但不让对方随意使用',
    heroSub:
      '房东要看证件——但你没法控制他们拿去做什么。印证在你的证件上加一层水印，将使用权绑定到对方名称、用途和有效期。全程在你的浏览器里完成，我们看不到你的任何证件。',
    ctaPrimary: '给我的证件加水印 →',
    ctaLearnHost: '你是房东？→',
    howTitle: '租客使用流程',
    steps: [
      {
        n: '1',
        title: '打开链接，或自行填写',
        body: '如果房东发了链接给你，直接打开。或者点下方按钮自己填写：写明发给谁、用途是什么。',
      },
      {
        n: '2',
        title: '上传你的证件',
        body: '从手机相册或电脑选择证件照片。图片直接加载到你的浏览器内存里，不会传到任何地方。',
      },
      {
        n: '3',
        title: '下载水印版，发给房东',
        body: '水印在几秒内叠加到证件上。下载受保护的版本，发给房东。原件继续保存在你自己这里。',
      },
    ],
    wmExplainTitle: '水印能做什么',
    wmPoints: [
      {
        icon: '🏷️',
        title: '绑定到唯一收件方',
        body: '房东的名称嵌入在水印里。如果你的证件出现在其他地方，水印清楚标明是谁收到了这份证件。',
      },
      {
        icon: '📋',
        title: '明确注明用途',
        body: '不管是「Airbnb 入住」还是「押金担保」，用途都写在证件上。拿去做其他用途，一眼就是伪造。',
      },
      {
        icon: '⏰',
        title: '自动过期',
        body: '有效期过后，水印本身就说明授权已终止。对方拿着过期截图也没有任何合法性。',
      },
      {
        icon: '🛡️',
        title: '无法干净清除',
        body: '水印斜向铺满整张图，覆盖你的人脸和所有证件信息。AI 修复工具若要清除，必须重绘人脸和所有字段——结果必然一眼假。',
      },
    ],
    previewTitle: '发送前 vs. 加水印后',
    previewBefore: '原始证件',
    previewAfter: '水印版本',
    previewBeforeWarn: '收到的人可以拿去做任何事。',
    previewAfterOk: '使用权锁定到该房东、该用途、该有效期。',
    privacyTitle: '隐私保障，有据可查',
    privacy: [
      { icon: '🖥️', title: '100% 浏览器本地处理', body: '水印通过 Canvas API 在你的浏览器标签页内绘制，不上传，不经过服务器，不留日志。' },
      { icon: '👁️', title: '我们无法看到你的证件', body: '我们没有任何触碰图片的服务器基础设施。从技术层面，我们不可能看到它。' },
      { icon: '📵', title: '无需注册账号', body: '不需要邮箱，不需要注册，无追踪。打开链接，上传，下载，完成。' },
      { icon: '🗑️', title: '关掉就消失', body: '关闭标签页，图片从内存里消失。因为从来没有存储，所以也不需要删除。' },
    ],
    faqTitle: '租客常见问题',
    faqs: [
      {
        q: '房东直接叫我发证件，不用链接，可以用印证吗？',
        a: '可以。在首页选择「我是租客/住客」，自己填写房东名称和用途，上传证件，下载水印版发给房东。不需要对方的链接。',
      },
      {
        q: '水印会不会让证件信息看不清？',
        a: '水印是半透明重复叠加的。关键字段——照片、姓名、证件号、有效期——仍然清晰可读。房东可以核验你的身份，只是无法滥用这份证件。',
      },
      {
        q: '我能确认图片真的没有上传到服务器吗？',
        a: '可以自己验证：打开浏览器的开发者工具（F12 → Network 面板），然后上传照片。你会看到没有任何包含图片数据的外发请求。处理完全在本地。',
      },
      {
        q: '如果房东拒绝水印版证件怎么办？',
        a: '合法的房东没有理由拒绝——水印不遮挡任何核验字段。如果对方坚持要未加水印的原件，这本身就是一个值得认真考虑的危险信号。',
      },
      {
        q: '印证是一家公司，会保存我的数据吗？',
        a: '印证是一个纯静态网页工具，没有后端数据库。你的图片不会离开你的设备，也不收集任何个人信息。',
      },
    ],
    ctaBottomTitle: '发出去之前，先保护好自己',
    ctaBottomSub: '20 秒完成，证件全程不离开你的设备。',
    ctaBottom: '立即添加水印 →',
    backToHome: '← 返回首页',
  },
} as const;

function FakeIDCard({ label, watermarked, watermarkText, lang }: {
  label: string;
  watermarked: boolean;
  watermarkText: string;
  lang: 'en' | 'zh';
}) {
  const photoLabel = lang === 'zh' ? '照片' : 'Photo';
  const repeats = Array.from({ length: 9 });

  return (
    <div className="flex-1">
      <p className="text-xs font-semibold text-center mb-2 text-slate-600">{label}</p>
      <div className={`relative rounded-xl border-2 p-4 overflow-hidden ${watermarked ? 'border-green-300 bg-green-50/50' : 'border-red-200 bg-red-50/30'}`}>
        <div className="flex gap-3">
          <div className="w-14 h-16 bg-slate-200 rounded-lg flex-shrink-0 flex flex-col items-center justify-center border border-slate-300">
            <div className="w-7 h-7 rounded-full bg-slate-300" />
            <div className="w-10 h-4 rounded bg-slate-300 mt-1" />
            <p className="text-[8px] text-slate-400 mt-0.5">{photoLabel}</p>
          </div>
          <div className="flex-1 space-y-1.5 pt-0.5">
            <div className="h-2.5 bg-slate-300 rounded w-20" />
            <div className="h-2 bg-slate-200 rounded w-14" />
            <div className="h-2 bg-slate-200 rounded w-18" />
            <div className="h-2 bg-slate-200 rounded w-12" />
          </div>
        </div>
        {watermarked && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {repeats.map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 text-blue-500/35 font-bold whitespace-nowrap leading-none"
                style={{
                  top: `${i * 22 - 15}px`,
                  transform: 'rotate(-25deg) translateX(-15px)',
                  fontSize: '8px',
                  letterSpacing: '0.03em',
                }}
              >
                {watermarkText} &nbsp; {watermarkText}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={`mt-2 flex items-start gap-1.5 text-xs rounded-lg px-2 py-1.5 ${watermarked ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
        {watermarked
          ? <><CheckCircle size={12} className="flex-shrink-0 mt-0.5" /><span>{lang === 'zh' ? '使用权锁定到该房东、该用途、该有效期' : 'Use is locked to this host, this purpose, and this expiry.'}</span></>
          : <><EyeOff size={12} className="flex-shrink-0 mt-0.5" /><span>{lang === 'zh' ? '收到的人可以拿去做任何事' : 'Anyone who receives this can use it for anything.'}</span></>
        }
      </div>
    </div>
  );
}

export default function LandingTenant({ initialLang = 'en' }: { initialLang?: LangCode }) {
  const [lang, setLang] = useState<LangCode>(initialLang);
  const displayLang = lang === 'zh' ? 'zh' : 'en';
  const tr = L[displayLang];

  const handleLangChange = (newLang: LangCode) => {
    setLang(newLang);
    window.location.hash = newLang === 'en' ? '#/for-tenants' : `#/for-tenants/${newLang}`;
  };

  const wmSample = displayLang === 'zh'
    ? '仅用于 Airbnb 入住 · 授权方：张三民宿 · 有效期至 2025-04-01'
    : "For Airbnb Check-in · Auth: John's Listing · Valid until 2025-04-01";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => { window.location.hash = '#/'; }}
            className="w-8 h-8 rounded-xl bg-green-600 flex items-center justify-center flex-shrink-0"
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
            className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500"
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
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-1.5 text-xs font-semibold mb-2">
            <User size={13} />
            {tr.badge}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {tr.hero}
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {tr.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => { window.location.hash = lang === 'en' ? '#/tenant' : `#/tenant/${lang}`; }}
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white font-semibold rounded-xl px-6 py-3.5 text-sm hover:bg-green-700 active:scale-[0.98] transition shadow-md"
            >
              {tr.ctaPrimary}
            </button>
            <button
              onClick={() => { window.location.hash = lang === 'en' ? '#/for-hosts' : `#/for-hosts/${lang}`; }}
              className="inline-flex items-center justify-center gap-1 text-slate-500 text-sm hover:text-green-600 transition"
            >
              {tr.ctaLearnHost}
            </button>
          </div>
        </section>

        {/* How it works */}
        <section className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-base font-bold text-slate-800 mb-5">{tr.howTitle}</h2>
            <div className="space-y-4">
              {tr.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-green-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-md">
                      {step.n}
                    </div>
                    {i < tr.steps.length - 1 && <div className="w-0.5 h-8 bg-green-200 mt-1" />}
                  </div>
                  <div className="pb-2">
                    <p className="font-semibold text-slate-800 text-sm">{step.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Before / After */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-base font-bold text-slate-800 mb-4">{tr.previewTitle}</h2>
            <div className="flex gap-3">
              <FakeIDCard
                label={tr.previewBefore}
                watermarked={false}
                watermarkText={wmSample}
                lang={displayLang}
              />
              <div className="flex items-center self-center">
                <ArrowRight size={18} className="text-slate-300" />
              </div>
              <FakeIDCard
                label={tr.previewAfter}
                watermarked={true}
                watermarkText={wmSample}
                lang={displayLang}
              />
            </div>
          </div>
        </section>

        {/* What the watermark does */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">{tr.wmExplainTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tr.wmPoints.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="text-2xl mb-3">{p.icon}</div>
                <p className="font-semibold text-slate-800 text-sm mb-1">{p.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy guarantee */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">{tr.privacyTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tr.privacy.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex gap-4">
                <span className="text-2xl flex-shrink-0">{p.icon}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{p.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Security trust bar */}
        <section className="bg-slate-900 rounded-2xl p-6 text-white">
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Lock size={22} className="text-green-400" />
              <p className="text-sm font-semibold">
                {displayLang === 'zh' ? '本地处理' : 'Local processing'}
              </p>
              <p className="text-xs text-slate-400">
                {displayLang === 'zh' ? 'Canvas API，浏览器内完成' : 'Canvas API, runs inside your browser tab'}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Eye size={22} className="text-amber-400" />
              <p className="text-sm font-semibold">
                {displayLang === 'zh' ? '零服务器接触' : 'Zero server contact'}
              </p>
              <p className="text-xs text-slate-400">
                {displayLang === 'zh' ? '打开 DevTools 自己验证' : 'Verify yourself with browser DevTools'}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Smartphone size={22} className="text-blue-400" />
              <p className="text-sm font-semibold">
                {displayLang === 'zh' ? '手机直接用' : 'Works on any phone'}
              </p>
              <p className="text-xs text-slate-400">
                {displayLang === 'zh' ? '无需安装任何 App' : 'No app to install, browser only'}
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
        <section className="bg-green-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-2">{tr.ctaBottomTitle}</h2>
          <p className="text-green-100 text-sm mb-6">{tr.ctaBottomSub}</p>
          <button
            onClick={() => { window.location.hash = lang === 'en' ? '#/tenant' : `#/tenant/${lang}`; }}
            className="inline-flex items-center gap-2 bg-white text-green-600 font-bold rounded-xl px-8 py-3.5 text-sm hover:bg-green-50 active:scale-[0.98] transition shadow-md"
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
