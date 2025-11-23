# Action Plan: snap-to-pdf

This document outlines the development roadmap for `snap-to-pdf`, focusing on solving the core challenges of HTML-to-PDF rendering: layout precision, content overflow, and developer experience.

## Phase 1: Core Rendering Engine & Input Handling
**Goal:** Establish a reliable pipeline for converting HTML to PDF.
- [x] **Engine Selection:** Integrate a headless browser engine (e.g., Puppeteer or Playwright) for high-fidelity rendering.
- [x] **Input Normalization:** Implement support for multiple input types:
    - Raw HTML strings
    - Local file paths
    - Remote URLs
    - Template engine integration (e.g., Handlebars, EJS)
- [x] **Basic Output:** Ensure standard PDF output (A4/Letter, Portrait/Landscape).

## Phase 2: Layout Precision & Page Control
**Goal:** Solve the "web-to-print" layout mismatch.
- [x] **Smart Page Breaks:** Implement CSS helpers and logic for `page-break-before`, `page-break-after`, and `page-break-inside: avoid`.
- [x] **Orphan/Widow Control:** Add logic to detect and prevent single lines at the start/end of pages.
- [x] **Block Cohesion:** Ensure related elements (like table headers and rows) stay together.
- [x] **Grid/Flexbox Support:** Verify and fix layout issues specific to CSS Grid and Flexbox across page boundaries.

## Phase 3: Content Injection & Styling
**Goal:** Allow professional customization beyond the HTML body.
- [x] **Headers & Footers:** Implement a system for repeating headers/footers with dynamic variables (Page X of Y).
- [x] **Watermarks:** Add API for text/image watermarks (diagonal, centered).
- [x] **Asset Management:** Ensure local images, fonts, and external CSS (Tailwind/Bootstrap) are loaded correctly during render.
- [x] **Font Embedding:** Support custom font loading to ensure consistent rendering across environments.
- [x] **Theme Packs:** Prebuilt layouts for invoices, reports, and certificates.
- [x] **Style Presets:** Simple APIs like `style: 'clean' | 'corporate' | 'minimal'`.

## Phase 4: Developer Experience (DX) & Tooling
**Goal:** Make the library easy to debug and use.
- [x] **Debug Mode:** Create a visual debug overlay that shows page boundaries and safe areas on the HTML before rendering.
- [x] **Strict Types:** Ensure full TypeScript coverage for all options.
- [ ] **Preview Server:** (Optional) A mini-server to preview the PDF output during development.
- [x] **CLI:** A command-line interface for quick conversions.
- [x] **Error Surfacing:** Clear error logs with hints, not raw browser errors.
- [x] **Config Validation:** Warn if conflicting layout options are passed.
- [x] **"Explain PDF Issues" Mode:** Output reasoning explaining why layout broke and suggestions to fix.

## Phase 5: Enterprise & Advanced Features
**Goal:** Features for high-scale or complex use cases.
- [ ] **Table of Contents:** Auto-generate TOC based on heading tags with clickable links.
- [ ] **Accessibility:** Ensure generated PDFs have proper tags and structure for screen readers.
- [ ] **Encryption/Permissions:** Add support for PDF passwords and print/copy restrictions.
- [ ] **Performance Tuning:** Optimize for large documents and concurrent rendering.
- [ ] **Fragment Rendering Mode:** Render only selected HTML nodes into a bounded PDF area.
- [ ] **Multi-section PDFs:** Render different HTML inputs into different sections (cover → TOC → body → appendix).
- [ ] **Append Page Numbers to Bookmarks:** Enterprise requirement for legal files.

## Phase 6: Testing, Reliability & Regression Safety
**Goal:** Ensure output consistency over time.
- [ ] **Visual Regression Testing:** Compare PDF pages pixel-by-pixel in CI.
- [ ] **Sample Corpus:** A folder of 50+ real PDFs tested on every release.
- [ ] **Rendering Determinism:** Option to freeze fonts/assets engine version to avoid drift.
- [ ] **Snapshot Tests:** `expect(pdf).toMatchSnapshot()` for content blocks.

## Phase 7: Performance, Load & Scaling
**Goal:** Guarantee speed + concurrency for SaaS workflows.
- [ ] **Browser Pooling:** Reuse headless browser instead of launching per job.
- [ ] **Batch Rendering API:** Convert 100 PDFs with shared context.
- [ ] **CPU Budgeting:** Auto-detect heavy layouts and chunk in stages.
- [ ] **Memory Leak Protection:** Auto-restart the browser when a leak threshold is reached.
- [ ] **Benchmarks Dashboard:** Track average render time across versions.

## Phase 8: Packaging, Distribution & SDK Strategy
**Goal:** Make the package robust to adopt in many environments.
- [X] **ESM + CJS dual build:** Ensure compatibility (Already implemented).
- [ ] **Deno / Bun / Cloudflare Workers support:** Expand platform support.
- [ ] **Docker image:** With CLI preinstalled.
- [ ] **Publish SDK wrappers:** (Optional) Node SDK, REST API SDK, (future) Go / Python bindings.

## Phase 9: Documentation & Onboarding
**Goal:** Remove friction for new users.
- [ ] **Official use-case guides:** Invoice, certificate, reports, dashboards.
- [ ] **"PDF Troubleshooting Cookbook":** Common issues and fixes.
- [ ] **Live Code Sandbox:** Playground assets.
- [ ] **Copy-paste templates:** For common outputs.

## Phase 10: Observability & Telemetry (Optional)
**Goal:** Support enterprise monitoring.
- [ ] **Structured Logs:** Export logs as structured JSON (info / warn / debug).
- [ ] **Error Classification:** Layout vs. asset failure vs. template failure.
- [ ] **Tracing Hooks:** Execution time per stage (load → style → layout → pagination → export).
- [ ] **Pluggable Reporters:** Sentry / Datadog / OpenTelemetry.
