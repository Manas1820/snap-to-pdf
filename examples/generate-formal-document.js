/**
 * Example: Generating a Formal PDF Document
 * 
 * This example demonstrates how to generate a professional, formal PDF
 * using snap-to-pdf with the built-in formal document styling.
 */

import { snapToPdf } from '../dist/index.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateFormalDocument() {
  console.log('📄 Generating formal document PDF...\n');

  // Read the HTML example
  const htmlPath = join(__dirname, 'formal-document-example.html');
  const htmlContent = readFileSync(htmlPath, 'utf-8');

  // Generate PDF with formal styling
  const pdfBuffer = await snapToPdf(htmlContent, {
    format: 'A4',
    theme: 'standard',
    path: join(__dirname, '../formal-document-output.pdf'),
    displayHeaderFooter: false,
    printBackground: true,
    preferCSSPageSize: true,
  });

  console.log('✅ PDF generated successfully!');
  console.log('📍 Location: formal-document-output.pdf');
  console.log(`📊 Size: ${(pdfBuffer.length / 1024).toFixed(2)} KB\n`);
  
  return pdfBuffer;
}

// Run the example
generateFormalDocument().catch(console.error);
