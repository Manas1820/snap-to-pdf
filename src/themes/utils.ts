export const baseStyles = `
/* Smart Page Breaks */
.page-break-before { page-break-before: always; break-before: page; }
.page-break-after { page-break-after: always; break-after: page; }
.avoid-break { page-break-inside: avoid; break-inside: avoid; }

/* Orphan/Widow Control */
body {
  orphans: 3;
  widows: 3;
}

/* Block Cohesion */
table, figure {
  page-break-inside: avoid;
  break-inside: avoid;
}

h1, h2, h3, h4, h5, h6 {
  page-break-after: avoid;
  break-after: avoid;
}

/* Grid/Flexbox Support Fixes */
.grid-container, .flex-container {
  break-inside: auto;
}
`;
