# snap-to-pdf

A lightweight HTML → PDF rendering library for Node.js and TypeScript. Convert HTML to pixel-perfect PDFs with a single function call—no API routes, no fetch requests, just a direct Buffer you can use immediately.

## Features

- **One-Function API**: Call `snapToPdf(html, options)` and get a PDF Buffer back instantly
- **No Backend Required**: Generate PDFs directly in your server-side code without creating endpoints
- **Professional Styling**: Built-in formal document styles or bring your own CSS
- **Layout Control**: Smart page breaks, orphan/widow prevention, headers & footers
- **Customization**: Themes, custom fonts, watermarks, and debug tools
- **Framework Support**: Works seamlessly in Node.js, Next.js, Express, NestJS, and serverless environments

## Installation

```bash
npm install snap-to-pdf
```

## Core Concept

`snap-to-pdf` provides a single function that takes HTML and returns a PDF Buffer. You can then:

- Save it to disk
- Send it in an HTTP response
- Trigger a browser download
- Upload it to cloud storage
- Use it in any server-side workflow

**No API calls required.** The library runs entirely server-side and returns the PDF directly.

## Quick Start

### Node.js

Generate a PDF and save it to disk:

```typescript
import { snapToPdf } from 'snap-to-pdf';
import { writeFileSync } from 'fs';

const html = '<h1>Invoice #12345</h1><p>Total: $1,234.56</p>';

const pdfBuffer = await snapToPdf(html, { format: 'A4' });

writeFileSync('invoice.pdf', pdfBuffer);
```

### Express / NestJS

Return a PDF directly in an HTTP response:

```typescript
import { snapToPdf } from 'snap-to-pdf';
import express from 'express';

const app = express();

app.post('/generate-pdf', async (req, res) => {
  const { html } = req.body;
  
  const pdfBuffer = await snapToPdf(html, { format: 'A4' });
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
  res.send(pdfBuffer);
});
```

### Next.js (App Router)

The library must run server-side. Use Route Handlers or Server Actions.

**Route Handler (Recommended for downloads):**

```typescript
import { snapToPdf } from 'snap-to-pdf';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { html } = await request.json();
  
  const pdfBuffer = await snapToPdf(html, { format: 'A4' });
  
  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"',
    },
  });
}
```

**Server Action (Recommended for server-side workflows):**

```typescript
'use server';

import { snapToPdf } from 'snap-to-pdf';
import { writeFileSync } from 'fs';

export async function generateInvoice(invoiceData: InvoiceData) {
  const html = renderInvoiceTemplate(invoiceData);
  
  const pdfBuffer = await snapToPdf(html, { 
    format: 'A4',
    theme: 'standard' 
  });
  
  writeFileSync(`./invoices/${invoiceData.id}.pdf`, pdfBuffer);
  
  return { success: true };
}
```

**Client Component (calls Route Handler):**

```typescript
'use client';

export function DownloadButton({ html }: { html: string }) {
  const handleDownload = async () => {
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      body: JSON.stringify({ html }),
    });
    
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return <button onClick={handleDownload}>Download PDF</button>;
}
```

### Serverless (Vercel, AWS Lambda, etc.)

Works in serverless functions—just ensure Puppeteer is available in your runtime:

```typescript
import { snapToPdf } from 'snap-to-pdf';

export default async function handler(req, res) {
  const { html } = req.body;
  
  const pdfBuffer = await snapToPdf(html, { format: 'A4' });
  
  res.setHeader('Content-Type', 'application/pdf');
  res.send(pdfBuffer);
}
```

## Themes & Styling

`snap-to-pdf` uses a theme-based system to ensure your PDFs look professional out of the box.

### Using Themes

A theme automatically handles:
- **Typography**: Professional font stacks and sizing
- **Layout**: Print-safe margins and spacing
- **Components**: Styled tables, lists, and blockquotes
- **Print Optimization**: Smart page breaks and orphan/widow control

```typescript
// Applies the 'standard' theme by default
const pdf = await snapToPdf(html);

// Choose a specific theme
const pdf = await snapToPdf(html, { theme: 'corporate' });

// Disable theming for raw HTML rendering
const pdf = await snapToPdf(html, { theme: 'none' });
```

