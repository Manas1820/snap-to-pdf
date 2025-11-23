import { describe, it, expect } from 'vitest';
import snapToPdf from '../src/index';

describe('URL Rendering', () => {
  it('should render a PDF from a URL', async () => {
    // We use a reliable, fast-loading URL. example.com is good.
    const pdf = await snapToPdf({ url: 'https://example.com' });
    expect(pdf).toBeInstanceOf(Buffer);
    expect(pdf.toString('utf-8', 0, 4)).toBe('%PDF');
  }, 30000);

  it('should render a PDF from explicit HTML option', async () => {
    const pdf = await snapToPdf({ html: '<h1>Explicit HTML</h1>' });
    expect(pdf).toBeInstanceOf(Buffer);
    expect(pdf.toString('utf-8', 0, 4)).toBe('%PDF');
  }, 20000);

  it('should throw error if both url and html are provided (via snapToPdf)', async () => {
    await expect(snapToPdf({ url: 'https://example.com', html: '<div></div>' }))
      .rejects
      .toThrow('Invalid Configuration: Both "url" and "html" options were provided');
  });
});
