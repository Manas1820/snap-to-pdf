# snap-to-pdf

A lightweight HTML → PDF rendering library for Node + TypeScript, designed to give developers pixel-perfect PDF output from HTML input with simple APIs and deep styling controls.

## Installation

```bash
npm install snap-to-pdf
```

## Usage

### JavaScript (CommonJS)

```javascript
const snapToPdf = require('snap-to-pdf');

async function generate() {
  const pdfBuffer = await snapToPdf('<h1>Hello World</h1>');
  // ... save buffer to file
}
```

### JavaScript (ESM)

```javascript
import snapToPdf from 'snap-to-pdf';

async function generate() {
  const pdfBuffer = await snapToPdf('<h1>Hello World</h1>');
}
```

### TypeScript

```typescript
import snapToPdf, { SnapOptions } from 'snap-to-pdf';

const options: SnapOptions = {
  format: 'A4',
  landscape: true
};

const pdfBuffer = await snapToPdf('<h1>Hello World</h1>', options);
```

## API Reference

### `snapToPdf(html: string, options?: SnapOptions): Promise<Buffer>`

Default export. Renders HTML string to PDF buffer.

### `renderPdf(html: string, options?: SnapOptions): Promise<Buffer>`

Named export alias for `snapToPdf`.

## Development

1.  Clone the repository
2.  Install dependencies: `npm install`
3.  Build: `npm run build`
4.  Test: `npm test`
5.  Lint: `npm run lint`
