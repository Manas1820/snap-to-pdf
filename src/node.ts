import { renderPdf } from './internal/pdf-engine';
import type { SnapOptions } from './types';

export type { SnapOptions };

/**
 * Converts HTML content into a PDF (Node.js only).
 * 
 * This is the main entry point for server-side PDF generation. It accepts HTML strings,
 * file paths, or URLs and returns a Promise that resolves to a PDF Buffer.
 * 
 * ⚠️ This function requires Node.js and cannot run in browser environments.
 * 
 * @example
 * ```typescript
 * // In a Next.js API route or server action
 * import { snapToPdf } from 'snap-to-pdf/node';
 * 
 * const pdf = await snapToPdf('<h1>Hello World</h1>', { format: 'A4' });
 * ```
 * 
 * @param input - The HTML string, file path, or URL to convert.
 * @param options - Configuration options for the PDF generation.
 * @returns A Promise resolving to the PDF as a Buffer.
 */
export const snapToPdf = async (input: string, options: SnapOptions = {}): Promise<Buffer> => {
  return renderPdf(input, options);
};

export { renderPdf };
export default snapToPdf;
