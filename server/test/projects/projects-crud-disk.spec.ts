import {ProjectDto} from '@/entities/project.entity';
import {CreateDisk, createDiskApp} from '../utils/create-disk-app';

describe('Projects', () => {
    let app: CreateDisk;

    beforeAll(async () => {
        app = await createDiskApp();
    });

    afterAll(async () => {
        await app.shutdown();
    });

    it('should have no projects', () => {
        return app.request.get('/api/projects').expect(200).expect([]);
    });

    it('should not open a project when creating it', () => {
        return app.request
            .post('/api/projects')
            .send({name: 'test'})
            .expect(201)
            .expect({
                id: 1,
                name: 'test',
                open: true
            } satisfies ProjectDto);
    });
});
