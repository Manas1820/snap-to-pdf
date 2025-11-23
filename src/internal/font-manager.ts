import { SnapOptions } from '../types';
import path from 'path';
import fs from 'fs/promises';

/**
 * Generates the CSS @font-face rules for the provided fonts.
 * 
 * @param fonts - The list of fonts to embed.
 * @returns A promise that resolves to the CSS string containing the @font-face rules.
 */
export const generateFontCss = async (fonts: SnapOptions['fonts']): Promise<string> => {
  if (!fonts || fonts.length === 0) {
    return '';
  }

  const fontFaces = await Promise.all(fonts.map(async (font) => {
    let src = '';
    
    if (/^https?:\/\//.test(font.path)) {
      src = `url('${font.path}')`;
    } else {
      // For local files, we read them and convert to base64 to ensure they render correctly
      // regardless of the page context (file:// vs http://)
      try {
        const fontPath = path.resolve(font.path);
        const buffer = await fs.readFile(fontPath);
        const base64 = buffer.toString('base64');
        // Determine mime type based on extension
        const ext = path.extname(fontPath).toLowerCase();
        let mime = 'application/octet-stream';
        if (ext === '.ttf') mime = 'font/ttf';
        else if (ext === '.woff') mime = 'font/woff';
        else if (ext === '.woff2') mime = 'font/woff2';
        else if (ext === '.otf') mime = 'font/otf';
        
        src = `url('data:${mime};base64,${base64}')`;
      } catch (error) {
        console.warn(`Failed to load font: ${font.path}`, error);
        return '';
      }
    }

    return `
      @font-face {
        font-family: '${font.family}';
        src: ${src};
        font-weight: ${font.weight || 'normal'};
        font-style: ${font.style || 'normal'};
      }
    `;
  }));

  return fontFaces.join('\n');
};
