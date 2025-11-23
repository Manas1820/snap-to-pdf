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
  .argument('<input>', 'Input HTML file, URL, or string')
  .option('-o, --output <path>', 'Output PDF file path', 'output.pdf')
  .option('--format <format>', 'PDF Format (A4, Letter, etc.)', 'A4')
  .option('--landscape', 'Landscape orientation', false)
  .option('--debug', 'Enable debug mode', false)
  .option('--theme <theme>', 'Apply a theme (clean, corporate, minimal)')
  .action(async (input, options) => {
    try {
      console.log(`Rendering PDF from ${input}...`);
      
      const pdfBuffer = await snapToPdf(input, {
        format: options.format,
        landscape: options.landscape,
        debug: options.debug,
        theme: options.theme,
        printBackground: true,
      });

      const outputPath = path.resolve(options.output);
      await fs.writeFile(outputPath, pdfBuffer);
      
      console.log(`PDF saved to ${outputPath}`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      process.exit(1);
    }
  });

program.parse();
