/**
 * Test to verify that the browser entry point throws helpful errors
 */

import { describe, it, expect } from 'vitest';

describe('Browser Entry Point', () => {
  it('should throw a helpful error when called in browser environment', async () => {
    // Dynamically import the browser version
    const { snapToPdf } = await import('../src/browser');

    await expect(
      snapToPdf('<h1>Test</h1>', { format: 'A4' })
    ).rejects.toThrow(/cannot run in the browser environment/);
  });

  it('should include helpful guidance in the error message', async () => {
    const { snapToPdf } = await import('../src/browser');

    try {
      await snapToPdf('<h1>Test</h1>');
    } catch (error) {
      const err = error as Error;
      expect(err.message).toContain('Next.js API route');
      expect(err.message).toContain('server action');
      expect(err.message).toContain('snap-to-pdf/node');
    }
  });
});
