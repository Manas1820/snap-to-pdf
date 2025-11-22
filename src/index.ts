import { renderPdf } from './internal/pdf-engine';

export interface SnapOptions {
  format?: 'A4' | 'Letter';
  landscape?: boolean;
}

export const snapToPdf = async (html: string, options: SnapOptions = {}): Promise<Buffer> => {
  return renderPdf(html, options);
};

export { renderPdf };
export default snapToPdf;