### Available Themes

| Theme | Description |
|-------|-------------|
| `standard` | **Default.** Professional formal styling suitable for most documents. Uses Georgia/Times fonts. |
| `clean` | Modern, minimalist look with sans-serif fonts (Helvetica/Arial) and ample whitespace. |
| `corporate` | Business-oriented style with blue accents and serif headers. |
| `minimal` | Bare-bones styling, high contrast, good for data-heavy reports. |
| `none` | No styling injected. You get raw HTML rendering. |

### Customizing Styles

Themes provide a solid foundation. You can override any style by including your own CSS in the HTML:

```html
<style>
  /* Override theme font */
  body { font-family: 'Open Sans', sans-serif; }
  /* Custom header color */
  h1 { color: #d32f2f; }
</style>
<h1>Customized Report</h1>
```

## Advanced Usage

### Custom Themes, Fonts, and Watermarks

```typescript
import { snapToPdf, SnapOptions } from 'snap-to-pdf';

const options: SnapOptions = {
  format: 'A4',
  theme: 'corporate',
  watermark: {
    text: 'CONFIDENTIAL',
    color: 'rgba(255, 0, 0, 0.1)',
    opacity: 0.5
  },
  fonts: [
    {
      family: 'Roboto',
      path: './fonts/Roboto-Regular.ttf',
      weight: 400
    }
  ],
  explain: true
};

const pdfBuffer = await snapToPdf('<h1>Report</h1>', options);
```

### Upload to Cloud Storage

```typescript
import { snapToPdf } from 'snap-to-pdf';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const html = '<h1>Monthly Report</h1>';
const pdfBuffer = await snapToPdf(html, { format: 'A4' });

const s3 = new S3Client({ region: 'us-east-1' });
await s3.send(new PutObjectCommand({
  Bucket: 'my-bucket',
  Key: 'reports/monthly.pdf',
  Body: pdfBuffer,
  ContentType: 'application/pdf',
}));
```

### Trigger Browser Download (Server Action)

```typescript
'use server';

import { snapToPdf } from 'snap-to-pdf';

export async function downloadPdf(html: string) {
  const pdfBuffer = await snapToPdf(html, { format: 'A4' });
  
  return Buffer.from(pdfBuffer).toString('base64');
}
```

```typescript
'use client';

import { downloadPdf } from './actions';

export function DownloadButton({ html }: { html: string }) {
  const handleClick = async () => {
    const base64 = await downloadPdf(html);
    
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return <button onClick={handleClick}>Download PDF</button>;
}
```

## Rendering from a URL

You can render a PDF directly from a live URL with full fidelity—including external fonts, stylesheets, and images.

```typescript
// Render a URL
const pdf = await snapToPdf({ url: 'https://example.com' });

// Render a URL with a theme injected
const pdf = await snapToPdf({ 
  url: 'https://example.com', 
  theme: 'clean',
  injectDefaultStyles: true 
});
```

**Note:** When using `injectDefaultStyles: true` with a URL, the theme styles are injected *after* the page loads, allowing you to apply consistent branding to external content.

## CLI Usage

Run `snap-to-pdf` directly from your terminal.

```bash
# Render a URL
npx snap-to-pdf --url https://example.com -o output.pdf

# Render a local HTML file
npx snap-to-pdf ./page.html -o result.pdf

# Render with a theme and landscape orientation
npx snap-to-pdf --url https://example.com --theme corporate --landscape

# Render with custom margins
npx snap-to-pdf --url https://example.com --margins "20mm"
```

**Options:**
- `--url <url>`: URL to render (mutually exclusive with `--html` or input argument)
- `--html <html>`: HTML content to render (mutually exclusive with `--url`)
- `-o, --output <path>`: Output PDF file path (default: `output.pdf`)
- `--format <format>`: PDF Format (A4, Letter, etc.) (default: `A4`)
- `--landscape`: Landscape orientation
- `--theme <theme>`: Apply a theme (`clean`, `corporate`, `minimal`)
- `--inject-default-styles`: Inject default styles for the theme (default: `true`)
- `--no-inject-default-styles`: Do not inject default styles
- `--header-template <template>`: HTML template for the print header
- `--footer-template <template>`: HTML template for the print footer
- `--margins <margins>`: Margins (e.g., "10mm" or JSON string)
- `--debug`: Enable debug mode to visualize layout boundaries

