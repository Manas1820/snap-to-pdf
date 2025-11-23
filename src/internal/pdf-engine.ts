import puppeteer from 'puppeteer';
import { SnapOptions } from '../types';
import { normalizeInput } from './input-normalizer';

import { generateFontCss } from './font-manager';
import { themes } from '../themes';
import { validateOptions } from '../utils/validation';

/**
 * Renders the provided input into a PDF buffer using Puppeteer.
 * 
 * This function handles the lifecycle of the headless browser, input normalization,
 * style injection (default styles, watermarks, debug mode), and PDF generation.
 * 
 * @param input - The HTML string, file path, or URL to render.
 * @param options - Configuration options for the rendering process.
 * @returns A promise that resolves to a Buffer containing the generated PDF.
 */
export const renderPdf = async (input: string, options: SnapOptions = {}): Promise<Buffer> => {
  validateOptions(options);
  const normalized = await normalizeInput(input);
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    if (normalized.type === 'url' || (normalized.type === 'file' && normalized.url)) {
      await page.goto(normalized.url!, { waitUntil: 'networkidle0' });
    } else {
      await page.setContent(normalized.content, { waitUntil: 'networkidle0' });
    }

    if (options.fonts) {
      const fontCss = await generateFontCss(options.fonts);
      if (fontCss) {
        await page.addStyleTag({ content: fontCss });
      }
    }

    // Inject theme styles (defaults to 'standard' if not provided)
    const themeName = options.theme || 'standard';
    if (themeName !== 'none' && themes[themeName]) {
      await page.addStyleTag({ content: themes[themeName] });
    }

    if (options.watermark?.text) {
      const opacity = options.watermark.opacity ?? 0.1;
      const color = options.watermark.color ?? '#000';
      const css = `
        .snap-watermark {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 80px;
          font-family: sans-serif;
          font-weight: bold;
          color: ${color};
          opacity: ${opacity};
          z-index: 9999;
          pointer-events: none;
          white-space: nowrap;
        }
      `;
      await page.addStyleTag({ content: css });
      await page.evaluate((text) => {
        const div = document.createElement('div');
        div.className = 'snap-watermark';
        div.textContent = text;
        document.body.appendChild(div);
      }, options.watermark.text);
    }

    if (options.debug) {
      const debugCss = `
        * { outline: 1px solid rgba(255,0,0,0.1) !important; }
        .page-break-before { border-top: 2px dashed red !important; position: relative; }
        .page-break-before::before { content: 'Page Break Before'; position: absolute; top: -20px; left: 0; color: red; font-size: 10px; background: white; padding: 2px; }
        .page-break-after { border-bottom: 2px dashed red !important; position: relative; }
        .page-break-after::after { content: 'Page Break After'; position: absolute; bottom: -20px; left: 0; color: red; font-size: 10px; background: white; padding: 2px; }
      `;
      await page.addStyleTag({ content: debugCss });
    }

    // Explain PDF Issues Mode
    if (options.explain) {
      const issues = await page.evaluate(() => {
        const issues: string[] = [];
        // Check for overflowing elements
        document.querySelectorAll('*').forEach((el) => {
          if (el.scrollWidth > el.clientWidth) {
            issues.push(`Overflow detected in element: ${el.tagName} (class: ${el.className})`);
          }
        });
        // Check for potential page break issues
        document.querySelectorAll('.page-break-before, .page-break-after').forEach((el) => {
          const style = window.getComputedStyle(el);
          if (style.display === 'none') {
            issues.push(`Page break element hidden: ${el.tagName} (class: ${el.className})`);
          }
        });
        return issues;
      });

      if (issues.length > 0) {
        console.warn('--- PDF Layout Issues Detected ---');
        issues.forEach((issue) => console.warn(`- ${issue}`));
        console.warn('----------------------------------');
      } else {
        console.log('No obvious layout issues detected.');
      }
    }

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: !!(options.headerTemplate || options.footerTemplate),
      headerTemplate: options.headerTemplate,
      footerTemplate: options.footerTemplate,
      margin: options.margin || (options.headerTemplate || options.footerTemplate ? { top: '20mm', bottom: '20mm' } : undefined),
      ...options
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
};
