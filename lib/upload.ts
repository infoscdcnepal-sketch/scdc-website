/**
 * Rules for drawings attached to the contact form. Shared by the browser form
 * and the /api/contact route so both enforce the same limits.
 *
 * The 4 MB cap keeps the whole request under the ~4.5 MB body limit of
 * Vercel serverless functions. For larger files visitors are asked to email them.
 */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
export const MAX_UPLOAD_MB = 4;

export const ALLOWED_EXTENSIONS = ['pdf', 'dwg', 'dxf', 'zip', 'png', 'jpg', 'jpeg'] as const;

export const ACCEPT_ATTRIBUTE = ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(',');

export function hasAllowedExtension(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  return (ALLOWED_EXTENSIONS as readonly string[]).includes(ext);
}

/** Strips any path and unsafe characters so the name is safe to use as an attachment name. */
export function sanitizeFilename(filename: string): string {
  const base = filename.split(/[\\/]/).pop() ?? 'attachment';
  const cleaned = base.replace(/[^\w.\- ()　-鿿]/g, '_').slice(0, 120);
  return cleaned || 'attachment';
}
