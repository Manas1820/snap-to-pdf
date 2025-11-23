import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import snapToPdf from '../src/index';
import { TestServer } from './test-server';
import path from 'path';
import puppeteer from 'puppeteer';

// Mock puppeteer to spy on internal calls if needed, but for now we rely on integration behavior.
// Actually, to verify order of operations (theme injection), we might need to spy on the page object.
// But that's hard with the current architecture where `renderPdf` creates its own browser/page.
// We can rely on the output or side effects.

describe('URL Rendering (Integration)', () => {
  let server: TestServer;
  let baseUrl: string;

  beforeAll(async () => {
    server = new TestServer(path.join(__dirname, 'fixtures'));
    baseUrl = await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  it('should render a PDF from a local server URL', async () => {
    const url = `${baseUrl}/test-page.html`;
    const pdf = await snapToPdf({ url });
    
    expect(pdf).toBeInstanceOf(Buffer);
    expect(pdf.length).toBeGreaterThan(0);
    expect(pdf.toString('utf-8', 0, 4)).toBe('%PDF');
  });

  it('should render a PDF from explicit HTML option', async () => {
    const pdf = await snapToPdf({ html: '<h1>Explicit HTML</h1>' });
    expect(pdf).toBeInstanceOf(Buffer);
    expect(pdf.toString('utf-8', 0, 4)).toBe('%PDF');
  });

  it('should throw error if both url and html are provided', async () => {
    await expect(snapToPdf({ url: 'https://example.com', html: '<div></div>' }))
      .rejects
      .toThrow('Invalid Configuration: Both "url" and "html" options were provided');
  });

  it('should fail gracefully for 404 URLs (Puppeteer behavior)', async () => {
    // Puppeteer page.goto doesn't throw on 404, it just loads the 404 page.
    // So we expect a PDF to be generated, but it might contain "Not Found".
    const url = `${baseUrl}/non-existent.html`;
    const pdf = await snapToPdf({ url });
    expect(pdf).toBeInstanceOf(Buffer);
    // We can't easily check text content of PDF without a parser, 
    // but we verify it doesn't crash.
  });

  it('should throw error for invalid URL protocol', async () => {
    await expect(snapToPdf({ url: 'htp://invalid-protocol' }))
      .rejects
      .toThrow();
  });

  it('should throw error for unreachable hosts', async () => {
    // Use a reserved domain that definitely doesn't exist or is unreachable
    await expect(snapToPdf({ url: 'http://this-domain-does-not-exist-12345.com' }))
      .rejects
      .toThrow();
  }, 10000);
});

