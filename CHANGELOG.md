# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-23

### Added
- **Core API**: `snapToPdf(html, options)` function that returns a PDF Buffer directly.
- **Theme System**: Introduced a robust theme system for instant professional styling.
  - `standard`: Formal document styling (default).
  - `corporate`: Business-oriented style with blue accents.
  - `clean`: Modern, minimalist look with sans-serif fonts.
  - `minimal`: Bare-bones styling for data-heavy reports.
  - `none`: Raw HTML rendering without injected styles.
- **CLI**: `snap-to-pdf` command line tool for quick file conversions.
- **Browser/Next.js Compatibility**: Added automatic environment detection with conditional exports.
  - New `snap-to-pdf/node` entry point for explicit server-side usage.
  - New `snap-to-pdf/browser` entry point that provides helpful error messages in client-side environments.
- **Configuration**: Comprehensive options for PDF generation.
  - `format`, `landscape`, `scale`, `margin`, `printBackground`.
  - `headerTemplate` and `footerTemplate` support.
- **Developer Experience**:
  - `debug` mode to visualize layout boundaries.
  - `explain` mode to analyze layout issues (experimental).

### Changed
- **Breaking**: Removed `useDefaultStyles` and `injectDefaultStyles` in favor of the `theme` option.
- **Breaking**: `snapToPdf` is now the single entry point for all PDF generation.
- **Refactor**: Migrated internal styling logic to the new theme engine.
- **Documentation**: Complete rewrite of README with new examples and API reference.

### Removed
- Removed legacy `puppeteer-html-pdf` class-based API in favor of the functional `snapToPdf` API.
- Removed `advanced-usage.ts` and other redundant examples.

