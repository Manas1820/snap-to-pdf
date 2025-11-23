# Default Formal Styling Feature

## Overview

The `useDefaultStyles` option provides automatic professional formatting for PDFs without requiring users to write any CSS. This feature makes it incredibly easy to generate clean, formal documents with a single option.

## Usage

```typescript
import { snapToPdf } from 'snap-to-pdf';

const html = `
  <h1>Business Report</h1>
  <h2>Executive Summary</h2>
  <p>Your content here...</p>
  <table>
    <thead>
      <tr><th>Metric</th><th>Value</th></tr>
    </thead>
    <tbody>
      <tr><td>Revenue</td><td>$15.4M</td></tr>
    </tbody>
  </table>
`;

await snapToPdf(html, {
  format: 'A4',
  useDefaultStyles: true,  // ✨ That's it!
  path: 'report.pdf'
});
```

## What's Included

The default styling provides:

### Typography
- **Body font**: Georgia, Times New Roman (11pt)
- **Headings**: Hierarchical sizing from 24pt (h1) to 10pt (h6)
- **Line height**: 1.6 for optimal readability
- **Text alignment**: Justified with proper orphan/widow control

### Spacing
- **Page margins**: 2.5cm top/bottom, 2cm left/right
- **Section spacing**: Consistent vertical rhythm
- **Paragraph spacing**: 12pt between paragraphs
- **List spacing**: Proper indentation and item spacing

### Tables
- Professional borders with subtle gray colors
- Header styling with light gray background
- Striped rows for better readability
- Responsive width with proper padding

### Lists
- Hierarchical bullet/numbering styles
- Proper nesting with different markers
- Consistent spacing

### Code Blocks
- Monospace font (Courier New, Consolas)
- Light gray background
- Blue left border accent
- Syntax-friendly styling

### Blockquotes
- Left border accent
- Italic text
- Light background
- Citation styling

### Page Breaks
- Automatic: Headings stay with following content
- Manual: `.page-break`, `.page-break-before` classes
- Orphan/widow control: Minimum 3 lines

### Utility Classes
- Text alignment: `.text-center`, `.text-right`, `.text-left`
- Spacing: `.mt-small`, `.mb-large`, etc.
- Typography: `.font-small`, `.text-bold`, `.text-muted`
- Layout: `.avoid-break`, `.keep-together`

## Customization

User-provided CSS will **override** the default styles, allowing full customization:

```typescript
const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        /* Your custom styles override defaults */
        h1 { color: #0066cc; }
        body { font-family: Arial, sans-serif; }
      </style>
    </head>
    <body>
      <h1>Custom Styled Heading</h1>
      <p>Body text with default styling...</p>
    </body>
  </html>
`;

await snapToPdf(html, {
  useDefaultStyles: true,  // Defaults applied first
  path: 'custom.pdf'       // Then your styles override
});
```

## Implementation Details

### File Structure
- **`src/internal/formal-styles.ts`**: Contains the `FORMAL_DOCUMENT_STYLES` constant
- **`src/internal/pdf-engine.ts`**: Injects styles when `useDefaultStyles` is enabled
- **`src/types.ts`**: TypeScript interface with `useDefaultStyles` option
- **`examples/formal-document-style.css`**: Full CSS file for reference
- **`examples/use-default-styles.js`**: Working example

### Injection Order
1. **Formal styles** (if `useDefaultStyles: true`)
2. **Basic page break styles** (if `injectDefaultStyles !== false` and not using formal styles)
3. **Custom fonts** (if provided)
4. **Themes** (if specified)
5. **Watermarks** (if configured)
6. **Debug styles** (if enabled)
7. **User's inline/linked CSS** (overrides everything)

This order ensures that:
- Defaults provide a solid foundation
- User styles can override anything
- No conflicts between different style sources

## Benefits

### For Users
✅ **Zero CSS required** - Just set one option  
✅ **Professional output** - Looks great out of the box  
✅ **Fully customizable** - Override any style you want  
✅ **Consistent** - Same styling across all documents  
✅ **Print-optimized** - Proper page breaks and spacing  

### For Developers
✅ **Faster development** - No need to write boilerplate CSS  
✅ **Maintainable** - Centralized styling  
✅ **Flexible** - Easy to customize when needed  
✅ **Type-safe** - Full TypeScript support  

## Examples

### Simple Report
```typescript
const report = `
  <h1>Monthly Sales Report</h1>
  <h2>Summary</h2>
  <p>Total sales increased by 15% this month...</p>
  <table>
    <thead><tr><th>Product</th><th>Sales</th></tr></thead>
    <tbody>
      <tr><td>Product A</td><td>$12,500</td></tr>
      <tr><td>Product B</td><td>$8,300</td></tr>
    </tbody>
  </table>
`;

await snapToPdf(report, { useDefaultStyles: true, path: 'report.pdf' });
```

### Invoice
```typescript
const invoice = `
  <h1>Invoice #12345</h1>
  <address>
    <strong>Bill To:</strong><br>
    John Doe<br>
    123 Main St<br>
    City, ST 12345
  </address>
  <table>
    <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
    <tbody>
      <tr><td>Service A</td><td>2</td><td>$50</td><td>$100</td></tr>
      <tr><td>Service B</td><td>1</td><td>$75</td><td>$75</td></tr>
    </tbody>
  </table>
  <p class="text-right"><strong>Total: $175.00</strong></p>
`;

await snapToPdf(invoice, { useDefaultStyles: true, path: 'invoice.pdf' });
```

### Technical Documentation
```typescript
const docs = `
  <h1>API Documentation</h1>
  <h2>Authentication</h2>
  <p>All API requests require authentication...</p>
  
  <h3>Example Request</h3>
  <pre><code>curl -H "Authorization: Bearer TOKEN" \\
  https://api.example.com/v1/users</code></pre>
  
  <aside>
    <strong>Note:</strong> Replace TOKEN with your actual API key.
  </aside>
`;

await snapToPdf(docs, { useDefaultStyles: true, path: 'docs.pdf' });
```

## Testing

Run the example to see it in action:

```bash
node examples/use-default-styles.js
```

This generates `default-styles-example.pdf` demonstrating all styling features.

## Future Enhancements

Potential improvements:
- Additional style presets (modern, minimal, academic)
- Configurable color schemes
- Font family options
- Spacing/margin presets
- Dark mode support
- Accessibility enhancements

## Conclusion

The `useDefaultStyles` option makes it trivial to generate professional PDFs without any CSS knowledge, while still allowing full customization for advanced users. It's the perfect balance between ease-of-use and flexibility.
