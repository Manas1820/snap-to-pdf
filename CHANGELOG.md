## [1.0.1](https://github.com/Manas1820/snap-to-pdf/compare/v1.0.0...v1.0.1) (2025-11-23)


### Bug Fixes

* add build step to release workflow ([db42171](https://github.com/Manas1820/snap-to-pdf/commit/db42171b9323f608ae95c8894ac4f9837867d19e))

# 1.0.0 (2025-11-23)


### Bug Fixes

* Correct GitHub token secret name to GH_TOKEN in npm publish workflow. ([d216dd9](https://github.com/Manas1820/snap-to-pdf/commit/d216dd904bf6cb18bed7f0ed716507f71f90357f))
* update repository URL and workflow secrets ([aca22e8](https://github.com/Manas1820/snap-to-pdf/commit/aca22e8929057a3a158e37cedf7caff8a3dc9950))


### Features

* Consolidate CI, release, and npm publish workflows into a single semantic release workflow. ([91e72b4](https://github.com/Manas1820/snap-to-pdf/commit/91e72b4ec24b646d1793b6a919a16be2ad57d1ea))
* Initialize snap-to-pdf library with core logic, build system, testing, linting, documentation, and CI/CD workflows. ([72b732e](https://github.com/Manas1820/snap-to-pdf/commit/72b732eb9676d13ae71048ef39222355c6a9016b))
* Introduce CLI, font management, validation utilities, and theming with environment-specific builds, updating core logic and documentation. ([d086cb4](https://github.com/Manas1820/snap-to-pdf/commit/d086cb43e60a1c9c443dbb197bdf9397bcd5fb61))

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
