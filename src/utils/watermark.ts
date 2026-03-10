import type { WatermarkParams } from './urlParams';
import { t } from '../i18n';

export interface WatermarkResult {
  dataUrl: string;
  width: number;
  height: number;
}

// Main watermark text line
function buildWatermarkText(params: WatermarkParams): string {
  const tr = t(params.lang);
  const date = new Date(params.expires).toLocaleDateString(tr.dateLocale, {
    year: 'numeric', month: '2-digit', day: '2-digit'
  });
  return tr.wmMain(params.host, params.purpose, date);
}

// Layer 1: Dense diagonal tiling — core anti-AI-removal layer
function drawDiagonalGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  text: string
) {
  ctx.save();
  const fontSize = Math.max(14, Math.min(22, w / 40));
  ctx.font = `bold ${fontSize}px -apple-system, sans-serif`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.38)';
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.20)';
  ctx.lineWidth = 0.4;

  const stepX = fontSize * 18;
  const stepY = fontSize * 3.5;

  ctx.rotate(-Math.PI / 6);  // ~30 degree diagonal

  const diagW = w * 1.6;
  const diagH = h * 1.6;

  for (let y = -diagH * 0.3; y < diagH; y += stepY) {
    for (let x = -diagW * 0.3; x < diagW; x += stepX) {
      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
    }
  }
  ctx.restore();
}

// Layer 2: Horizontal repeating strips
function drawHorizontalStrips(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  text: string
) {
  ctx.save();
  const fontSize = Math.max(12, Math.min(18, w / 50));
  ctx.font = `${fontSize}px -apple-system, sans-serif`;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';

  const stepY = fontSize * 4.5;
  const stepX = fontSize * 22;

  for (let y = stepY; y < h; y += stepY) {
    const offset = ((y / stepY) % 2) * (stepX * 0.5);
    for (let x = -stepX + offset; x < w + stepX; x += stepX) {
      ctx.fillText(text, x, y);
    }
  }
  ctx.restore();
}

// Layer 3: Corner anchors — prevents cropping attacks on all 4 sides
function drawCornerAnchors(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  params: WatermarkParams
) {
  ctx.save();
  const tr = t(params.lang);
  const fontSize = Math.max(13, Math.min(20, w / 45));
  ctx.font = `bold ${fontSize}px -apple-system, sans-serif`;

  const date = new Date(params.expires).toLocaleDateString(tr.dateLocale, {
    year: 'numeric', month: '2-digit', day: '2-digit'
  });
  const line1 = tr.wmCornerTitle;
  const line2 = `${params.host} · ${params.purpose}`;
  const line3 = `${tr.wmValidUntil} ${date}`;
  const pad = fontSize;

  const drawBox = (x: number, y: number, anchor: 'tl' | 'tr' | 'bl' | 'br') => {
    const lines = [line1, line2, line3];
    const lineH = fontSize * 1.5;
    const boxW = Math.max(...lines.map(l => ctx.measureText(l).width)) + pad;
    const boxH = lines.length * lineH + pad;

    let bx = x, by = y;
    if (anchor === 'tr') bx = x - boxW;
    if (anchor === 'bl') by = y - boxH;
    if (anchor === 'br') { bx = x - boxW; by = y - boxH; }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.fillRect(bx, by, boxW, boxH);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
    lines.forEach((line, i) => {
      ctx.fillText(line, bx + pad / 2, by + pad / 2 + (i + 1) * lineH - 4);
    });
  };

  drawBox(0, 0, 'tl');
  drawBox(w, 0, 'tr');
  drawBox(0, h, 'bl');
  drawBox(w, h, 'br');
  ctx.restore();
}

// Layer 4: Edge border text — runs along all 4 edges
function drawEdgeBorders(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  text: string
) {
  ctx.save();
  const fontSize = Math.max(11, Math.min(15, w / 60));
  ctx.font = `bold ${fontSize}px -apple-system, sans-serif`;
  ctx.fillStyle = 'rgba(220, 30, 30, 0.75)';

  const borderH = fontSize * 1.8;

  // Top bar
  ctx.fillRect(0, 0, w, borderH + 4);
  ctx.fillStyle = 'white';
  let x = 0;
  while (x < w) {
    ctx.fillText(text, x, borderH - 2);
    x += ctx.measureText(text).width + 20;
  }

  // Bottom bar
  ctx.fillStyle = 'rgba(220, 30, 30, 0.75)';
  ctx.fillRect(0, h - borderH - 4, w, borderH + 4);
  ctx.fillStyle = 'white';
  x = 0;
  while (x < w) {
    ctx.fillText(text, x, h - 4);
    x += ctx.measureText(text).width + 20;
  }
  ctx.restore();
}

// Layer 5: Subtle random noise — disrupts AI inpainting context
function drawNoisePattern(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  const density = Math.floor(w * h / 800);
  for (let i = 0; i < density; i++) {
    const px = ((Math.sin(i * 127.1) * 0.5 + 0.5)) * w;
    const py = ((Math.sin(i * 311.7) * 0.5 + 0.5)) * h;
    const alpha = 0.15 + (Math.sin(i * 57.3) * 0.5 + 0.5) * 0.15;
    const r = 1 + Math.floor((Math.sin(i * 23.1) * 0.5 + 0.5) * 2);
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
    ctx.fill();
  }
}

export async function applyWatermark(
  file: File,
  params: WatermarkParams
): Promise<WatermarkResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d')!;

      ctx.drawImage(img, 0, 0);

      const text = buildWatermarkText(params);

      drawDiagonalGrid(ctx, canvas.width, canvas.height, text);
      drawHorizontalStrips(ctx, canvas.width, canvas.height, text);
      drawNoisePattern(ctx, canvas.width, canvas.height);
      drawCornerAnchors(ctx, canvas.width, canvas.height, params);
      drawEdgeBorders(ctx, canvas.width, canvas.height, text);

      URL.revokeObjectURL(url);
      resolve({
        dataUrl: canvas.toDataURL('image/jpeg', 0.92),
        width: canvas.width,
        height: canvas.height,
      });
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
}
