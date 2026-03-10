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
    badge: 'For Hosts & Landlords',
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
    previewWm: "For Airbnb Check-in · Auth: John's Listing · Valid until 2025-04-01",
    previewNote: 'Watermark tiles over the entire image including the face — AI tools cannot cleanly remove it',
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
    photoLabel: 'Photo',
    nameLabel: 'Name',
    dobLabel: 'Date of Birth',
    idLabel: 'ID Number',
    trustStorageTitle: 'Zero server storage',
    trustStorageBody: "Images never leave the guest's device",
    trustAccountTitle: 'No account needed',
    trustAccountBody: 'Open and use — no sign-up, no friction',
    trustTimeTitle: 'Under one minute',
    trustTimeBody: 'From open to link sent in under 60 seconds',
  },
  zh: {
    nav: '印证',
    navSub: '租赁证件保护工具',
    hero: '无风险核验租客证件',
    heroSub:
      '生成一条专属链接发给对方。租客在自己的浏览器里给证件加上水印——绑定你的民宿名称、用途和有效期。你收到的是受保护的版本。我们不存储任何内容。',
    badge: '适合房东 / 民宿主',
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
    previewNote: '水印密铺整张图，覆盖人脸区域，AI 工具无法干净清除',
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
    photoLabel: '证件照',
    nameLabel: '姓名',
    dobLabel: '出生日期',
    idLabel: '证件号',
    trustStorageTitle: '服务器零存储',
    trustStorageBody: '图片全程不离开租客设备',
    trustAccountTitle: '无需注册',
    trustAccountBody: '打开即用，没有任何门槛',
    trustTimeTitle: '一分钟搞定',
    trustTimeBody: '从打开到链接发出，全程不超过 60 秒',
  },
  de: {
    nav: 'WaterID',
    navSub: 'ID-Schutz für Vermieter',
    badge: 'Für Vermieter & Gastgeber',
    hero: 'Gäste-IDs prüfen – ohne Risiko',
    heroSub:
      'Senden Sie einen sicheren Link. Ihr Gast versieht seine ID in seinem Browser mit einem Wasserzeichen – gebunden an Ihre Unterkunft, den Zweck und ein Ablaufdatum. Sie erhalten eine geschützte Kopie. Wir speichern nichts.',
    ctaPrimary: 'Ersten Link generieren →',
    ctaLearnTenant: 'Sie sind Gast? →',
    howTitle: 'So funktioniert es – 3 Schritte',
    steps: [
      { n: '1', title: 'Details eingeben', body: 'Geben Sie Ihren Unterkunftsnamen ein und wählen Sie den Zweck (Check-in, Kaution, Vertrag). Legen Sie fest, wie lange der Link gültig sein soll.' },
      { n: '2', title: 'Link kopieren & senden', body: 'Teilen Sie den generierten Link per WhatsApp, E-Mail oder einer anderen Messaging-App. Der Link öffnet eine sichere Upload-Seite für Ihren Gast.' },
      { n: '3', title: 'Wassergezeichnete ID erhalten', body: 'Ihr Gast lädt die ID im eigenen Browser hoch. Ein Wasserzeichen wird eingefügt – gebunden an Sie, den Zweck und das Ablaufdatum. Der Gast lädt sie herunter und sendet sie Ihnen.' },
    ],
    previewTitle: 'So sieht die ID mit Wasserzeichen aus',
    previewWm: 'Für Airbnb Check-in · Auth: Muster-Unterkunft · Gültig bis 2025-04-01',
    previewNote: 'Das Wasserzeichen überdeckt das gesamte Bild einschließlich Gesicht – KI-Tools können es nicht sauber entfernen',
    whyTitle: 'Warum Vermieter WaterID nutzen',
    why: [
      { icon: '🔒', title: 'Keine Serverspeicherung', body: 'Das Wasserzeichen wird vollständig im Browser des Gastes erstellt. Sie verarbeiten nie rohe ID-Dateien auf Ihren Servern – rechtlich sicherer und DSGVO-konform.' },
      { icon: '🛡️', title: 'Manipulationssicheres Wasserzeichen', body: 'Das Wasserzeichen überdeckt das gesamte Bild, einschließlich Gesicht und Dokumentennummer. KI-Inpainting kann es nicht entfernen, ohne das Dokument sichtbar zu zerstören.' },
      { icon: '⏰', title: 'Automatisches Ablaufdatum', body: 'Stellen Sie 1 Woche, 1 Monat oder länger ein. Nach Ablauf beweist das Wasserzeichen, dass die ID nicht mehr für neue Zwecke gültig ist.' },
      { icon: '📋', title: 'Zweckgebunden', body: 'Das Wasserzeichen gibt den genauen Zweck an. Falls die ID des Gastes anderswo verwendet wird, macht das Wasserzeichen den Missbrauch nachverfolgbar.' },
      { icon: '🌍', title: '11 Sprachen', body: 'Die Upload-Seite wird automatisch übersetzt. Internationale Gäste sehen Anweisungen in ihrer Sprache – keine Verwirrung, keine Ausreden.' },
      { icon: '💸', title: 'Völlig kostenlos', body: 'Kein Konto, kein Abonnement, keine Limits. Tool öffnen, Link generieren, fertig.' },
    ],
    useCasesTitle: 'Für diese Situationen gemacht',
    useCases: [
      { icon: '🏠', label: 'Airbnb & Kurzzeitvermietung', desc: 'Check-in-ID-Prüfung gebunden an Ihren Unterkunftsnamen und Einzugsdatum.' },
      { icon: '📝', label: 'Langzeitmiete & Kaution', desc: 'Mieter-ID für Kautionsvereinbarungen sammeln – wassergezeichnet, zweckgebunden, rechtlich sicherer.' },
      { icon: '🏨', label: 'Hotels & Pensionen', desc: 'Buchungsverifizierung für Reservierungen ohne Karte oder Vorauszahlungen.' },
      { icon: '✍️', label: 'Vertragsunterzeichnung', desc: 'Vor der Mietvertragsunterzeichnung wassergezeichnete ID zur Identitätsprüfung einholen.' },
    ],
    faqTitle: 'Häufige Fragen',
    faqs: [
      { q: 'Speichert WaterID die ID meines Gastes?', a: 'Nein. Der gesamte Wasserzeichenprozess läuft im Browser des Gastes über die Canvas-API. Keine Bilddaten werden je an einen Server gesendet. Wir sind technisch nicht in der Lage, die ID zu sehen.' },
      { q: 'Kann das Wasserzeichen entfernt werden?', a: 'Das Wasserzeichen wird diagonal über das gesamte Bild mit hoher Deckkraft gerendert, einschließlich Foto und Dokumentennummer. KI-Inpainting-Tools müssten Gesicht und alle Dokumentendetails rekonstruieren – mit sichtbar gefälschtem Ergebnis. Es ist nicht sauber entfernbar.' },
      { q: 'Was, wenn mein Gast den Link verliert oder er abläuft?', a: 'Einfach einen neuen Link generieren. Das dauert weniger als 30 Sekunden. Der alte Link akzeptiert nach Ablauf keine Uploads mehr.' },
      { q: 'Gibt es eine App zum Installieren?', a: 'Nein. WaterID ist ein Web-Tool – es funktioniert auf jedem Smartphone, Tablet oder Desktop-Browser ohne Installation.' },
    ],
    ctaBottomTitle: 'Bereit, IDs sicher zu sammeln?',
    ctaBottomSub: 'Link in unter einer Minute generieren. Keine Anmeldung erforderlich.',
    ctaBottom: 'Kostenlos starten →',
    backToHome: '← Zurück zur Startseite',
    photoLabel: 'Foto',
    nameLabel: 'Name',
    dobLabel: 'Geburtsdatum',
    idLabel: 'Ausweis-Nr.',
    trustStorageTitle: 'Keine Serverspeicherung',
    trustStorageBody: 'Bilder verlassen das Gerät des Gastes nie',
    trustAccountTitle: 'Kein Konto nötig',
    trustAccountBody: 'Einfach öffnen und nutzen – keine Anmeldung',
    trustTimeTitle: 'Unter einer Minute',
    trustTimeBody: 'Von Öffnen bis Linkversand in unter 60 Sekunden',
  },
  ko: {
    nav: 'WaterID',
    navSub: '임대용 신분증 보호',
    badge: '집주인 / 숙소 운영자용',
    hero: '위험 없이 게스트 신분증 확인',
    heroSub:
      '보안 링크를 보내세요. 게스트가 자신의 브라우저에서 신분증에 워터마크를 추가합니다 — 숙소 이름, 용도, 만료일이 포함됩니다. 보호된 사본을 받게 됩니다. 저장하는 정보는 없습니다.',
    ctaPrimary: '첫 링크 생성하기 →',
    ctaLearnTenant: '게스트이신가요? →',
    howTitle: '사용 방법 — 3단계',
    steps: [
      { n: '1', title: '정보 입력', body: '숙소 이름을 입력하고 용도(체크인, 보증금, 계약)를 선택하세요. 링크 유효 기간을 설정하세요.' },
      { n: '2', title: '링크 복사 & 전송', body: '생성된 링크를 카카오톡, 이메일 등으로 공유하세요. 게스트에게 안전한 업로드 페이지가 열립니다.' },
      { n: '3', title: '워터마크 신분증 수령', body: '게스트가 자신의 브라우저에서 신분증을 업로드합니다. 숙소 이름, 용도, 만료일이 워터마크로 삽입됩니다. 게스트가 다운로드해 전송합니다.' },
    ],
    previewTitle: '워터마크 신분증 미리보기',
    previewWm: 'Airbnb 체크인용 · 인증: 홍길동 숙소 · 유효기간 2025-04-01',
    previewNote: '워터마크가 얼굴 포함 전체 이미지에 적용되어 AI 도구로 제거 불가',
    whyTitle: '집주인이 WaterID를 사용하는 이유',
    why: [
      { icon: '🔒', title: '서버 저장 없음', body: '워터마크 처리는 게스트의 브라우저에서 완전히 진행됩니다. 서버에서 원본 신분증 파일을 처리할 필요가 없어 법적으로 안전하며 GDPR을 준수합니다.' },
      { icon: '🛡️', title: '변조 방지 워터마크', body: '워터마크가 얼굴과 문서 번호를 포함한 전체 이미지에 타일링됩니다. AI 인페인팅으로는 문서를 훼손하지 않고는 제거할 수 없습니다.' },
      { icon: '⏰', title: '자동 만료', body: '1주, 1개월 또는 더 길게 설정하세요. 만료 후 워터마크는 신분증이 더 이상 새로운 용도에 유효하지 않음을 증명합니다.' },
      { icon: '📋', title: '용도 고정', body: '워터마크에 정확한 용도가 명시됩니다. 게스트의 신분증이 다른 곳에 사용될 경우 워터마크로 추적 가능합니다.' },
      { icon: '🌍', title: '11개 언어', body: '업로드 페이지가 자동으로 번역됩니다. 외국 게스트도 자국어로 안내를 받아 혼란이 없습니다.' },
      { icon: '💸', title: '완전 무료', body: '계정, 구독, 제한 없음. 도구를 열고 링크를 생성하면 끝.' },
    ],
    useCasesTitle: '이런 상황에 적합합니다',
    useCases: [
      { icon: '🏠', label: 'Airbnb & 단기 임대', desc: '숙소 이름과 입주일이 연결된 체크인 신분증 확인.' },
      { icon: '📝', label: '장기 임대 보증금', desc: '보증금 계약을 위한 임차인 신분증 수집 — 워터마크 처리, 용도 고정, 법적으로 안전.' },
      { icon: '🏨', label: '호텔 & 게스트하우스', desc: '카드 없는 예약이나 선불 결제 시 예약 확인.' },
      { icon: '✍️', label: '계약서 서명', desc: '임대 계약 전 서명자와 일치하는 워터마크 신분증 수집.' },
    ],
    faqTitle: '자주 묻는 질문',
    faqs: [
      { q: 'WaterID가 게스트 신분증을 저장하나요?', a: '아니요. 전체 워터마크 처리 과정이 Canvas API를 사용해 게스트의 브라우저에서 실행됩니다. 이미지 데이터는 서버에 전송되지 않습니다. 기술적으로 신분증을 볼 수 없습니다.' },
      { q: '워터마크를 제거할 수 있나요?', a: '워터마크는 얼굴과 문서 번호를 포함한 전체 이미지에 높은 불투명도로 대각선으로 렌더링됩니다. AI 인페인팅 도구는 얼굴과 모든 문서 세부 정보를 채워야 하므로 명백히 가짜 결과가 나옵니다. 깨끗하게 제거할 수 없습니다.' },
      { q: '게스트가 링크를 잃어버리거나 만료되면 어떻게 하나요?', a: '새 링크를 생성하면 됩니다. 30초도 안 걸립니다. 이전 링크는 만료 후 업로드를 수락하지 않습니다.' },
      { q: '앱을 설치해야 하나요?', a: '아니요. WaterID는 웹 도구입니다. 스마트폰, 태블릿, 데스크톱 브라우저에서 설치 없이 사용 가능합니다.' },
    ],
    ctaBottomTitle: '안전하게 신분증을 받을 준비가 되셨나요?',
    ctaBottomSub: '1분 안에 링크 생성. 회원가입 불필요.',
    ctaBottom: '무료로 시작하기 →',
    backToHome: '← 홈으로 돌아가기',
    photoLabel: '사진',
    nameLabel: '이름',
    dobLabel: '생년월일',
    idLabel: '신분증 번호',
    trustStorageTitle: '서버 저장 없음',
    trustStorageBody: '이미지가 게스트 기기를 떠나지 않음',
    trustAccountTitle: '계정 불필요',
    trustAccountBody: '열고 사용 — 가입 없이 바로 이용',
    trustTimeTitle: '1분 이내',
    trustTimeBody: '60초 안에 링크 전송 완료',
  },
  fr: {
    nav: 'WaterID',
    navSub: "Protection d'identité pour locations",
    badge: 'Pour les hôtes et propriétaires',
    hero: "Vérifiez les pièces d'identité sans risque",
    heroSub:
      "Envoyez un lien sécurisé. Votre locataire appose un filigrane sur sa propre pièce d'identité dans son navigateur — lié à votre bien, à l'usage et à une date d'expiration. Vous recevez une copie protégée. Nous ne stockons rien.",
    ctaPrimary: 'Générer votre premier lien →',
    ctaLearnTenant: 'Vous êtes locataire ? →',
    howTitle: 'Comment ça marche — 3 étapes',
    steps: [
      { n: '1', title: 'Saisissez vos informations', body: "Entrez le nom de votre bien et choisissez l'usage (check-in, caution, contrat). Définissez la durée de validité du lien." },
      { n: '2', title: 'Copiez et envoyez le lien', body: "Partagez le lien généré via WhatsApp, e-mail ou toute application de messagerie. Le lien ouvre une page d'upload sécurisée pour votre locataire." },
      { n: '3', title: "Recevez un document avec filigrane", body: "Votre locataire uploade sa pièce d'identité dans son propre navigateur. Un filigrane est apposé — lié à vous, à l'usage et à l'expiration. Il télécharge et vous l'envoie." },
    ],
    previewTitle: "Aperçu du document avec filigrane",
    previewWm: "Pour check-in Airbnb · Auth : Appartement Dupont · Valide jusqu'au 2025-04-01",
    previewNote: "Le filigrane couvre toute l'image y compris le visage — les outils IA ne peuvent pas le supprimer proprement",
    whyTitle: 'Pourquoi les hôtes utilisent WaterID',
    why: [
      { icon: '🔒', title: 'Zéro stockage serveur', body: "Le filigrane est créé entièrement dans le navigateur du locataire. Vous ne manipulez jamais les fichiers d'identité bruts sur vos serveurs — plus sûr juridiquement et pour le RGPD." },
      { icon: '🛡️', title: 'Filigrane inviolable', body: "Le filigrane se répète sur toute l'image, y compris le visage et le numéro de document. L'inpainting IA ne peut pas le supprimer sans détruire visiblement le document." },
      { icon: '⏰', title: 'Expiration automatique', body: "Choisissez 1 semaine, 1 mois ou plus. Après expiration, le filigrane prouve que la pièce d'identité n'est plus valable pour de nouveaux usages." },
      { icon: '📋', title: 'Usage verrouillé', body: "Le filigrane indique l'usage exact. Si la pièce d'identité est utilisée ailleurs, le filigrane rend le mauvais usage traçable." },
      { icon: '🌍', title: '11 langues', body: "La page d'upload se traduit automatiquement. Les locataires étrangers voient les instructions dans leur langue." },
      { icon: '💸', title: 'Entièrement gratuit', body: "Pas de compte, pas d'abonnement, pas de limite. Ouvrez l'outil, générez un lien, c'est fait." },
    ],
    useCasesTitle: 'Conçu pour ces situations',
    useCases: [
      { icon: '🏠', label: 'Airbnb & locations courte durée', desc: "Vérification d'identité pour check-in liée à votre annonce et à la date d'entrée." },
      { icon: '📝', label: 'Cautions de location longue durée', desc: "Collectez l'identité du locataire pour les accords de caution — watermarké, usage verrouillé, plus sûr légalement." },
      { icon: '🏨', label: "Hôtels & maisons d'hôtes", desc: "Vérification de réservation pour les réservations sans carte ou paiements anticipés." },
      { icon: '✍️', label: 'Signature de contrat', desc: "Avant de signer un bail, collectez une pièce d'identité avec filigrane pour vérifier le signataire." },
    ],
    faqTitle: 'Questions fréquentes',
    faqs: [
      { q: "WaterID stocke-t-il la pièce d'identité de mon locataire ?", a: "Non. Tout le processus se déroule dans le navigateur du locataire via l'API Canvas. Aucune donnée image n'est envoyée à un serveur. Nous sommes techniquement incapables de voir la pièce d'identité." },
      { q: 'Le filigrane peut-il être supprimé ?', a: "Le filigrane est rendu en diagonale sur toute l'image avec une opacité élevée, y compris sur la photo et le numéro de document. Les outils d'inpainting IA devraient reconstruire le visage et tous les détails — produisant un résultat clairement faux." },
      { q: "Et si mon locataire perd le lien ou s'il expire ?", a: 'Générez simplement un nouveau lien. Cela prend moins de 30 secondes. L\'ancien lien n\'accepte plus d\'uploads après expiration.' },
      { q: "Y a-t-il une application à installer ?", a: "Non. WaterID est un outil web — il fonctionne sur tout smartphone, tablette ou navigateur de bureau sans installation." },
    ],
    ctaBottomTitle: "Prêt à collecter des pièces d'identité en sécurité ?",
    ctaBottomSub: "Générez un lien en moins d'une minute. Pas d'inscription requise.",
    ctaBottom: 'Commencer gratuitement →',
    backToHome: "← Retour à l'accueil",
    photoLabel: 'Photo',
    nameLabel: 'Nom',
    dobLabel: 'Date de naissance',
    idLabel: "N° de pièce d'identité",
    trustStorageTitle: 'Zéro stockage serveur',
    trustStorageBody: "Les images ne quittent jamais l'appareil du locataire",
    trustAccountTitle: 'Pas de compte requis',
    trustAccountBody: 'Ouvrez et utilisez — sans inscription',
    trustTimeTitle: "Moins d'une minute",
    trustTimeBody: "De l'ouverture à l'envoi du lien en moins de 60 secondes",
  },
  es: {
    nav: 'WaterID',
    navSub: 'Protección de ID para alquileres',
    badge: 'Para anfitriones y propietarios',
    hero: 'Verifica el ID de tus huéspedes sin riesgo',
    heroSub:
      'Envía un enlace seguro. Tu huésped marca su propio ID con una marca de agua en su navegador — vinculado a tu propiedad, el propósito y una fecha de vencimiento. Recibes una copia protegida. No almacenamos nada.',
    ctaPrimary: 'Generar tu primer enlace →',
    ctaLearnTenant: '¿Eres inquilino? →',
    howTitle: 'Cómo funciona — 3 pasos',
    steps: [
      { n: '1', title: 'Ingresa tus datos', body: 'Escribe el nombre de tu propiedad y elige el propósito (check-in, depósito, contrato). Configura cuánto tiempo debe ser válido el enlace.' },
      { n: '2', title: 'Copia y envía el enlace', body: 'Comparte el enlace generado por WhatsApp, correo electrónico o cualquier app de mensajería. El enlace abre una página de carga segura para tu huésped.' },
      { n: '3', title: 'Recibe un ID con marca de agua', body: 'Tu huésped sube su ID en su propio navegador. Se estampa una marca de agua — vinculada a ti, el propósito y el vencimiento. El huésped lo descarga y te lo envía.' },
    ],
    previewTitle: 'Cómo se ve el ID con marca de agua',
    previewWm: 'Para check-in Airbnb · Auth: Alojamiento García · Válido hasta 2025-04-01',
    previewNote: 'La marca de agua cubre toda la imagen incluido el rostro — las herramientas de IA no pueden eliminarla limpiamente',
    whyTitle: 'Por qué los anfitriones usan WaterID',
    why: [
      { icon: '🔒', title: 'Cero almacenamiento en servidor', body: 'La marca de agua se crea íntegramente en el navegador del huésped. Nunca manejas archivos de ID sin procesar en tus servidores — más seguro legalmente y para el RGPD.' },
      { icon: '🛡️', title: 'Marca de agua a prueba de manipulaciones', body: 'La marca de agua cubre toda la imagen incluyendo el rostro y el número de documento. El inpainting de IA no puede eliminarla sin destruir visiblemente el documento.' },
      { icon: '⏰', title: 'Vencimiento automático', body: 'Establece 1 semana, 1 mes o más. Después del vencimiento, la marca de agua demuestra que el ID ya no es válido para nuevos usos.' },
      { icon: '📋', title: 'Propósito bloqueado', body: 'La marca de agua indica el propósito exacto. Si el ID del huésped se usa en otro lugar, la marca de agua hace rastreable el mal uso.' },
      { icon: '🌍', title: '11 idiomas', body: 'La página de carga se traduce automáticamente. Los huéspedes internacionales ven las instrucciones en su idioma.' },
      { icon: '💸', title: 'Completamente gratuito', body: 'Sin cuenta, sin suscripción, sin límites. Abre la herramienta, genera un enlace, listo.' },
    ],
    useCasesTitle: 'Diseñado para estas situaciones',
    useCases: [
      { icon: '🏠', label: 'Airbnb & alquileres cortos', desc: 'Verificación de ID para check-in vinculada al nombre de tu propiedad y fecha de entrada.' },
      { icon: '📝', label: 'Depósitos de alquiler largo plazo', desc: 'Recoge el ID del inquilino para acuerdos de depósito — con marca de agua, propósito bloqueado, más seguro legalmente.' },
      { icon: '🏨', label: 'Hoteles & casas de huéspedes', desc: 'Verificación de reserva para reservas sin tarjeta o pagos anticipados.' },
      { icon: '✍️', label: 'Firma de contrato', desc: 'Antes de firmar un contrato de arrendamiento, recoge un ID con marca de agua para verificar al firmante.' },
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿WaterID almacena el ID de mi huésped?', a: 'No. Todo el proceso de marca de agua se ejecuta en el navegador del huésped usando la API Canvas. Ningún dato de imagen se envía a ningún servidor. Técnicamente somos incapaces de ver su ID.' },
      { q: '¿Puede eliminarse la marca de agua?', a: 'La marca de agua se renderiza diagonalmente en toda la imagen con alta opacidad, incluyendo la foto y el número de documento. Las herramientas de inpainting de IA necesitarían reconstruir el rostro y todos los detalles del documento, produciendo un resultado claramente falso.' },
      { q: '¿Qué pasa si mi huésped pierde el enlace o vence?', a: 'Simplemente genera un nuevo enlace. Tarda menos de 30 segundos. El enlace anterior deja de aceptar cargas una vez que vence.' },
      { q: '¿Hay una aplicación para instalar?', a: 'No. WaterID es una herramienta web — funciona en cualquier smartphone, tableta o navegador de escritorio sin instalación.' },
    ],
    ctaBottomTitle: '¿Listo para recoger IDs de forma segura?',
    ctaBottomSub: 'Genera un enlace en menos de un minuto. Sin registro requerido.',
    ctaBottom: 'Empezar gratis →',
    backToHome: '← Volver al inicio',
    photoLabel: 'Foto',
    nameLabel: 'Nombre',
    dobLabel: 'Fecha de nacimiento',
    idLabel: 'N.º de ID',
    trustStorageTitle: 'Cero almacenamiento en servidor',
    trustStorageBody: 'Las imágenes nunca salen del dispositivo del huésped',
    trustAccountTitle: 'Sin cuenta necesaria',
    trustAccountBody: 'Abre y usa — sin registro, sin fricción',
    trustTimeTitle: 'Menos de un minuto',
    trustTimeBody: 'De apertura a enlace enviado en menos de 60 segundos',
  },
  ja: {
    nav: 'WaterID',
    navSub: '賃貸用ID保護ツール',
    badge: 'ホスト・オーナー向け',
    hero: 'リスクなしでゲストのIDを確認',
    heroSub:
      'セキュアなリンクを送るだけ。ゲストは自分のブラウザでIDにウォーターマークを入れます — あなたの物件名、目的、有効期限が紐づけられます。保護されたコピーを受け取り、私たちは何も保存しません。',
    ctaPrimary: '最初のリンクを生成 →',
    ctaLearnTenant: 'ゲストの方はこちら →',
    howTitle: '使い方 — 3ステップ',
    steps: [
      { n: '1', title: '情報を入力', body: '物件名を入力し、目的（チェックイン、敷金、契約）を選択。リンクの有効期間を設定します。' },
      { n: '2', title: 'リンクをコピーして送信', body: '生成されたリンクをLINE、メールなどで共有。ゲスト用のセキュアなアップロードページが開きます。' },
      { n: '3', title: 'ウォーターマーク入りIDを受け取る', body: 'ゲストが自分のブラウザでIDをアップロード。物件名・目的・有効期限を含むウォーターマークが入ります。ゲストがダウンロードして送ってきます。' },
    ],
    previewTitle: 'ウォーターマーク入りIDのプレビュー',
    previewWm: 'Airbnbチェックイン専用 · 認証: 山田民泊 · 有効期限 2025-04-01',
    previewNote: 'ウォーターマークは顔を含む全体に適用 — AIツールでは除去不可能',
    whyTitle: 'ホストがWaterIDを使う理由',
    why: [
      { icon: '🔒', title: 'サーバーに保存しない', body: 'ウォーターマーク処理はゲストのブラウザ内で完結。サーバーで生のIDファイルを扱わないため、法的リスクやGDPR対応の面で安全です。' },
      { icon: '🛡️', title: '改ざん防止ウォーターマーク', body: 'ウォーターマークは顔と文書番号を含む全画像にタイリングされます。AIインペインティングでは、文書を目に見えて破壊せずには除去できません。' },
      { icon: '⏰', title: '自動有効期限', body: '1週間、1ヶ月など設定可能。期限後、ウォーターマークがIDが新たな用途に無効であることを証明します。' },
      { icon: '📋', title: '目的を固定', body: 'ウォーターマークに正確な目的が明記されます。ゲストのIDが他で使用された場合、ウォーターマークで不正使用を追跡できます。' },
      { icon: '🌍', title: '11言語対応', body: 'アップロードページは自動翻訳されます。外国人ゲストも母国語で案内を確認できます。' },
      { icon: '💸', title: '完全無料', body: 'アカウント不要、サブスクリプション不要、制限なし。開いてリンクを生成するだけ。' },
    ],
    useCasesTitle: 'こんな場面に最適',
    useCases: [
      { icon: '🏠', label: 'Airbnb・短期民泊', desc: '物件名と入室日に紐づいたチェックイン時のID確認。' },
      { icon: '📝', label: '長期賃貸・敷金', desc: '敷金契約用の入居者ID収集 — ウォーターマーク済み、目的固定、法的に安全。' },
      { icon: '🏨', label: 'ホテル・ゲストハウス', desc: 'カードなし予約や前払い時の予約確認。' },
      { icon: '✍️', label: '契約書への署名前', desc: '賃貸契約前に署名者と一致するウォーターマーク入りIDを収集。' },
    ],
    faqTitle: 'よくある質問',
    faqs: [
      { q: 'WaterIDはゲストのIDを保存しますか？', a: 'いいえ。ウォーターマーク処理の全過程がCanvas APIを使いゲストのブラウザで実行されます。画像データはサーバーに送信されません。技術的にIDを見ることは不可能です。' },
      { q: 'ウォーターマークを除去できますか？', a: 'ウォーターマークは高い不透明度で全画像に斜めにレンダリングされ、顔と文書番号も含みます。AIインペインティングツールが除去するには顔と全文書情報を再構築する必要があり、明らかに偽造となります。きれいには除去できません。' },
      { q: 'ゲストがリンクを失くしたり期限切れになったら？', a: '新しいリンクを生成するだけです。30秒もかかりません。古いリンクは期限後にアップロードを受け付けなくなります。' },
      { q: 'アプリのインストールは必要ですか？', a: 'いいえ。WaterIDはWebツールです。スマートフォン、タブレット、PCのブラウザでインストール不要で動作します。' },
    ],
    ctaBottomTitle: '安全にIDを収集する準備はできていますか？',
    ctaBottomSub: '1分以内にリンクを生成。登録不要。',
    ctaBottom: '無料で始める →',
    backToHome: '← ホームに戻る',
    photoLabel: '写真',
    nameLabel: '氏名',
    dobLabel: '生年月日',
    idLabel: 'ID番号',
    trustStorageTitle: 'サーバーに保存しない',
    trustStorageBody: '画像はゲストの端末から外に出ない',
    trustAccountTitle: 'アカウント不要',
    trustAccountBody: '開いてすぐ使える — 登録なし',
    trustTimeTitle: '1分以内',
    trustTimeBody: '開いてからリンク送信まで60秒以内',
  },
  pt: {
    nav: 'WaterID',
    navSub: 'Proteção de ID para aluguéis',
    badge: 'Para anfitriões e proprietários',
    hero: 'Verifique IDs de hóspedes sem riscos',
    heroSub:
      "Envie um link seguro. Seu hóspede coloca marca d'água no próprio ID no navegador — vinculado à sua propriedade, finalidade e data de expiração. Você recebe uma cópia protegida. Não armazenamos nada.",
    ctaPrimary: 'Gerar seu primeiro link →',
    ctaLearnTenant: 'Você é inquilino? →',
    howTitle: 'Como funciona — 3 passos',
    steps: [
      { n: '1', title: 'Insira seus dados', body: 'Digite o nome da sua propriedade e escolha a finalidade (check-in, caução, contrato). Defina por quanto tempo o link deve ser válido.' },
      { n: '2', title: 'Copie e envie o link', body: 'Compartilhe o link gerado via WhatsApp, e-mail ou qualquer app de mensagens. O link abre uma página de upload segura para seu hóspede.' },
      { n: '3', title: "Receba um ID com marca d'água", body: "Seu hóspede faz upload do ID no próprio navegador. Uma marca d'água é aplicada — vinculada a você, à finalidade e ao vencimento. O hóspede baixa e te envia." },
    ],
    previewTitle: "Como fica o ID com marca d'água",
    previewWm: "Para check-in Airbnb · Auth: Imóvel Silva · Válido até 2025-04-01",
    previewNote: "A marca d'água cobre toda a imagem incluindo o rosto — ferramentas de IA não conseguem removê-la",
    whyTitle: 'Por que anfitriões usam WaterID',
    why: [
      { icon: '🔒', title: 'Zero armazenamento em servidor', body: "A marca d'água é criada inteiramente no navegador do hóspede. Você nunca lida com arquivos de ID brutos em seus servidores — mais seguro juridicamente e para o LGPD/RGPD." },
      { icon: '🛡️', title: "Marca d'água inviolável", body: "A marca d'água cobre toda a imagem, incluindo rosto e número do documento. O inpainting de IA não consegue removê-la sem destruir visivelmente o documento." },
      { icon: '⏰', title: 'Expiração automática', body: "Defina 1 semana, 1 mês ou mais. Após o vencimento, a marca d'água comprova que o ID não é mais válido para novos usos." },
      { icon: '📋', title: 'Finalidade bloqueada', body: "A marca d'água indica a finalidade exata. Se o ID do hóspede for usado em outro lugar, a marca d'água torna o mau uso rastreável." },
      { icon: '🌍', title: '11 idiomas', body: 'A página de upload se traduz automaticamente. Hóspedes internacionais veem as instruções no seu idioma.' },
      { icon: '💸', title: 'Completamente gratuito', body: 'Sem conta, sem assinatura, sem limites. Abra a ferramenta, gere um link, pronto.' },
    ],
    useCasesTitle: 'Criado para estas situações',
    useCases: [
      { icon: '🏠', label: 'Airbnb & aluguéis curtos', desc: 'Verificação de ID no check-in vinculada ao nome da sua propriedade e data de entrada.' },
      { icon: '📝', label: 'Cauções de aluguel longo prazo', desc: "Colete o ID do inquilino para acordos de caução — com marca d'água, finalidade bloqueada, mais seguro juridicamente." },
      { icon: '🏨', label: 'Hotéis & pousadas', desc: 'Verificação de reserva para reservas sem cartão ou pagamentos antecipados.' },
      { icon: '✍️', label: 'Assinatura de contrato', desc: "Antes de assinar um contrato de locação, colete um ID com marca d'água para verificar o signatário." },
    ],
    faqTitle: 'Perguntas frequentes',
    faqs: [
      { q: 'O WaterID armazena o ID do meu hóspede?', a: "Não. Todo o processo de marca d'água é executado no navegador do hóspede usando a API Canvas. Nenhum dado de imagem é enviado a qualquer servidor. Somos tecnicamente incapazes de ver o ID." },
      { q: "A marca d'água pode ser removida?", a: "A marca d'água é renderizada diagonalmente em toda a imagem com alta opacidade, incluindo foto e número do documento. Ferramentas de inpainting de IA precisariam reconstruir o rosto e todos os detalhes, produzindo um resultado claramente falso." },
      { q: 'E se meu hóspede perder o link ou ele expirar?', a: 'Basta gerar um novo link. Leva menos de 30 segundos. O link antigo para de aceitar uploads após a expiração.' },
      { q: 'Há um aplicativo para instalar?', a: 'Não. WaterID é uma ferramenta web — funciona em qualquer smartphone, tablet ou navegador de desktop sem instalação.' },
    ],
    ctaBottomTitle: 'Pronto para coletar IDs com segurança?',
    ctaBottomSub: 'Gere um link em menos de um minuto. Sem cadastro necessário.',
    ctaBottom: 'Começar gratuitamente →',
    backToHome: '← Voltar ao início',
    photoLabel: 'Foto',
    nameLabel: 'Nome',
    dobLabel: 'Data de nascimento',
    idLabel: 'N.º do documento',
    trustStorageTitle: 'Zero armazenamento em servidor',
    trustStorageBody: 'Imagens nunca saem do dispositivo do hóspede',
    trustAccountTitle: 'Sem conta necessária',
    trustAccountBody: 'Abra e use — sem cadastro, sem fricção',
    trustTimeTitle: 'Menos de um minuto',
    trustTimeBody: 'Da abertura ao envio do link em menos de 60 segundos',
  },
  it: {
    nav: 'WaterID',
    navSub: 'Protezione ID per affitti',
    badge: 'Per host e proprietari',
    hero: 'Verifica i documenti degli ospiti senza rischi',
    heroSub:
      "Invia un link sicuro. Il tuo ospite aggiunge il watermark al proprio documento nel suo browser — collegato alla tua proprietà, allo scopo e a una data di scadenza. Ricevi una copia protetta. Non conserviamo nulla.",
    ctaPrimary: 'Genera il tuo primo link →',
    ctaLearnTenant: 'Sei un inquilino? →',
    howTitle: 'Come funziona — 3 passi',
    steps: [
      { n: '1', title: 'Inserisci i tuoi dati', body: 'Digita il nome della tua proprietà e scegli lo scopo (check-in, deposito, contratto). Imposta per quanto tempo il link deve essere valido.' },
      { n: '2', title: 'Copia e invia il link', body: 'Condividi il link generato via WhatsApp, email o qualsiasi app di messaggistica. Il link apre una pagina di caricamento sicura per il tuo ospite.' },
      { n: '3', title: 'Ricevi un documento con watermark', body: "Il tuo ospite carica il documento nel proprio browser. Un watermark viene applicato — legato a te, allo scopo e alla scadenza. L'ospite scarica e te lo invia." },
    ],
    previewTitle: 'Come appare il documento con watermark',
    previewWm: 'Per check-in Airbnb · Auth: Casa Rossi · Valido fino al 2025-04-01',
    previewNote: "Il watermark copre tutta l'immagine incluso il volto — gli strumenti AI non possono rimuoverlo",
    whyTitle: 'Perché gli host usano WaterID',
    why: [
      { icon: '🔒', title: 'Zero archiviazione server', body: "Il watermark viene creato interamente nel browser dell'ospite. Non gestisci mai file ID grezzi sui tuoi server — più sicuro legalmente e per il GDPR." },
      { icon: '🛡️', title: 'Watermark antimanomissione', body: "Il watermark copre tutta l'immagine inclusi volto e numero del documento. L'inpainting AI non può rimuoverlo senza distruggere visibilmente il documento." },
      { icon: '⏰', title: 'Scadenza automatica', body: 'Imposta 1 settimana, 1 mese o più. Dopo la scadenza, il watermark dimostra che il documento non è più valido per nuovi usi.' },
      { icon: '📋', title: 'Scopo bloccato', body: "Il watermark indica lo scopo esatto. Se il documento dell'ospite viene usato altrove, il watermark rende tracciabile l'abuso." },
      { icon: '🌍', title: '11 lingue', body: 'La pagina di caricamento si traduce automaticamente. Gli ospiti internazionali vedono le istruzioni nella loro lingua.' },
      { icon: '💸', title: 'Completamente gratuito', body: 'Nessun account, nessun abbonamento, nessun limite. Apri lo strumento, genera un link, fatto.' },
    ],
    useCasesTitle: 'Creato per queste situazioni',
    useCases: [
      { icon: '🏠', label: 'Airbnb & affitti brevi', desc: "Verifica ID al check-in collegata al nome della tua proprietà e alla data di ingresso." },
      { icon: '📝', label: 'Depositi cauzionali', desc: "Raccogli l'ID dell'inquilino per accordi di deposito — con watermark, scopo bloccato, più sicuro legalmente." },
      { icon: '🏨', label: 'Hotel & guest house', desc: 'Verifica prenotazioni per reservazioni senza carta o pagamenti anticipati.' },
      { icon: '✍️', label: 'Firma contratto', desc: 'Prima di firmare un contratto di affitto, raccogli un documento con watermark per verificare il firmatario.' },
    ],
    faqTitle: 'Domande frequenti',
    faqs: [
      { q: "WaterID conserva il documento del mio ospite?", a: "No. L'intero processo di watermarking avviene nel browser dell'ospite tramite l'API Canvas. Nessun dato immagine viene inviato a qualsiasi server. Siamo tecnicamente impossibilitati a vedere il documento." },
      { q: 'Il watermark può essere rimosso?', a: "Il watermark è renderizzato in diagonale su tutta l'immagine con alta opacità, inclusi foto e numero del documento. Gli strumenti di inpainting AI dovrebbero ricostruire il volto e tutti i dettagli — producendo un risultato chiaramente falso." },
      { q: 'Cosa succede se il mio ospite perde il link o scade?', a: 'Genera semplicemente un nuovo link. Ci vogliono meno di 30 secondi. Il vecchio link smette di accettare caricamenti dopo la scadenza.' },
      { q: "C'è un'app da installare?", a: "No. WaterID è uno strumento web — funziona su qualsiasi smartphone, tablet o browser desktop senza installazione." },
    ],
    ctaBottomTitle: 'Pronto a raccogliere documenti in sicurezza?',
    ctaBottomSub: 'Genera un link in meno di un minuto. Nessuna registrazione richiesta.',
    ctaBottom: 'Inizia gratis →',
    backToHome: '← Torna alla home',
    photoLabel: 'Foto',
    nameLabel: 'Nome',
    dobLabel: 'Data di nascita',
    idLabel: 'N. documento',
    trustStorageTitle: 'Zero archiviazione server',
    trustStorageBody: "Le immagini non lasciano mai il dispositivo dell'ospite",
    trustAccountTitle: 'Nessun account richiesto',
    trustAccountBody: 'Apri e usa — senza registrazione',
    trustTimeTitle: 'Meno di un minuto',
    trustTimeBody: "Dall'apertura all'invio del link in meno di 60 secondi",
  },
  ru: {
    nav: 'WaterID',
    navSub: 'Защита удостоверений для аренды',
    badge: 'Для хозяев и арендодателей',
    hero: 'Проверяйте документы гостей без риска',
    heroSub:
      'Отправьте защищённую ссылку. Гость самостоятельно добавляет водяной знак на своё удостоверение в браузере — привязанный к вашему объекту, цели и дате истечения. Вы получаете защищённую копию. Мы ничего не храним.',
    ctaPrimary: 'Создать первую ссылку →',
    ctaLearnTenant: 'Вы арендатор? →',
    howTitle: 'Как это работает — 3 шага',
    steps: [
      { n: '1', title: 'Введите данные', body: 'Укажите название объекта и выберите цель (заселение, депозит, договор). Установите срок действия ссылки.' },
      { n: '2', title: 'Скопируйте и отправьте ссылку', body: 'Поделитесь ссылкой через WhatsApp, email или любой мессенджер. Ссылка открывает безопасную страницу загрузки для гостя.' },
      { n: '3', title: 'Получите документ с водяным знаком', body: 'Гость загружает документ в своём браузере. Наносится водяной знак — привязанный к вам, цели и сроку. Гость скачивает и отправляет вам.' },
    ],
    previewTitle: 'Как выглядит документ с водяным знаком',
    previewWm: 'Для заселения Airbnb · Авторизация: Апартаменты Иванова · Действителен до 2025-04-01',
    previewNote: 'Водяной знак покрывает всё изображение включая лицо — ИИ-инструменты не могут его удалить',
    whyTitle: 'Почему хозяева используют WaterID',
    why: [
      { icon: '🔒', title: 'Нулевое хранение на сервере', body: 'Водяной знак создаётся полностью в браузере гостя. Вам не нужно обрабатывать исходные файлы документов на серверах — безопаснее юридически и с точки зрения GDPR.' },
      { icon: '🛡️', title: 'Защищённый от подделки водяной знак', body: 'Водяной знак покрывает всё изображение, включая лицо и номер документа. ИИ-инпейнтинг не может удалить его, не разрушив документ.' },
      { icon: '⏰', title: 'Автоматическое истечение', body: 'Установите 1 неделю, 1 месяц или дольше. После истечения водяной знак доказывает, что документ больше не действителен для новых целей.' },
      { icon: '📋', title: 'Фиксированная цель', body: 'Водяной знак указывает точную цель. Если документ гостя используется в другом месте, водяной знак делает злоупотребление отслеживаемым.' },
      { icon: '🌍', title: '11 языков', body: 'Страница загрузки переводится автоматически. Иностранные гости видят инструкции на своём языке.' },
      { icon: '💸', title: 'Абсолютно бесплатно', body: 'Без аккаунта, без подписки, без ограничений. Откройте инструмент, создайте ссылку, готово.' },
    ],
    useCasesTitle: 'Создан для этих ситуаций',
    useCases: [
      { icon: '🏠', label: 'Airbnb & краткосрочная аренда', desc: 'Проверка документа при заселении, привязанная к названию объекта и дате въезда.' },
      { icon: '📝', label: 'Депозиты долгосрочной аренды', desc: 'Сбор документов арендатора для договоров залога — с водяным знаком, фиксированной целью, юридически безопаснее.' },
      { icon: '🏨', label: 'Отели & гостевые дома', desc: 'Подтверждение бронирования без карты или при авансовых платежах.' },
      { icon: '✍️', label: 'Подписание договора', desc: 'Перед подписанием договора аренды соберите документ с водяным знаком для проверки подписанта.' },
    ],
    faqTitle: 'Частые вопросы',
    faqs: [
      { q: 'WaterID хранит документ моего гостя?', a: 'Нет. Весь процесс водяного знака выполняется в браузере гостя с помощью Canvas API. Никакие данные изображения не отправляются на сервер. Мы технически не можем видеть документ.' },
      { q: 'Можно ли удалить водяной знак?', a: 'Водяной знак наносится диагонально на всё изображение с высокой непрозрачностью, включая фото и номер документа. ИИ-инструменты должны были бы восстановить лицо и все детали документа — давая явно поддельный результат. Чисто удалить невозможно.' },
      { q: 'Что если гость потеряет ссылку или она истечёт?', a: 'Просто создайте новую ссылку. Это занимает менее 30 секунд. Старая ссылка перестаёт принимать загрузки после истечения.' },
      { q: 'Нужно ли устанавливать приложение?', a: 'Нет. WaterID — это веб-инструмент, который работает на любом смартфоне, планшете или браузере без установки.' },
    ],
    ctaBottomTitle: 'Готовы безопасно собирать документы?',
    ctaBottomSub: 'Создайте ссылку менее чем за минуту. Регистрация не нужна.',
    ctaBottom: 'Начать бесплатно →',
    backToHome: '← На главную',
    photoLabel: 'Фото',
    nameLabel: 'Имя',
    dobLabel: 'Дата рождения',
    idLabel: 'Номер документа',
    trustStorageTitle: 'Нулевое хранение на сервере',
    trustStorageBody: 'Изображения никогда не покидают устройство гостя',
    trustAccountTitle: 'Аккаунт не нужен',
    trustAccountBody: 'Открыть и использовать — без регистрации',
    trustTimeTitle: 'Менее минуты',
    trustTimeBody: 'От открытия до отправки ссылки менее 60 секунд',
  },
  tr: {
    nav: 'WaterID',
    navSub: 'Kiralık için Kimlik Koruması',
    badge: 'Ev Sahipleri ve Kiralıkçılar için',
    hero: 'Misafir Kimliklerini Risksiz Doğrulayın',
    heroSub:
      'Güvenli bir bağlantı gönderin. Misafiriniz kendi kimliğine kendi tarayıcısında filigran ekler — mülkünüze, amaca ve son kullanma tarihine bağlı. Siz korumalı bir kopya alırsınız. Biz hiçbir şey saklamayız.',
    ctaPrimary: 'İlk Bağlantını Oluştur →',
    ctaLearnTenant: 'Kiracı mısınız? →',
    howTitle: 'Nasıl çalışır — 3 adım',
    steps: [
      { n: '1', title: 'Bilgilerini gir', body: 'Mülk adını yaz ve amacı seç (giriş, depozito, sözleşme). Bağlantının ne kadar süre geçerli olacağını ayarla.' },
      { n: '2', title: 'Bağlantıyı kopyala ve gönder', body: 'Oluşturulan bağlantıyı WhatsApp, e-posta veya herhangi bir mesajlaşma uygulamasıyla paylaş. Bağlantı misafirine güvenli bir yükleme sayfası açar.' },
      { n: '3', title: 'Filigranlanmış kimliği al', body: 'Misafirin kendi tarayıcısında kimliğini yükler. Filigran basılır — sana, amaca ve son kullanma tarihine bağlı. Misafir indirir ve sana gönderir.' },
    ],
    previewTitle: 'Filigranlanmış kimlik nasıl görünür',
    previewWm: "Airbnb Girişi için · Yetki: Yılmaz Apart · 2025-04-01'e kadar geçerli",
    previewNote: 'Filigran yüz dahil tüm görüntüyü kaplar — yapay zeka araçları temizce kaldıramaz',
    whyTitle: 'Ev sahipleri neden WaterID kullanır',
    why: [
      { icon: '🔒', title: 'Sıfır sunucu depolama', body: 'Filigran işlemi tamamen misafirin tarayıcısında gerçekleşir. Sunucularınızda ham kimlik dosyaları işlemek zorunda kalmazsınız — hukuken ve KVKK/GDPR açısından daha güvenli.' },
      { icon: '🛡️', title: 'Kurcalamaya dayanıklı filigran', body: 'Filigran yüz ve belge numarası dahil tüm görüntüyü kaplar. Yapay zeka inpainting, belgeyi görünür şekilde bozmadan kaldıramaz.' },
      { icon: '⏰', title: 'Otomatik son kullanma', body: '1 hafta, 1 ay veya daha uzun ayarlayın. Süre dolduktan sonra filigran, kimliğin yeni kullanımlar için artık geçerli olmadığını kanıtlar.' },
      { icon: '📋', title: 'Amaca kilitli', body: 'Filigran tam amacı belirtir. Misafirin kimliği başka bir yerde kullanılırsa, filigran kötüye kullanımı izlenebilir kılar.' },
      { icon: '🌍', title: '11 dil', body: 'Yükleme sayfası otomatik olarak çeviri yapar. Uluslararası misafirler talimatları kendi dillerinde görür.' },
      { icon: '💸', title: 'Tamamen ücretsiz', body: 'Hesap yok, abonelik yok, limit yok. Aracı aç, bağlantı oluştur, bitti.' },
    ],
    useCasesTitle: 'Bu durumlar için tasarlandı',
    useCases: [
      { icon: '🏠', label: 'Airbnb & kısa dönem kiralık', desc: 'Listeleme adınıza ve giriş tarihine bağlı giriş kimlik doğrulaması.' },
      { icon: '📝', label: 'Uzun vadeli kiralık depozito', desc: 'Depozito anlaşmaları için kiracı kimliğini topla — filigranlanmış, amaca kilitli, hukuken daha güvenli.' },
      { icon: '🏨', label: 'Oteller & pansiyonlar', desc: 'Kartsız rezervasyonlar veya ön ödemeler için rezervasyon doğrulaması.' },
      { icon: '✍️', label: 'Sözleşme imzalama', desc: 'Kira sözleşmesi imzalamadan önce imzalayanla eşleştirmek için filigranlanmış kimlik topla.' },
    ],
    faqTitle: 'Sık sorulan sorular',
    faqs: [
      { q: 'WaterID misafirimin kimliğini saklar mı?', a: 'Hayır. Filigran işleminin tamamı misafirin tarayıcısında Canvas API kullanılarak çalışır. Hiçbir görüntü verisi herhangi bir sunucuya gönderilmez. Teknik olarak kimliği görmemiz imkânsız.' },
      { q: 'Filigran kaldırılabilir mi?', a: 'Filigran, fotoğraf ve belge numarası dahil tüm görüntüye yüksek opaklıkta çapraz olarak render edilir. Yapay zeka inpainting araçlarının yüzü ve tüm belge ayrıntılarını doldurması gerekir — açıkça sahte bir sonuç üretir. Temiz şekilde kaldırılamaz.' },
      { q: 'Misafirim bağlantıyı kaybederse veya süresi dolarsa ne olur?', a: 'Yeni bir bağlantı oluşturun. 30 saniyeden az sürer. Eski bağlantı süresi dolduktan sonra yükleme kabul etmeyi bırakır.' },
      { q: 'Yüklenecek bir uygulama var mı?', a: 'Hayır. WaterID bir web aracıdır — herhangi bir akıllı telefon, tablet veya masaüstü tarayıcısında kurulum olmadan çalışır.' },
    ],
    ctaBottomTitle: 'Kimliklerini güvenle toplamaya hazır mısın?',
    ctaBottomSub: 'Bir dakikadan kısa sürede bağlantı oluştur. Kayıt gerekmez.',
    ctaBottom: 'Ücretsiz Başla →',
    backToHome: '← Ana sayfaya dön',
    photoLabel: 'Fotoğraf',
    nameLabel: 'Ad',
    dobLabel: 'Doğum tarihi',
    idLabel: 'Kimlik No.',
    trustStorageTitle: 'Sıfır sunucu depolama',
    trustStorageBody: 'Görüntüler misafirin cihazını hiç terk etmez',
    trustAccountTitle: 'Hesap gerekmez',
    trustAccountBody: 'Aç ve kullan — kayıt yok, sürtünme yok',
    trustTimeTitle: 'Bir dakikadan az',
    trustTimeBody: 'Açıktan bağlantı gönderimine 60 saniyeden az',
  },
} as const;

