# Browser/Next.js Compatibility Implementation

## Overview

This document explains how `snap-to-pdf` handles browser and Next.js environments automatically.

## Core Concept

`snap-to-pdf` provides a single function that returns a PDF Buffer directly:

```typescript
const pdfBuffer = await snapToPdf(html, options);
```

**No API calls required.** The library runs entirely server-side and returns the PDF immediately.

## The Framework Constraint

Because `snap-to-pdf` requires Node.js and Puppeteer, it **must run server-side**. This creates a challenge in frameworks like Next.js where code can run in both server and client environments.

When users tried to use `snap-to-pdf` in Next.js client components, they encountered bundling errors because:

1. **Puppeteer is Node.js-only**: It requires native Node.js modules (`tls`, `net`, `fs`, `child_process`, etc.)
2. **Next.js bundles client code**: When imported in React components, Next.js tries to bundle Puppeteer for the browser
3. **Browser doesn't have Node.js modules**: This causes "Module not found" errors

## The Solution

We implemented **conditional exports** with automatic environment detection to handle this framework constraint gracefully:

### 1. Dual Entry Points

Created two separate implementations:

- **`src/node.ts`**: Full Puppeteer-based PDF generation (server-side only)
- **`src/browser.ts`**: Lightweight stub that throws helpful errors (client-side)
- **`src/index.ts`**: Re-exports from `node.ts` for backward compatibility

### 2. Conditional Exports in package.json

```json
{
  "exports": {
    ".": {
      "browser": "./dist/browser.js",
      "edge-light": "./dist/browser.js",
      "worker": "./dist/browser.js",
      "node": {
        "import": "./dist/node.js",
        "require": "./dist/node.cjs"
      },
      "default": "./dist/node.js"
    },
    "./node": { ... },
    "./browser": { ... }
  }
}
```

### 3. How It Works

**In Next.js Route Handlers / Server Actions:**
```typescript
import { snapToPdf } from 'snap-to-pdf';

const pdfBuffer = await snapToPdf(html, options);
```

**In Next.js Client Components:**
```typescript
import { snapToPdf } from 'snap-to-pdf';

```

**Explicit Imports (Optional):**
```typescript
import { snapToPdf } from 'snap-to-pdf/node';
import { snapToPdf } from 'snap-to-pdf/browser';
```

## Benefits

### ✅ No Webpack Configuration Needed
Users don't need to add `webpack.config.js` or `next.config.js` hacks.

### ✅ Automatic Environment Detection
The package automatically serves the correct version based on where it's imported.

### ✅ Helpful Error Messages
If accidentally used client-side, users get clear guidance:

```
Error: snap-to-pdf cannot run in the browser environment.

PDF generation requires Node.js and Puppeteer, which are server-side only.

Solutions:
1. Move PDF generation to a Next.js Route Handler (recommended)
2. Use a Server Action in Next.js 13+ App Router
3. Call your backend API that uses snap-to-pdf

Example Route Handler:
// app/api/generate-pdf/route.ts
import { snapToPdf } from 'snap-to-pdf/node';

export async function POST(request: Request) {
  const { html } = await request.json();
  const pdfBuffer = await snapToPdf(html, { format: 'A4' });
  
  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"'
    }
  });
}
```

### ✅ Backward Compatible
Existing code using `import snapToPdf from 'snap-to-pdf'` continues to work in Node.js environments.

### ✅ Type Safety
Full TypeScript support for all entry points with proper `.d.ts` files.

## Files Changed

1. **`src/browser.ts`** (new): Browser stub with helpful errors
2. **`src/node.ts`** (new): Explicit Node.js entry point
3. **`src/index.ts`** (modified): Re-exports from node.ts
4. **`package.json`** (modified): Added conditional exports
5. **`tsup.config.ts`** (modified): Build all entry points
6. **`README.md`** (modified): Added Next.js usage documentation
7. **`examples/nextjs-integration.md`** (new): Comprehensive Next.js guide
8. **`tests/browser.test.ts`** (new): Tests for browser stub
9. **`CHANGELOG.md`** (modified): Documented changes

## Testing

All tests pass:
```bash
npm test
```

Build succeeds:
```bash
npm run build
```

## Usage Examples

### Node.js (Direct Buffer Usage)

```typescript
import { snapToPdf } from 'snap-to-pdf';
import { writeFileSync } from 'fs';

const html = '<h1>Invoice #12345</h1>';
const pdfBuffer = await snapToPdf(html, { format: 'A4' });

writeFileSync('invoice.pdf', pdfBuffer);
```

### Express (Return in HTTP Response)

```typescript
import { snapToPdf } from 'snap-to-pdf';
import express from 'express';

const app = express();

app.post('/generate-pdf', async (req, res) => {
  const { html } = req.body;
  
  const pdfBuffer = await snapToPdf(html, { format: 'A4' });
  
  res.setHeader('Content-Type', 'application/pdf');
  res.send(pdfBuffer);
});
```

### Next.js Route Handler (Client-Triggered Download)

```typescript
import { snapToPdf } from 'snap-to-pdf';

export async function POST(request: Request) {
  const { html } = await request.json();
  
  const pdfBuffer = await snapToPdf(html, { format: 'A4' });
  
  return new Response(pdfBuffer, {
    headers: { 
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"'
    }
  });
}
```

### Next.js Server Action (Server-Side Workflow)

```typescript
'use server';

import { snapToPdf } from 'snap-to-pdf';
import { writeFileSync } from 'fs';

export async function generateReport(data: ReportData) {
  const html = renderTemplate(data);
  
  const pdfBuffer = await snapToPdf(html, { format: 'A4' });
  
  writeFileSync(`./reports/${data.id}.pdf`, pdfBuffer);
  
  return { success: true };
}
```

### Client Component (Calls Route Handler)

```typescript
'use client';

export function DownloadButton({ html }: { html: string }) {
  const handleClick = async () => {
    const res = await fetch('/api/generate-pdf', {
      method: 'POST',
      body: JSON.stringify({ html })
    });
    
    const blob = await res.blob();
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

## Migration Guide

### For Existing Users

No changes needed! The default import still works in Node.js:

```typescript
import snapToPdf from 'snap-to-pdf';
// Still works in Node.js environments
```

### For Next.js Users

If you were using webpack hacks, you can now remove them:

**Before:**
```javascript
// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        puppeteer: false,
        // ... other hacks
      };
    }
    return config;
  }
};
```

**After:**
```javascript
// next.config.js - no special configuration needed!
module.exports = {};
```

## Future Enhancements

Potential improvements for future versions:

1. **Browser-native PDF generation**: Implement a lightweight browser version using `jsPDF` or similar
2. **Edge runtime support**: Optimize for Vercel Edge Functions
3. **Streaming support**: Stream large PDFs instead of buffering
4. **Progress callbacks**: Report generation progress for large documents

## Conclusion

This implementation makes `snap-to-pdf` "just work" in Next.js and other modern frameworks without requiring users to understand the intricacies of Node.js vs browser environments. The library automatically does the right thing based on where it's imported.
