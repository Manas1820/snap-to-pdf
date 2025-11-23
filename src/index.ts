/**
 * Main entry point for snap-to-pdf.
 * 
 * By default, this exports the Node.js version for backward compatibility.
 * In browser/edge environments, the package.json "exports" field will
 * automatically redirect to the browser stub.
 * 
 * For explicit imports:
 * - Use 'snap-to-pdf/node' for server-side (Next.js API routes, server actions)
 * - Use 'snap-to-pdf/browser' for client-side (will throw helpful errors)
 */
export * from './node';
export { default } from './node';
