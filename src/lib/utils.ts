import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Ensures Google Drive image URLs (and other thumbnail links) use high resolution
 * to prevent blurry image rendering in Next.js <Image /> components.
 */
export function optimizeImageUrl(url: string | undefined | null): string {
  if (!url) return '';

  // Fix Google Drive thumbnail URLs missing size parameter or having low resolution size
  if (url.includes('drive.google.com/thumbnail')) {
    try {
      const parsedUrl = new URL(url);
      const sz = parsedUrl.searchParams.get('sz');
      if (!sz || parseInt(sz.replace(/[^0-9]/g, ''), 10) < 1200) {
        parsedUrl.searchParams.set('sz', 'w1600');
        return parsedUrl.toString();
      }
    } catch {
      if (!url.includes('sz=')) {
        return `${url}&sz=w1600`;
      }
    }
  }

  // Convert Google Drive view links (drive.google.com/file/d/ID/view) to high-res image thumbnails
  const driveFileMatch = url.match(/drive\.google\.com\/file\/d\/([^\/]+)/);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${driveFileMatch[1]}&sz=w1600`;
  }

  return url;
}

