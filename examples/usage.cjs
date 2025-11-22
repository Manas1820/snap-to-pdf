const snapToPdf = require('../dist/index.cjs');
const { renderPdf } = require('../dist/index.cjs');

async function run() {
  console.log('Running CJS example...');
  const pdf = await (snapToPdf.default || snapToPdf)('<h1>Hello CJS</h1>');
  console.log('PDF generated:', pdf.toString().substring(0, 20));
}

run();
