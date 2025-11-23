import { SnapOptions } from '../types';

/**
 * Validates the provided SnapOptions.
 * 
 * Checks for conflicting options and warns the user.
 * 
 * @param options - The options to validate.
 */
export const validateOptions = (options: SnapOptions): void => {
  if (options.url && options.html) {
    throw new Error('Invalid Configuration: Both "url" and "html" options were provided. Please specify only one source.');
  }

  if (options.headerTemplate && !options.margin) {
    console.warn('Warning: headerTemplate is provided but no margins are set. The header might be hidden.');
  }

  if (options.footerTemplate && !options.margin) {
    console.warn('Warning: footerTemplate is provided but no margins are set. The footer might be hidden.');
  }

  if (options.theme && options.injectDefaultStyles === false) {
    console.warn('Warning: A theme is selected but injectDefaultStyles is false. Theme styles might not be applied correctly.');
  }
};
