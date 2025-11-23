import { describe, it, expect } from 'vitest';
import snapToPdf from '../src/index';

describe('snap-to-pdf', () => {
  it('should render a PDF buffer from HTML string', async () => {
    const pdf = await snapToPdf('<h1>Hello World</h1>');
    expect(pdf).toBeInstanceOf(Buffer);
    // PDF magic number: %PDF
    expect(pdf.toString('utf-8', 0, 4)).toBe('%PDF');
  }, 20000); // Increase timeout for Puppeteer launch
});
