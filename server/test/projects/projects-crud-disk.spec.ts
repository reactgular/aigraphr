import {ProjectDto, ProjectUpdateDto} from '@/entities/project.entity';
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

    describe('', async () => {
        //
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

        expect(await app.projectExists('test')).toBe(true);
    });

    it('should get the project', async () => {
        await app.request
            .get(`${route}/1`)
            .expect(200)
            .expect({
                id: 1,
                name: 'test',
                open: true
            } satisfies ProjectDto);
    });

    it('cannot delete a project that is open', async () => {
        await app.request
            .delete(`${route}/1`)
            .expect(400)
            .expect(/Cannot delete an open project/);
    });

    it('should close the project', async () => {
        await app.request
            .patch(`${route}/1`)
            .send({
                open: false
            } satisfies ProjectUpdateDto)
            .expect(200)
            .expect({
                id: 1,
                name: 'test',
                open: false
            } satisfies ProjectDto);
    });

    it('should remove the project file', async () => {
        await app.request.delete(`${route}/1`).expect({}).expect(204);

        expect(await app.projectExists('test')).toBe(false);
    });
});
