import promises from 'fs/promises';

export const getFileType = async (path: string): Promise<'file' | 'directory' | false | undefined> => {
  try {
    const stat = await promises.stat(path);
    return stat.isDirectory() ? 'directory' : stat.isFile() ? 'file' : false;
  } catch (err) {
    return undefined;
  }
};
