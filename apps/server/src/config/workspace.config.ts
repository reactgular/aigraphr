import { promises as fs } from 'fs';

export enum FileType {
  DIRECTORY = 'directory',
  FILE = 'file',
  NOT_FOUND = 'not_found'
}

export const getFileType = async (path: string): Promise<FileType> => {
  try {
    const stat = await fs.stat(path);
    return stat.isDirectory() ? FileType.DIRECTORY : FileType.FILE;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return FileType.NOT_FOUND;
    }
    throw err;
  }
};