function FakeIDWithWatermark({ watermarkText, photoLabel, nameLabel, dobLabel, idLabel }: {
  watermarkText: string;
  photoLabel: string;
  nameLabel: string;
  dobLabel: string;
  idLabel: string;
}) {

  const repeats = Array.from({ length: 9 });

  return (
    <div className="relative bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 rounded-2xl p-5 overflow-hidden select-none shadow-inner">
      {/* ID card layout */}
      <div className="flex gap-4 relative z-10">
        {/* Photo placeholder */}
        <div className="w-20 h-24 bg-slate-200 rounded-xl flex-shrink-0 flex flex-col items-center justify-center gap-1 border border-slate-300">
          <div className="w-10 h-10 rounded-full bg-slate-300" />
          <div className="w-14 h-6 rounded bg-slate-300" />
          <p className="text-[9px] text-slate-400 font-medium">{photoLabel}</p>
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
  const tr = L[lang];

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
            <FakeIDWithWatermark
              watermarkText={tr.previewWm}
              photoLabel={tr.photoLabel}
              nameLabel={tr.nameLabel}
              dobLabel={tr.dobLabel}
              idLabel={tr.idLabel}
            />
            <div className="flex items-start gap-2 bg-blue-50 rounded-xl p-3">
              <CheckCircle size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-700 leading-relaxed">{tr.previewNote}</p>
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
              <p className="text-sm font-semibold">{tr.trustStorageTitle}</p>
              <p className="text-xs text-slate-400">{tr.trustStorageBody}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FileText size={22} className="text-green-400" />
              <p className="text-sm font-semibold">{tr.trustAccountTitle}</p>
              <p className="text-xs text-slate-400">{tr.trustAccountBody}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock size={22} className="text-amber-400" />
              <p className="text-sm font-semibold">{tr.trustTimeTitle}</p>
              <p className="text-xs text-slate-400">{tr.trustTimeBody}</p>
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
