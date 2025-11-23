import { describe, it, expect } from 'vitest';
import { generateFontCss } from '../src/internal/font-manager';

describe('generateFontCss', () => {
  it('should return empty string for empty fonts array', async () => {
    const css = await generateFontCss([]);
    expect(css).toBe('');
  });

  it('should generate CSS for remote URL fonts', async () => {
    const fonts = [{
      family: 'RemoteFont',
      path: 'https://example.com/font.ttf',
      weight: 400
    }];
    
    const css = await generateFontCss(fonts);
    expect(css).toContain("@font-face {");
    expect(css).toContain("font-family: 'RemoteFont';");
    expect(css).toContain("src: url('https://example.com/font.ttf');");
  });

  // Note: Testing local file reading would require mocking fs, which is a bit more involved.
  // For now, we test the logic we can easily isolate.
});
