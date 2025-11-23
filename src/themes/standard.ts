/**
 * Standard professional document styling for snap-to-pdf.
 * 
 * This comprehensive CSS provides clean, professional styling for PDF documents.
 * Includes typography, spacing, tables, lists, and print optimizations.
 */

export const standard = `
/* Reset & Base */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* Page Setup - Professional margins */
@page { 
  size: A4; 
  margin: 20mm 15mm;
}

@page :first { 
  margin-top: 25mm; 
}

/* Typography - Clean and spacious */
body {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 11pt;
  line-height: 1.8;
  color: #1a1a1a;
  background: white;
  -webkit-font-smoothing: antialiased;
  padding: 0 15mm;
  max-width: 100%;
}

/* Headings - Clear hierarchy */
h1 { 
  font-size: 28pt; 
  font-weight: 700; 
  line-height: 1.2; 
  margin: 0 0 32pt 0; 
  color: #000; 
  letter-spacing: -0.03em; 
  page-break-after: avoid;
}

h2 { 
  font-size: 20pt; 
  font-weight: 600; 
  margin: 48pt 0 24pt 0; 
  color: #1a1a1a; 
  border-bottom: 2pt solid #e0e0e0; 
  padding-bottom: 12pt; 
  page-break-after: avoid;
}

h3 { 
  font-size: 16pt; 
  font-weight: 600; 
  margin: 32pt 0 16pt 0; 
  color: #2a2a2a; 
  page-break-after: avoid;
}

h4 { 
  font-size: 14pt; 
  font-weight: 600; 
  margin: 24pt 0 14pt 0; 
  color: #333; 
  page-break-after: avoid;
}

h5 { 
  font-size: 12pt; 
  font-weight: 600; 
  margin: 20pt 0 12pt 0; 
  color: #444; 
  page-break-after: avoid;
}

h6 { 
  font-size: 11pt; 
  font-weight: 600; 
  margin: 16pt 0 10pt 0; 
  color: #555; 
  text-transform: uppercase; 
  letter-spacing: 0.08em; 
  page-break-after: avoid;
}

/* Paragraphs - Generous spacing */
p { 
  margin: 0 0 16pt 0; 
  text-align: justify; 
  orphans: 3; 
  widows: 3;
  hyphens: auto;
}

p:last-child { margin-bottom: 0; }

h1 + p, h2 + p, h3 + p, h4 + p, h5 + p, h6 + p { 
  text-indent: 0; 
  margin-top: 0; 
}

/* Lists - Clear and spacious */
ul, ol { 
  margin: 12pt 0 20pt 0; 
  padding-left: 32pt; 
  page-break-inside: avoid;
}

ul { list-style-type: disc; }
ul ul { list-style-type: circle; margin: 10pt 0; }
ul ul ul { list-style-type: square; }

ol { list-style-type: decimal; }
ol ol { list-style-type: lower-alpha; margin: 10pt 0; }
ol ol ol { list-style-type: lower-roman; }

li { 
  margin-bottom: 10pt; 
  line-height: 1.8; 
  page-break-inside: avoid;
  padding-left: 6pt;
}

li:last-child { margin-bottom: 0; }
li > ul, li > ol { margin-top: 10pt; }

/* Tables - Professional and readable */
table { 
  width: 100%; 
  border-collapse: collapse; 
  margin: 28pt 0; 
  font-size: 10.5pt; 
  page-break-inside: avoid;
}

thead { 
  display: table-header-group; 
  page-break-inside: avoid; 
  page-break-after: avoid;
}

tbody { page-break-inside: auto; }

tr { 
  page-break-inside: avoid; 
  page-break-after: auto;
}

th { 
  background-color: #f5f5f5; 
  font-weight: 600; 
  text-align: left; 
  padding: 14pt 16pt; 
  border: 1pt solid #d0d0d0; 
  color: #1a1a1a;
  line-height: 1.4;
}

td { 
  padding: 12pt 16pt; 
  border: 1pt solid #e0e0e0; 
  vertical-align: top;
  line-height: 1.6;
}

tbody tr:nth-child(even) { 
  background-color: #fafafa; 
}

caption { 
  font-size: 10.5pt; 
  font-weight: 600; 
  text-align: left; 
  margin-bottom: 12pt; 
  color: #333; 
  caption-side: top;
  padding: 0 0 8pt 0;
}

/* Code - Clean and distinct */
code { 
  font-family: 'Courier New', 'Consolas', monospace; 
  font-size: 9.5pt; 
  background-color: #f5f5f5; 
  padding: 3pt 6pt; 
  border-radius: 3pt; 
  color: #c7254e;
  border: 1pt solid #e8e8e8;
}

pre { 
  font-family: 'Courier New', 'Consolas', monospace; 
  font-size: 9.5pt; 
  line-height: 1.6; 
  background-color: #f8f8f8; 
  border: 1pt solid #e0e0e0; 
  border-left: 4pt solid #4a90e2; 
  padding: 16pt 18pt; 
  margin: 16pt 0 24pt 0; 
  overflow-x: auto; 
  page-break-inside: avoid;
  border-radius: 3pt;
}

pre code { 
  background: none; 
  padding: 0; 
  color: #1a1a1a;
  border: none;
}

/* Blockquotes - Elegant and distinct */
blockquote { 
  margin: 28pt 0; 
  padding: 18pt 24pt; 
  border-left: 5pt solid #cbd5e0; 
  background-color: #f7fafc; 
  font-style: italic; 
  color: #4a5568; 
  page-break-inside: avoid;
  border-radius: 0 4pt 4pt 0;
  position: relative;
}

blockquote::before {
  content: '"';
  font-size: 48pt;
  color: #cbd5e0;
  position: absolute;
  left: 12pt;
  top: 8pt;
  line-height: 1;
  font-family: Georgia, serif;
}

blockquote p { 
  margin: 0 0 12pt 0;
  padding-left: 24pt;
  text-align: left;
}

blockquote p:last-child { margin-bottom: 0; }

blockquote cite { 
  display: block; 
  margin-top: 12pt; 
  font-size: 10pt; 
  font-style: normal; 
  color: #718096;
  text-align: right;
  padding-right: 8pt;
}

blockquote cite:before { content: "— "; }

/* Links - Subtle and professional */
a { 
  color: #2563eb; 
  text-decoration: none; 
  border-bottom: 1pt solid #93c5fd;
}

a:visited { 
  color: #7c3aed; 
  border-bottom-color: #c4b5fd;
}

a[href]:after { 
  content: " (" attr(href) ")"; 
  font-size: 9pt; 
  color: #718096;
}

a[href^="#"]:after { content: ""; }

/* Emphasis - Clear distinction */
strong, b { font-weight: 700; color: #000; }
em, i { font-style: italic; }

mark { 
  background-color: #fef08a; 
  padding: 2pt 4pt; 
  color: #1a1a1a;
  border-radius: 2pt;
}

del, s { 
  text-decoration: line-through; 
  color: #a0aec0;
}

ins, u { 
  text-decoration: underline; 
  color: #1a1a1a;
}

small { font-size: 9.5pt; }

sub, sup { 
  font-size: 8pt; 
  line-height: 0; 
  position: relative; 
  vertical-align: baseline;
}

sup { top: -0.5em; }
sub { bottom: -0.25em; }

abbr[title] { 
  border-bottom: 1pt dotted #a0aec0; 
  cursor: help;
}

/* Horizontal Rules - Clean separation */
hr { 
  border: none; 
  border-top: 2pt solid #e2e8f0; 
  margin: 32pt 0; 
  page-break-after: avoid;
}

/* Images & Figures - Well-spaced */
img { 
  max-width: 100%; 
  height: auto; 
  display: block; 
  margin: 24pt auto; 
  page-break-inside: avoid;
}

figure { 
  margin: 28pt 0; 
  page-break-inside: avoid;
  text-align: center;
}

figure img { 
  margin-bottom: 12pt;
}

figcaption { 
  font-size: 10pt; 
  font-style: italic; 
  color: #718096; 
  text-align: center; 
  margin-top: 12pt;
  padding: 0 20pt;
}

/* Definition Lists - Clear structure */
dl { 
  margin: 12pt 0 24pt 0;
}

dt { 
  font-weight: 600; 
  margin-top: 16pt; 
  color: #1a1a1a;
  font-size: 11.5pt;
}

dt:first-child { margin-top: 0; }

dd { 
  margin-left: 32pt; 
  margin-bottom: 12pt; 
  color: #4a5568;
  line-height: 1.7;
}

/* Address - Formatted contact info */
address { 
  font-style: normal; 
  line-height: 1.8; 
  margin: 20pt 0; 
  color: #4a5568;
  padding: 16pt 20pt;
  background-color: #f7fafc;
  border-left: 3pt solid #cbd5e0;
  border-radius: 0 3pt 3pt 0;
}

/* Page Breaks */
.page-break { page-break-after: always; }
.page-break-before { page-break-before: always; }
.avoid-break { page-break-inside: avoid; }
.keep-together { page-break-inside: avoid; }

/* Sections - Clear organization */
section { 
  margin-bottom: 40pt;
}

article { 
  margin-bottom: 32pt;
}

aside { 
  padding: 16pt 20pt; 
  background-color: #edf2f7; 
  border-left: 4pt solid #4299e1; 
  margin: 24pt 0; 
  font-size: 10.5pt; 
  page-break-inside: avoid;
  border-radius: 0 4pt 4pt 0;
  line-height: 1.7;
}

aside strong {
  color: #2d3748;
  font-size: 11pt;
}

/* Utility Classes */
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-left { text-align: left; }
.text-justify { text-align: justify; }
.font-small { font-size: 9.5pt; }
.font-large { font-size: 13pt; }
.text-muted { color: #718096; }
.text-bold { font-weight: 700; }
.mt-small { margin-top: 12pt; }
.mt-medium { margin-top: 20pt; }
.mt-large { margin-top: 32pt; }
.mb-small { margin-bottom: 12pt; }
.mb-medium { margin-bottom: 20pt; }
.mb-large { margin-bottom: 32pt; }
.no-margin { margin: 0; }
.no-padding { padding: 0; }

/* Print Optimizations */
h1, h2, h3, h4, h5, h6, img, figure, table, pre, blockquote { 
  page-break-inside: avoid;
}

h1, h2, h3, h4, h5, h6 { 
  page-break-after: avoid;
}

p, li, dd { 
  orphans: 3; 
  widows: 3;
}
`;
