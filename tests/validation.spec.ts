import { describe, it, expect, vi } from 'vitest';
import { validateOptions } from '../src/utils/validation';
import { SnapOptions } from '../src/types';

describe('validateOptions', () => {
  it('should warn if headerTemplate is provided without margins', () => {
    const consoleSpy = vi.spyOn(console, 'warn');
    const options: SnapOptions = { headerTemplate: '<div>Header</div>' };
    
    validateOptions(options);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('headerTemplate is provided but no margins are set'));
    consoleSpy.mockRestore();
  });

  it('should warn if footerTemplate is provided without margins', () => {
    const consoleSpy = vi.spyOn(console, 'warn');
    const options: SnapOptions = { footerTemplate: '<div>Footer</div>' };
    
    validateOptions(options);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('footerTemplate is provided but no margins are set'));
    consoleSpy.mockRestore();
  });

  it('should warn if theme is used with injectDefaultStyles: false', () => {
    const consoleSpy = vi.spyOn(console, 'warn');
    const options: SnapOptions = { theme: 'clean', injectDefaultStyles: false };
    
    validateOptions(options);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Theme styles might not be applied correctly'));
    consoleSpy.mockRestore();
  });

  it('should not warn for valid configurations', () => {
    const consoleSpy = vi.spyOn(console, 'warn');
    const options: SnapOptions = { 
      headerTemplate: '<div>Header</div>', 
      margin: { top: '20px' },
      theme: 'clean',
      injectDefaultStyles: true
    };
    
    validateOptions(options);
    
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should throw error if both url and html are provided', () => {
    const options: SnapOptions = { url: 'https://example.com', html: '<div></div>' };
    expect(() => validateOptions(options)).toThrow('Invalid Configuration: Both "url" and "html" options were provided');
  });
});
