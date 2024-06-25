import { promises as fs } from 'fs';
import { FileType, getFileType } from './file-type';

// Mocking fs.stat
jest.mock('fs', () => {
  return {
    promises: {
      stat: jest.fn()
    }
  };
});

describe('getFileType', () => {
  it('returns FileType.DIRECTORY when the path is a directory', async () => {
    // Mock fs.stat to simulate a directory
    (fs.stat as jest.Mock).mockResolvedValue({
      isDirectory: () => true,
      isFile: () => false
    });

    const type = await getFileType('path/to/directory');
    expect(type).toBe(FileType.DIRECTORY);
  });

  it('returns FileType.FILE when the path is a file', async () => {
    // Mock fs.stat to simulate a file
    (fs.stat as jest.Mock).mockResolvedValue({
      isDirectory: () => false,
      isFile: () => true
    });

    const type = await getFileType('path/to/file.txt');
    expect(type).toBe(FileType.FILE);
  });

  it('returns FileType.NOT_FOUND when the path does not exist', async () => {
    // Mock fs.stat to simulate a non-existing path
    (fs.stat as jest.Mock).mockRejectedValue({
      code: 'ENOENT'
    });

    const type = await getFileType('path/to/nonexistent');
    expect(type).toBe(FileType.NOT_FOUND);
  });

  it('throws an error when fs.stat fails with an unexpected error', async () => {
    // Mock fs.stat to simulate an unexpected error
    const error = new Error('Unexpected error');
    (fs.stat as jest.Mock).mockRejectedValue(error);

    await expect(getFileType('path/to/error'))
      .rejects
      .toThrow(error);
  });
});
