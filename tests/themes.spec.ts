import { describe, it, expect } from 'vitest';
import { themes } from '../src/themes';

describe('themes', () => {
  it('should have the required themes', () => {
    expect(themes).toHaveProperty('clean');
    expect(themes).toHaveProperty('corporate');
    expect(themes).toHaveProperty('minimal');
  });

  it('should contain valid CSS strings', () => {
    expect(themes.clean).toContain('body {');
    expect(themes.corporate).toContain('body {');
    expect(themes.minimal).toContain('body {');
  });
});
