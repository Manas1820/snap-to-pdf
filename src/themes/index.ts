/**
 * Prebuilt themes for snap-to-pdf.
 */
import { standard } from './standard';
import { baseStyles } from './utils';

const clean = `
${baseStyles}

body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; margin: 20mm; }
h1, h2, h3 { color: #111; margin-bottom: 0.5em; page-break-after: avoid; }
table { width: 100%; border-collapse: collapse; margin-bottom: 1em; page-break-inside: avoid; }
th { text-align: left; border-bottom: 2px solid #eee; padding: 0.5em; }
td { border-bottom: 1px solid #eee; padding: 0.5em; }
`;

const corporate = `
${baseStyles}

body { font-family: Georgia, serif; color: #222; line-height: 1.5; margin: 25mm; }
h1, h2, h3 { color: #003366; font-family: 'Arial', sans-serif; page-break-after: avoid; }
table { width: 100%; border-collapse: collapse; page-break-inside: avoid; }
th { background: #003366; color: white; padding: 8px; }
td { border: 1px solid #ddd; padding: 8px; }
`;

const minimal = `
${baseStyles}

body { font-family: monospace; color: #000; margin: 15mm; }
h1, h2, h3 { text-transform: uppercase; border-bottom: 1px solid #000; page-break-after: avoid; }
table { width: 100%; page-break-inside: avoid; }
th, td { border: none; padding: 4px 0; text-align: left; }
`;

export const themes: Record<string, string> = {
  standard,
  clean,
  corporate,
  minimal,
  none: ''
};

export type ThemeName = keyof typeof themes;
