import type { SnapOptions } from './types';

export type { SnapOptions };

/**
 * Browser-compatible stub for snap-to-pdf.
 * 
 * This version is automatically used when importing snap-to-pdf in browser/client-side
 * environments (like Next.js client components). It provides helpful error messages
 * and guidance for proper usage.
 * 
 * @throws {Error} Always throws an error explaining that PDF generation must happen server-side
 */
export const snapToPdf = async (
  _input: string,
  _options: SnapOptions = {}
): Promise<Buffer> => {
  throw new Error(
    `snap-to-pdf cannot run in the browser environment.\n\n` +
    `PDF generation requires Node.js and Puppeteer, which are server-side only.\n\n` +
    `Solutions:\n` +
    `1. Move PDF generation to a Next.js API route (recommended)\n` +
    `2. Use a server action in Next.js 13+ App Router\n` +
    `3. Call your backend API that uses snap-to-pdf\n\n` +
    `Example API route:\n` +
    `// app/api/generate-pdf/route.ts\n` +
    `import { snapToPdf } from 'snap-to-pdf/node';\n` +
    `export async function POST(req) {\n` +
    `  const { content, options } = await req.json();\n` +
    `  const pdf = await snapToPdf(content, options);\n` +
    `  return new Response(pdf, { headers: { 'Content-Type': 'application/pdf' } });\n` +
    `}\n\n` +
    `For more info, visit: https://github.com/coolstorm/snap-to-pdf#browser-usage`
  );
};

export { snapToPdf as renderPdf };
export default snapToPdf;
