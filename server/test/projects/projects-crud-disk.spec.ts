import {ProjectDto} from '@/entities/project.entity';
import {CreateDisk, createDiskApp} from '../utils/create-disk-app';

describe('Projects', () => {
    let app: CreateDisk;
    const route = '/api/projects';

    beforeAll(async () => {
        app = await createDiskApp();
    });

    afterAll(async () => {
        await app.shutdown();
    });

    it('should have no projects', async () => {
        await app.request.get(route).expect(200).expect([]);
    });

    it('should create a new project file', async () => {
        await app.request
            .post(route)
            .send({name: 'test'})
            .expect(201)
            .expect({
                id: 1,
                name: 'test',
                open: true
            } satisfies ProjectDto);

        await app.projectExists('test');
    });
});
