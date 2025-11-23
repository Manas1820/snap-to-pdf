/**
 * Developer testing script
 * 
 * This script allows you to test the library directly from source
 * without building. Useful for rapid iteration during development.
 * 
 * Usage:
 *   npx tsx scripts/dev-test.ts
 */

import snapToPdf from '../src/index';
import fs from 'fs/promises';
import path from 'path';

async function main() {
  console.log('🧪 Running dev test...\n');

  const outputDir = path.resolve(process.cwd(), 'test-output');
  await fs.mkdir(outputDir, { recursive: true });

  // Test 1: Basic HTML string
  console.log('Test 1: Basic HTML string');
  const basicPdf = await snapToPdf('<h1>Hello from dev test!</h1>', {
    format: 'A4',
  });
  await fs.writeFile(path.join(outputDir, 'test-basic.pdf'), basicPdf);
  console.log('✅ Created test-output/test-basic.pdf\n');

  // Test 2: HTML file
  console.log('Test 2: HTML file');
  const filePdf = await snapToPdf('examples/sample.html', {
    format: 'A4',
  });
  await fs.writeFile(path.join(outputDir, 'test-file.pdf'), filePdf);
  console.log('✅ Created test-output/test-file.pdf\n');

  // Test 3: With theme
  console.log('Test 3: With corporate theme');
  const themedPdf = await snapToPdf('<h1>Corporate Report</h1><p>This uses the corporate theme.</p>', {
    theme: 'corporate',
  });
  await fs.writeFile(path.join(outputDir, 'test-theme.pdf'), themedPdf);
  console.log('✅ Created test-output/test-theme.pdf\n');

  // Test 4: With watermark
  console.log('Test 4: With watermark');
  const watermarkedPdf = await snapToPdf('<h1>Confidential Document</h1>', {
    watermark: {
      text: 'DRAFT',
      opacity: 0.3,
      color: '#ff0000',
    },
  });
  await fs.writeFile(path.join(outputDir, 'test-watermark.pdf'), watermarkedPdf);
  console.log('✅ Created test-output/test-watermark.pdf\n');

  // Test 5: With debug and explain
  console.log('Test 5: With debug and explain modes');
  const debugPdf = await snapToPdf(
    '<h1>Debug Test</h1><div class="page-break-before">Page 2</div>',
    {
      debug: true,
      explain: true,
    }
  );
  await fs.writeFile(path.join(outputDir, 'test-debug.pdf'), debugPdf);
  console.log('✅ Created test-output/test-debug.pdf\n');

  console.log('🎉 All tests completed! Check the test-output/ directory.');
}

main().catch((error) => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
