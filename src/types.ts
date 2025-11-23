import { PDFOptions } from 'puppeteer';

/**
 * Configuration options for the snap-to-pdf rendering engine.
 * Extends Puppeteer's PDFOptions to provide full control over the PDF generation process.
 */
export interface SnapOptions extends Omit<PDFOptions, 'path'> {
  /**
   * Configuration for a watermark to be overlaid on every page of the PDF.
   */
  watermark?: {
    /**
     * The text content of the watermark.
     */
    text?: string;

    /**
     * Opacity of the watermark text, ranging from 0 (invisible) to 1 (fully opaque).
     * @default 0.1
     */
    opacity?: number;

    /**
     * CSS color string for the watermark text (e.g., '#000', 'rgba(255,0,0,0.5)').
     * @default '#000'
     */
    color?: string;
  };

  /**
   * Enable debug mode to visualize layout boundaries.
   * 
   * When enabled, injects CSS to outline all elements and highlight page break markers.
   * Useful for debugging layout issues and verifying page break logic.
   * 
   * @default false
   */
  debug?: boolean;

  /**
   * HTML template for the print header.
   * Should be valid HTML markup with the following classes used to inject printing values:
   * - `date`: formatted print date
   * - `title`: document title
   * - `url`: document location
   * - `pageNumber`: current page number
   * - `totalPages`: total pages in the document
   * 
   * Note: Margins must be set to ensure the header is visible.
   */
  headerTemplate?: string;

  /**
   * HTML template for the print footer.
   * Should be valid HTML markup with the following classes used to inject printing values:
   * - `date`: formatted print date
   * - `title`: document title
   * - `url`: document location
   * - `pageNumber`: current page number
   * - `totalPages`: total pages in the document
   * 
   * Note: Margins must be set to ensure the footer is visible.
   */
  footerTemplate?: string;

  /**
   * List of custom fonts to embed in the PDF.
   */
  fonts?: {
    /**
     * The font family name to use in CSS.
     */
    family: string;
    /**
     * The absolute path or URL to the font file.
     */
    path: string;
    /**
     * The font weight (e.g., '400', 'bold').
     * @default 'normal'
     */
    weight?: string | number;
    /**
     * The font style (e.g., 'italic').
     * @default 'normal'
     */
    style?: string;
  }[];

  /**
   * Apply a prebuilt theme to the document.
   * - 'standard': Professional formal document styling (default).
   * - 'clean': Minimalist, ample whitespace, sans-serif fonts.
   * - 'corporate': Professional, blue accents, serif headers.
   * - 'minimal': Bare bones, high contrast.
   * - 'none': No default styling (raw HTML).
   */
  theme?: 'standard' | 'clean' | 'corporate' | 'minimal' | 'none';

  /**
   * Enable "Explain PDF Issues" mode.
   * Analyzes the page for common layout problems and logs them to the console.
   * @default false
   */
  explain?: boolean;
}
