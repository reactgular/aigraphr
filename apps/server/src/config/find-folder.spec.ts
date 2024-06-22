import { promises as fs } from 'fs';
import path from 'path';
import { findFolder } from './find-folder';

jest.mock('fs', () => ({
  promises: {
    stat: jest.fn()
  }
}));

const mockStat = fs.stat as jest.Mock;

const notFound: NodeJS.ErrnoException = new Error('Not found');
notFound.code = 'ENOENT';

describe('findFolder', () => {
  const find = '.aigraphr';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should find the folder in the current directory', async () => {
    const start = path.resolve(path.join('test', 'dir'));
    const target = path.resolve(path.join(start, find));

    mockStat.mockResolvedValueOnce({ isDirectory: () => true });

    const result = await findFolder(find, start);

    expect(result).toBe(target);
    expect(mockStat).toHaveBeenCalledWith(target);
  });

  it('should find the folder in the parent directory', async () => {
    const start = path.resolve(path.join('test', 'dir', 'subdir'));
    const target = path.resolve(path.join('test', 'dir', find));

    mockStat
      // "/test/dir/subdir/.aigraphr" doesn't exist
      .mockRejectedValueOnce(notFound)
      // "/test/dir/.aigraphr" exists
      .mockResolvedValueOnce({ isDirectory: () => true });

    const result = await findFolder(find, start);

    expect(result).toBe(path.resolve(target));

    expect(mockStat).toHaveBeenCalledWith(path.join(start, find));
    expect(mockStat).toHaveBeenCalledWith(path.resolve(target));
  });

  it('should return undefined if the folder is never found', async () => {
    const start = path.resolve(path.join('test', 'dir'));

    mockStat.mockRejectedValue(notFound);

    const result = await findFolder(find, start);

    expect(result).toBeUndefined();
    expect(mockStat).toHaveBeenCalled();
  });

  it('should return undefined if the root directory is reached', async () => {
    const start =  path.resolve(path.sep);

    mockStat.mockRejectedValue(notFound);

    const result = await findFolder(find, start);

    expect(result).toBeUndefined();
    expect(mockStat).toHaveBeenCalledWith(path.resolve(path.join(start, find)));
  });
});
