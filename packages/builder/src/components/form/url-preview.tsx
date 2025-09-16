import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface UrlMetadata {
  title?: string;
  description?: string;
  favicon?: string;
  url: string;
}

interface UrlPreviewProps {
  url: string;
  className?: string;
}

export default function UrlPreview({ url, className }: UrlPreviewProps) {
  const [metadata, setMetadata] = useState<UrlMetadata | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const fetchMetadata = async (targetUrl: string) => {
    if (!targetUrl || !isValidUrl(targetUrl)) {
      setMetadata(undefined);
      setError(undefined);
      return;
    }

    setLoading(true);
    setError(undefined);

    try {
      // Create a CORS proxy URL or use a service like allorigins.win
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch URL metadata');
      }

      const data = await response.json();
      const html = data.contents;

      // Parse HTML to extract metadata
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const title =
        doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
        doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ||
        doc.querySelector('title')?.textContent ||
        'Untitled';

      const description =
        doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
        doc.querySelector('meta[name="twitter:description"]')?.getAttribute('content') ||
        doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
        '';

      let favicon =
        doc.querySelector('link[rel="icon"]')?.getAttribute('href') ||
        doc.querySelector('link[rel="shortcut icon"]')?.getAttribute('href') ||
        doc.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href') ||
        '/favicon.ico';

      // Handle relative favicon URLs
      if (favicon && !favicon.startsWith('http')) {
        const urlObj = new URL(targetUrl);
        favicon = favicon.startsWith('/')
          ? `${urlObj.origin}${favicon}`
          : `${urlObj.origin}/${favicon}`;
      }

      setMetadata({
        title: title.trim(),
        description: description.trim(),
        favicon,
        url: targetUrl,
      });
    } catch {
      setError('Failed to load preview');
      setMetadata(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchMetadata(url);
    }, 500); // Debounce requests

    return () => clearTimeout(timeoutId);
  }, [url, fetchMetadata]);

  if (!url || !isValidUrl(url)) {
    return;
  }

  if (loading) {
    return (
      <div className={cn('rounded-lg border border-neutral-300 bg-neutral-50 p-3', className)}>
        <div className="flex items-center space-x-3">
          <div className="h-4 w-4 animate-pulse rounded-sm bg-neutral-300" />
          <div className="flex-1 space-y-2">
            <div className="h-4 animate-pulse rounded-sm bg-neutral-300" />
            <div className="h-3 w-3/4 animate-pulse rounded-sm bg-neutral-300" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('rounded-lg border border-neutral-300 bg-neutral-50 p-3', className)}>
        <div className="flex items-center space-x-3">
          <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-neutral-400">
            <span className="text-neutral-600 text-xs">!</span>
          </div>
          <div className="flex-1">
            <p className="typography-body4 text-neutral-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!metadata) {
    return;
  }

  return (
    <div
      className={cn(
        'rounded-lg border border-neutral-300 bg-white p-3 transition-colors hover:bg-neutral-50',
        className,
      )}
    >
      <div className="flex items-start space-x-3">
        <div className="shrink-0">
          {metadata.favicon ? (
            <img
              src={metadata.favicon}
              alt="Favicon"
              className="h-4 w-4 rounded-sm"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-neutral-400">
              <span className="text-white text-xs">🌐</span>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="typography-body3 truncate font-medium text-neutral-800">
            {metadata.title}
          </h4>
          {metadata.description && (
            <p
              className="typography-body4 mt-1 overflow-hidden text-ellipsis text-neutral-600"
              style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
            >
              {metadata.description}
            </p>
          )}
          <p className="typography-body4 mt-1 truncate text-neutral-500">
            {formatUrl(metadata.url)}
          </p>
        </div>
        <div className="shrink-0">
          <a
            type="button"
            href={metadata.url}
            target="_blank"
            className="group flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100 transition-colors hover:bg-neutral-200"
            aria-label="Open in new tab"
          >
            <svg
              className="h-3 w-3 text-neutral-600 group-hover:text-neutral-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="External link icon"
            >
              <title>External link icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

function formatUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return url;
  }
}