## Running Examples

The library includes a fully working example that generates a formal document with a title page, table of contents, and styled sections.

To run the example:

1. **Build the project** (if running from source):
   ```bash
   npm run build
   ```

2. **Run the example script**:
   ```bash
   node examples/generate-formal-document.js
   ```

This will create `formal-document-output.pdf` in the `examples` directory.

## API Reference

### `snapToPdf(html: string, options?: SnapOptions): Promise<Buffer>`

Converts HTML to a PDF Buffer.

**Parameters:**
- `html`: HTML string, file path, or URL
- `options`: Configuration object (see below)

**Returns:** `Promise<Buffer>` - The generated PDF as a Buffer

### `SnapOptions`

| Option | Type | Description |
|--------|------|-------------|
| `url` | `string` | URL to render (mutually exclusive with `html`). |
| `html` | `string` | HTML content to render (mutually exclusive with `url`). |
| `theme` | `'standard' \| 'clean' \| 'corporate' \| 'minimal' \| 'none'` | Prebuilt theme (default: `'standard'`). |
| `injectDefaultStyles` | `boolean` | Inject theme styles (default: `true`). |
| `format` | `string` | PDF Format (e.g., 'A4', 'Letter'). |
| `landscape` | `boolean` | Enable landscape orientation. |
| `watermark` | `object` | Configuration for text watermarks. |
| `fonts` | `array` | List of custom fonts to embed. |
| `debug` | `boolean` | Visual debug overlay. |
| `explain` | `boolean` | Analyze and log layout issues. |
| `path` | `string` | Optional: Save PDF to this file path. |
| `margin` | `object` | Page margins ({ top, right, bottom, left }). |
| `printBackground` | `boolean` | Print background graphics (default: `true`). |
| `displayHeaderFooter` | `boolean` | Show header and footer. |
| `headerTemplate` | `string` | HTML template for the header. |
| `footerTemplate` | `string` | HTML template for the footer. |

## PDF Configuration Details

### Page Formats
Supported formats include:
- `Letter` (default in some regions), `Legal`, `Tabloid`, `Ledger`
- `A0`, `A1`, `A2`, `A3`, `A4` (standard default), `A5`, `A6`

### Margins
Margins can be configured using the `margin` option object. 
Supported units: `mm`, `cm`, `in`, `px`.

```typescript
// Example margin configuration
margin: {
  top: '20mm',
  right: '20mm',
  bottom: '20mm',
  left: '20mm'
}
```

**Note:** Themes automatically apply optimized margins. Providing a `margin` option will override the theme's defaults.

### Headers & Footers
To display headers and footers, you must:
1. Set `displayHeaderFooter: true`
2. Provide `headerTemplate` and/or `footerTemplate` HTML
3. Ensure margins are large enough to accommodate the content

Variables available in templates:
- `<span class="date"></span>`
- `<span class="title"></span>`
- `<span class="url"></span>`
- `<span class="pageNumber"></span>`
- `<span class="totalPages"></span>`

```typescript
headerTemplate: '<div style="font-size: 10px; width: 100%; text-align: center;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
```

## Environment Detection

The library automatically detects whether it's running in a browser or Node.js environment:

- ✅ **Server-side** (Node.js, API routes, server actions): Full PDF generation works
- ❌ **Client-side** (React components, browser): Throws helpful error with guidance

**Explicit imports (optional):**

```typescript
import { snapToPdf } from 'snap-to-pdf/node';
import { snapToPdf } from 'snap-to-pdf/browser';
```

## Important Notes

### Next.js Usage

`snap-to-pdf` must run server-side. It cannot run in client components because it requires Node.js and Puppeteer.

**✅ DO:** Use in Route Handlers, Server Actions, or Server Components  
**❌ DON'T:** Import in Client Components (marked with `'use client'`)

If you need to trigger PDF generation from a client component, call a Route Handler or Server Action.

### Serverless Environments

Ensure Puppeteer is available in your serverless runtime. Some platforms (like Vercel) may require additional configuration or custom layers for Puppeteer support.

## License

MIT
