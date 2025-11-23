# Quick Reference: Using snap-to-pdf in Next.js

## Core Concept

`snap-to-pdf` returns a PDF Buffer directly. No API calls required:

```typescript
const pdfBuffer = await snapToPdf(html, options);
```

Route Handlers and Server Actions are only needed when client components need to trigger PDF generation. This is a Next.js framework constraint, not a library limitation.

## ✅ DO: Use in Route Handlers

When you need to trigger downloads from client components:

```typescript
import { snapToPdf } from 'snap-to-pdf';

export async function POST(req: Request) {
  const { html } = await req.json();
  
  const pdfBuffer = await snapToPdf(html, { format: 'A4' });
  
  return new Response(pdfBuffer, {
    headers: { 
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"'
    }
  });
}
```

## ✅ DO: Use in Server Actions

For server-side workflows (save to disk, upload to cloud, send via email):

```typescript
'use server';

import { snapToPdf } from 'snap-to-pdf';
import { writeFileSync } from 'fs';

export async function generateReport(data: ReportData) {
  const html = renderTemplate(data);
  
  const pdfBuffer = await snapToPdf(html, { 
    format: 'A4',
    useDefaultStyles: true 
  });
  
  writeFileSync(`./reports/${data.id}.pdf`, pdfBuffer);
  
  return { success: true };
}
```

## ✅ DO: Use in Server Components

Generate PDFs during server-side rendering:

```typescript
import { snapToPdf } from 'snap-to-pdf';
import { writeFileSync } from 'fs';

export default async function Page() {
  const html = '<h1>Hello</h1>';
  
  const pdfBuffer = await snapToPdf(html, { format: 'A4' });
  
  writeFileSync('output.pdf', pdfBuffer);
  
  return <div>PDF generated!</div>;
}
```

## ❌ DON'T: Use in Client Components

```typescript
'use client';

import { snapToPdf } from 'snap-to-pdf';

export function MyComponent() {
  const handleClick = async () => {
    await snapToPdf('<h1>Hello</h1>');
  };
  
  return <button onClick={handleClick}>Generate</button>;
}
```

## ✅ INSTEAD: Call Route Handler from Client

```typescript
'use client';

export function MyComponent() {
  const handleClick = async () => {
    const res = await fetch('/api/pdf', {
      method: 'POST',
      body: JSON.stringify({ html: '<h1>Hello</h1>' })
    });
    
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return <button onClick={handleClick}>Generate PDF</button>;
}
```

## Common Patterns

### Pattern 1: Save to Disk

```typescript
'use server';

import { snapToPdf } from 'snap-to-pdf';
import { writeFileSync } from 'fs';

export async function savePdf(html: string) {
  const pdfBuffer = await snapToPdf(html, { format: 'A4' });
  writeFileSync('./output.pdf', pdfBuffer);
  return { success: true };
}
```

### Pattern 2: Upload to S3

```typescript
'use server';

import { snapToPdf } from 'snap-to-pdf';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function uploadPdf(html: string) {
  const pdfBuffer = await snapToPdf(html, { format: 'A4' });
  
  const s3 = new S3Client({ region: 'us-east-1' });
  await s3.send(new PutObjectCommand({
    Bucket: 'my-bucket',
    Key: 'document.pdf',
    Body: pdfBuffer,
    ContentType: 'application/pdf',
  }));
  
  return { success: true };
}
```

### Pattern 3: Client Download (Route Handler)

```typescript
import { snapToPdf } from 'snap-to-pdf';

export async function POST(req: Request) {
  const { html } = await req.json();
  const pdfBuffer = await snapToPdf(html, { format: 'A4' });
  
  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"'
    }
  });
}
```

### Pattern 4: Server Action with Base64 Transfer

```typescript
'use server';

import { snapToPdf } from 'snap-to-pdf';

export async function generatePdf(html: string) {
  const pdfBuffer = await snapToPdf(html, { format: 'A4' });
  return Buffer.from(pdfBuffer).toString('base64');
}
```

```typescript
'use client';

import { generatePdf } from './actions';

export function Button() {
  const handleClick = async () => {
    const base64 = await generatePdf('<h1>Hello</h1>');
    
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
  
  return <button onClick={handleClick}>Generate</button>;
}
```

## Environment Detection

The package automatically detects the environment:

| Environment | Import | Behavior |
|-------------|--------|----------|
| Route Handlers, Server Actions | `import { snapToPdf } from 'snap-to-pdf'` | ✅ Full PDF generation |
| Client Components | `import { snapToPdf } from 'snap-to-pdf'` | ❌ Throws helpful error |
| Explicit Node.js | `import { snapToPdf } from 'snap-to-pdf/node'` | ✅ Full PDF generation |
| Explicit Browser | `import { snapToPdf } from 'snap-to-pdf/browser'` | ❌ Throws helpful error |

## No Configuration Needed

You **don't** need to add anything to `next.config.js`. The package handles everything automatically through conditional exports.

## Troubleshooting

### Error: "Module not found: Can't resolve 'tls'"

**Cause**: You're importing `snap-to-pdf` in a client component.

**Solution**: Move PDF generation to a Route Handler or Server Action.

### Error: "snap-to-pdf cannot run in the browser environment"

**Cause**: You're trying to call `snapToPdf()` in client-side code.

**Solution**: This is the expected behavior! Follow the error message's guidance to use a Route Handler or Server Action.

### PDF generation works locally but fails in production

**Cause**: Puppeteer might not be installed correctly in your deployment environment.

**Solution**: 
- Ensure `snap-to-pdf` is in `dependencies`, not `devDependencies`
- For Vercel, you may need to use a custom Puppeteer layer or switch to a different hosting provider that supports Puppeteer
- Consider using platforms with better Puppeteer support (Railway, Render, AWS Lambda with layers)

