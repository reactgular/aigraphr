import promises from 'fs/promises';
import {Stats} from 'node:fs';
import {getFileType} from './file-type';

jest.mock('fs/promises', () => ({
    stat: jest.fn()
}));

// const mocked = fs as jest.Mocked<typeof fs>;
const mocked = jest.mocked(promises);

describe('getFileType', () => {
    it('returns "file" when the path is a file', async () => {
        // Setup the mock to simulate a file
        mocked.stat.mockResolvedValue({
            isFile: () => true,
            isDirectory: () => false
        } as Stats);

        const result = await getFileType('path/to/file');
        expect(result).toBe('file');
    });

    it('returns "directory" when the path is a directory', async () => {
        // Setup the mock to simulate a directory
        mocked.stat.mockResolvedValue({
            isFile: () => false,
            isDirectory: () => true
        } as Stats);

        const result = await getFileType('path/to/directory');
        expect(result).toBe('directory');
    });

    it('returns false when the path is neither a file nor a directory', async () => {
        // Setup the mock to simulate neither a file nor a directory
        mocked.stat.mockResolvedValue({
            isFile: () => false,
            isDirectory: () => false
        } as Stats);

        const result = await getFileType('path/to/unknown');
        expect(result).toBe(false);
    });

    it('returns undefined when there is an error, such as the path does not exist', async () => {
        // Setup the mock to simulate an error
        mocked.stat.mockRejectedValue(
            new Error('ENOENT: no such file or directory, stat')
        );

        const result = await getFileType('path/to/nonexistent');
        expect(result).toBe(undefined);
    });
});
