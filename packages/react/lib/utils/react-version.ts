import { version } from 'react';

/**
 * Checks if the current React version is 19 or higher
 * @returns true if React version is 19+, false otherwise
 */
export function isReact19OrHigher(): boolean {
  const majorVersion = Number.parseInt(version.split('.')[0], 10);
  return majorVersion >= 19;
}
