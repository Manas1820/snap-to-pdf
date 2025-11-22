import { describe, it, expect } from 'vitest';
import snapToPdf from '../src/index';

describe('snap-to-pdf', () => {
  it('should render a PDF buffer', async () => {
    const pdf = await snapToPdf('<h1>Hello</h1>');
    expect(pdf).toBeInstanceOf(Buffer);
  });

  it('should fail (example failing test)', () => {
    expect(true).toBe(false);
  });
});
