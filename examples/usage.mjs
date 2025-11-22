import snapToPdf, { renderPdf } from '../dist/index.js';

async function run() {
  console.log('Running ESM example...');
  const pdf = await snapToPdf('<h1>Hello ESM</h1>');
  console.log('PDF generated:', pdf.toString().substring(0, 20));
}

run();
