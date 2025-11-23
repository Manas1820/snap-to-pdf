#!/usr/bin/env node
import { Command } from 'commander';
import { snapToPdf } from './index';
import fs from 'fs/promises';
import path from 'path';

const program = new Command();

program
  .name('snap-to-pdf')
  .description('Convert HTML to PDF via CLI')
  .version('0.0.0-development')
  .argument('[input]', 'Input HTML file, URL, or string')
  .option('-o, --output <path>', 'Output PDF file path', 'output.pdf')
  .option('--url <url>', 'URL to render')
  .option('--html <html>', 'HTML content to render')
  .option('--format <format>', 'PDF Format (A4, Letter, etc.)', 'A4')
  .option('--landscape', 'Landscape orientation', false)
  .option('--debug', 'Enable debug mode', false)
  .option('--theme <theme>', 'Apply a theme (clean, corporate, minimal)')
  .option('--inject-default-styles', 'Inject default styles for the theme', true)
  .option('--no-inject-default-styles', 'Do not inject default styles')
  .option('--header-template <template>', 'HTML template for the print header')
  .option('--footer-template <template>', 'HTML template for the print footer')
  .option('--margins <margins>', 'Margins (e.g. "10mm" or JSON string)')
  .action(async (input, options) => {
    try {
      if (input && (options.url || options.html)) {
        console.error('Error: Cannot provide both input argument and --url/--html flags.');
        process.exit(1);
      }

      if (options.url && options.html) {
        console.error('Error: Cannot provide both --url and --html flags.');
        process.exit(1);
      }

      const source = input || (options.url ? 'URL' : (options.html ? 'HTML' : 'unknown'));
      console.log(`Rendering PDF from ${source}...`);
      
      let margins = undefined;
      if (options.margins) {
        try {
          margins = JSON.parse(options.margins);
        } catch {
          // Assume it's a string like "10mm" applied to all sides?
          // Puppeteer margin expects { top, right, bottom, left }.
          // Or we can pass it if the user provides a valid object.
          // If it's a simple string, maybe we assume it's for all?
          // But Puppeteer options.margin is PDFMargin which has top, right, bottom, left.
          // Let's assume the user passes a JSON string if they want specific margins,
          // or we can parse "10mm" -> { top: "10mm", ... }?
          // For simplicity, let's try to parse as JSON, if fails, assume it's a value for all sides.
          const val = options.margins;
          margins = { top: val, right: val, bottom: val, left: val };
        }
      }

      const snapOptions = {
        format: options.format,
        landscape: options.landscape,
        debug: options.debug,
        theme: options.theme,
        injectDefaultStyles: options.injectDefaultStyles,
        headerTemplate: options.headerTemplate,
        footerTemplate: options.footerTemplate,
        margin: margins,
        printBackground: true,
        url: options.url,
        html: options.html,
      };

      // If input is provided, pass it as the first argument.
      // If not, pass options as the first argument (or pass undefined as first arg).
      // snapToPdf signature: (inputOrOptions, options?)
      
      let pdfBuffer: Buffer;
      if (input) {
        pdfBuffer = await snapToPdf(input, snapOptions);
      } else {
        pdfBuffer = await snapToPdf(snapOptions);
      }

      const outputPath = path.resolve(options.output);
      await fs.writeFile(outputPath, pdfBuffer);
      
      console.log(`PDF saved to ${outputPath}`);
    } catch (error: any) {
      console.error('Error generating PDF:', error.message || error);
      process.exit(1);
    }
  });

program.parse();
