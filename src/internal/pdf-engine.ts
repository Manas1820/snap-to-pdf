import { SnapOptions } from '../index';

export const renderPdf = async (html: string, _options: SnapOptions): Promise<Buffer> => {
  // Mock implementation
  console.log(`Rendering PDF for HTML length: ${html.length}`);
  return Buffer.from(`%PDF-1.4 ... (mock pdf content for ${html.substring(0, 10)}...)`);
};
