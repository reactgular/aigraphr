import { promises as fs } from 'fs';
import path from 'path';

/**
 * A recursive function to find a folder with the given name in the given directory.
 */
export async function findFolder(name: string, dir: string): Promise<string | undefined> {
  const fullPath = path.resolve(path.join(dir, name));

  try {
    const stats = await fs.stat(fullPath);
    if (stats.isDirectory()) {
      return fullPath;
    }
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error(`Error checking folder "${fullPath}":`, err);
    }
  }

  const parentDir = path.resolve(dir, '..');
  if (parentDir === dir) {
    // We've reached the root directory
    return undefined;
  }

  return findFolder(name, parentDir);
}
