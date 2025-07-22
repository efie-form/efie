// Utility to get image file info (name, size, dimensions) from a URL or blob URL
export interface ImageFileInfo {
  name: string;
  size: number;
  dimensions?: { width: number; height: number };
}

async function getImageFileInfoFromBlobUrl(url: string, fileInfoHint?: { name: string }): Promise<ImageFileInfo | undefined> {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const name = fileInfoHint?.name || 'image';
    const size = blob.size;
    // Get dimensions
    const dimensions = await new Promise<{ width: number; height: number } | undefined>((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        const img = new globalThis.Image();
        img.addEventListener('load', () => {
          resolve({ width: img.width, height: img.height });
        });
        img.addEventListener('error', () => {
          resolve(void 0);
        });
        img.src = e.target?.result as string;
      });
      reader.readAsDataURL(blob);
    });
    return { name, size, dimensions };
  }
  catch {
    return undefined;
  }
}

async function getImageFileInfoFromUrl(url: string): Promise<ImageFileInfo | undefined> {
  try {
    const urlObj = new URL(url);
    const name = urlObj.pathname.split('/').pop() || 'image';
    // Get size
    let size = 0;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log('HEAD response:', res.headers);
      size = Number(res.headers.get('content-length')) || 0;
    }
    catch {
      size = 0; // If we can't fetch size, default to 0
    }
    // Get dimensions
    const dimensions = await new Promise<{ width: number; height: number } | undefined>((resolve) => {
      const img = new globalThis.Image();
      img.addEventListener('load', () => {
        resolve({ width: img.width, height: img.height });
      });
      img.addEventListener('error', () => {
        resolve(void 0);
      });
      img.src = url;
    });
    return { name, size, dimensions };
  }
  catch {
    return undefined;
  }
}

export async function getImageFileInfo(url: string, fileInfoHint?: { name: string }): Promise<ImageFileInfo | undefined> {
  if (!url) return undefined;
  if (url.startsWith('blob:')) {
    return getImageFileInfoFromBlobUrl(url, fileInfoHint);
  }
  return getImageFileInfoFromUrl(url);
}
