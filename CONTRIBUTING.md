# Contributing to snap-to-pdf

Thank you for your interest in contributing to `snap-to-pdf`! This guide will help you set up your development environment and test your changes locally.

## Development Setup

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

1. Clone the repository:
```bash
git clone https://github.com/coolstorm/snap-to-pdf.git
cd snap-to-pdf
```

2. Install dependencies:
```bash
npm install
```

## Development Workflow

### Building the Project

The project uses `tsup` to build both ESM and CommonJS outputs.

```bash
# Build once
npm run build

# Build and watch for changes
npm run dev
```

This will generate files in the `dist/` directory:
- `dist/index.js` (ESM)
- `dist/index.cjs` (CommonJS)
- `dist/index.d.ts` (TypeScript definitions)
- `dist/cli.js` (CLI entry point)

### Testing Your Changes

#### 1. Unit Tests

Run the test suite using Vitest:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

#### 2. Local Testing with Examples

After building, you can test your changes using the example files:

```bash
# Build first
npm run build

# Run TypeScript example (uses source directly)
npx tsx examples/usage.ts

# Run advanced example
npx tsx examples/advanced-usage.ts

# Run CommonJS example
node examples/usage.cjs

# Run ESM example
node examples/usage.mjs
```

#### 3. Testing the CLI Locally

To test the CLI without publishing:

```bash
# Build the project
npm run build

# Link the package globally
npm link

# Now you can use the CLI
snap-to-pdf examples/sample.html -o test-output.pdf

# When done testing, unlink
npm unlink -g snap-to-pdf
```

#### 4. Testing in Another Project

To test the library as if it were installed from npm:

```bash
# In the snap-to-pdf directory
npm run build
npm pack

# This creates a .tgz file like: snap-to-pdf-0.0.0-development.tgz
# In your test project
npm install /path/to/snap-to-pdf/snap-to-pdf-0.0.0-development.tgz

# Now you can import and use it
```

### Creating Test HTML Files

Create test HTML files in the `examples/` directory:

```bash
# Create a test file
cat > examples/test-report.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .page-break-before { page-break-before: always; }
  </style>
</head>
<body>
  <h1>Test Report</h1>
  <p>This is page 1</p>
  <div class="page-break-before">
    <h2>Page 2</h2>
    <p>This is page 2</p>
  </div>
</body>
</html>
EOF

# Test it
snap-to-pdf examples/test-report.html -o output.pdf
```

## Code Quality

### Linting

```bash
# Run ESLint
npm run lint

# Auto-fix linting issues
npm run lint -- --fix
```

### Formatting

```bash
# Format all files
npm run format
```

## Project Structure

```
snap-to-pdf/
├── src/
│   ├── index.ts              # Main entry point
│   ├── cli.ts                # CLI implementation
│   ├── types.ts              # TypeScript type definitions
│   ├── internal/             # Internal modules
│   │   ├── pdf-engine.ts     # Core PDF rendering logic
│   │   ├── input-normalizer.ts
│   │   └── font-manager.ts
│   ├── themes/               # Prebuilt themes
│   │   ├── index.ts
│   │   ├── standard.ts
│   │   └── utils.ts
│   └── utils/                # Utility functions
│       └── validation.ts
├── tests/                    # Test files
├── examples/                 # Usage examples
└── dist/                     # Build output (gitignored)
```

## Adding New Features

1. **Write Tests First**: Add tests in `tests/` directory
2. **Implement Feature**: Add code in `src/`
3. **Update Types**: Add TypeScript types in `src/types.ts`
4. **Document**: Update README.md and add examples
5. **Test Locally**: Use the methods above to verify
6. **Submit PR**: Create a pull request with your changes

## Common Development Tasks

### Adding a New Theme

1. Edit `src/themes/index.ts`
2. Add your theme CSS
3. Update the type in `src/types.ts` to include the new theme name
4. Add tests in `tests/themes.spec.ts`
5. Document in README.md

### Adding a New CLI Option

1. Edit `src/cli.ts` to add the option
2. Update `src/types.ts` if needed
3. Update the CLI usage in README.md
4. Test with `npm link`

### Debugging Tips

**Enable verbose logging:**
```typescript
// In your test file
const pdf = await snapToPdf(html, { 
  debug: true,    // Visual debug overlay
  explain: true   // Log layout issues
});
```

**Test with Puppeteer directly:**
```typescript
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: false }); // See the browser
const page = await browser.newPage();
await page.setContent(yourHtml);
// Inspect the page before generating PDF
await page.screenshot({ path: 'debug.png' });
```

## Questions?

If you have questions or need help, please open an issue on GitHub.
