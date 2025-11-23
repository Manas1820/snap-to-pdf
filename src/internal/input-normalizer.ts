import fs from 'fs/promises';
import path from 'path';

/**
 * Represents the type of input provided to the renderer.
 */
export type InputType = 'html' | 'file' | 'url';

/**
 * The result of normalizing the input.
 * Contains the content (HTML string) or URL, and metadata about the input type.
 */
export interface NormalizedInput {
  /**
   * The HTML content string. Empty if the input is a remote URL.
   */
  content: string;

  /**
   * The detected type of the input.
   */
  type: InputType;

  /**
   * The URL of the resource.
   * For 'url' type, this is the remote URL.
   * For 'file' type, this is the file:// URL to the local file.
   */
  url?: string;
}

/**
 * Normalizes the input into a standard format that the PDF engine can consume.
 * 
 * Detects whether the input is a raw HTML string, a local file path, or a remote URL.
 * If it's a file path, it reads the file content.
 * 
 * @param input - The input string (HTML, file path, or URL).
 * @returns A promise that resolves to the normalized input object.
 * @throws Error if the input looks like a file path but the file does not exist.
 */
export const normalizeInput = async (input: string): Promise<NormalizedInput> => {
  if (/^https?:\/\//i.test(input)) {
    return { content: '', type: 'url', url: input };
  }

  if (/\.html?$/i.test(input) && !/<[a-z][\s\S]*>/i.test(input)) {
    try {
      const filePath = path.resolve(input);
      await fs.access(filePath);
      const content = await fs.readFile(filePath, 'utf-8');
      return { content, type: 'file', url: `file://${filePath}` };
    } catch {
      throw new Error(`File not found: ${input}`);
    }
  }

  return { content: input, type: 'html' };
};
