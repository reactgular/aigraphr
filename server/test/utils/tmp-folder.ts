import {promises as fs} from 'fs';

export async function tmpFolder(): Promise<string> {
    try {
        await fs.access('tmp');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        await fs.mkdir('tmp', {recursive: true});
    }
    return await fs.mkdtemp('tmp/aigraphr-test-');
}
