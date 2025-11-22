import snapToPdf, { renderPdf } from '../src/index';

async function run() {
  console.log('Running TS example...');
  const pdf = await snapToPdf('<h1>Hello TS</h1>');
  console.log('PDF generated:', pdf.toString().substring(0, 20));
}

run();
