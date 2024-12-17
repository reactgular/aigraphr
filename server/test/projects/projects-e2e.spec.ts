import {
    ProjectCreateDto,
    ProjectDto,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {CreateDisk, createDiskApp} from '../utils/create-disk-app';
import {CreateMemory, createMemoryApp} from '../utils/create-memory-app';

describe('Projects API (e2e) Tests', () => {
    const route = '/api/projects';

    describe('Projects CRUD (memory)', () => {
        let app: CreateMemory;

        beforeAll(async () => {
            app = await createMemoryApp();
        });

        afterAll(async () => {
            await app.shutdown();
        });

        it('should have no projects', async () => {
            await app.request.get(route).expect(200).expect([]);
        });

        it('should create 3 projects', async () => {
            await app.request.post(route).send({name: 'one'}).expect(201);
            await app.request.post(route).send({name: 'two'}).expect(201);
            await app.request.post(route).send({name: 'three'}).expect(201);

            await app.request
                .get(route)
                .expect(200)
                .expect([
                    {
                        id: 1,
                        name: 'one',
                        open: true
                    } satisfies ProjectDto,
                    {
                        id: 2,
                        name: 'two',
                        open: true
                    } satisfies ProjectDto,
                    {
                        id: 3,
                        name: 'three',
                        open: true
                    } satisfies ProjectDto
                ]);
        });

        it('should get each project', async () => {
            await app.request
                .get(`${route}/1`)
                .expect(200)
                .expect({
                    id: 1,
                    name: 'one',
                    open: true
                } satisfies ProjectDto);

            await app.request
                .get(`${route}/2`)
                .expect(200)
                .expect({
                    id: 2,
                    name: 'two',
                    open: true
                } satisfies ProjectDto);

            await app.request
                .get(`${route}/3`)
                .expect(200)
                .expect({
                    id: 3,
                    name: 'three',
                    open: true
                } satisfies ProjectDto);
        });

        it('should fail name validation rules', async () => {
            await app.request.post(route).send({name: ''}).expect(400);
            await app.request.post(route).send({name: '1'}).expect(400);
            await app.request.post(route).send({name: 'ab'}).expect(400);
            await app.request
                .post(route)
                .send({name: '.[]{};:"\'#!@?<><//\\'})
                .expect(400);

            await app.request.patch(`${route}/1`).send({name: ''}).expect(400);
            await app.request.patch(`${route}/1`).send({name: '1'}).expect(400);
            await app.request
                .patch(`${route}/1`)
                .send({name: 'ab'})
                .expect(400);
            await app.request
                .patch(`${route}/1`)
                .send({name: '.[]{};:"\'#!@?<><//\\'})
                .expect(400);
        });

        it('should fail changing name and open status together', async () => {
            await app.request
                .patch(`${route}/1`)
                .send({name: 'one', open: false})
                .expect(400);
        });

        it('should not delete a project that is open', async () => {
            await app.request.delete(`${route}/1`).expect(400);
        });

        it('should close all 3 projects', async () => {
            await app.request
                .patch(`${route}/1`)
                .send({open: false})
                .expect(200);
            await app.request
                .patch(`${route}/2`)
                .send({open: false})
                .expect(200);
            await app.request
                .patch(`${route}/3`)
                .send({open: false})
                .expect(200);

            await app.request
                .get(route)
                .expect(200)
                .expect([
                    {
                        id: 1,
                        name: 'one',
                        open: false
                    } satisfies ProjectDto,
                    {
                        id: 2,
                        name: 'two',
                        open: false
                    } satisfies ProjectDto,
                    {
                        id: 3,
                        name: 'three',
                        open: false
                    } satisfies ProjectDto
                ]);
        });

        it('should rename all 3 projects', async () => {
            await app.request
                .patch(`${route}/1`)
                .send({name: 'one-renamed'})
                .expect(200);
            await app.request
                .patch(`${route}/2`)
                .send({name: 'two-renamed'})
                .expect(200);
            await app.request
                .patch(`${route}/3`)
                .send({name: 'three-renamed'})
                .expect(200);

            await app.request
                .get(route)
                .expect(200)
                .expect([
                    {
                        id: 1,
                        name: 'one-renamed',
                        open: false
                    } satisfies ProjectDto,
                    {
                        id: 2,
                        name: 'two-renamed',
                        open: false
                    } satisfies ProjectDto,
                    {
                        id: 3,
                        name: 'three-renamed',
                        open: false
                    } satisfies ProjectDto
                ]);
        });

        it('should delete each project', async () => {
            await app.request.get(`${route}/1`).expect(200);
            await app.request.delete(`${route}/1`).expect(204);
            await app.request.get(`${route}/1`).expect(404);

            await app.request.get(`${route}/2`).expect(200);
            await app.request.delete(`${route}/2`).expect(204);
            await app.request.get(`${route}/2`).expect(404);

            await app.request.get(`${route}/3`).expect(200);
            await app.request.delete(`${route}/3`).expect(204);
            await app.request.get(`${route}/3`).expect(404);

            await app.request.get(route).expect(200).expect([]);
        });
    });

    describe('Projects CRUD (disk)', () => {
        let app: CreateDisk;

        beforeAll(async () => {
            app = await createDiskApp();
        });

        afterAll(async () => {
            await app.shutdown();
        });

        it('should have no projects', async () => {
            await app.request.get(route).expect(200).expect([]);
        });

        describe('Project Create and Delete', () => {
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

                await app.request
                    .get(`${route}/1`)
                    .expect(200)
                    .expect({
                        id: 1,
                        name: 'test',
                        open: true
                    } satisfies ProjectDto);
            });

            it('should remove the project file', async () => {
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

                await app.request.delete(`${route}/1`).expect({}).expect(204);

                expect(await app.projectExists('test')).toBe(false);

                await app.request.get(`${route}/1`).expect(404);
            });
        });

        it('should rename the project file', async () => {
            const resp = await app.request
                .post(route)
                .send({name: 'before-test'})
                .expect(201)
                .expect(/before-test/);

            await app.request
                .patch(`${route}/${resp.body.id}`)
                .send({open: false} satisfies ProjectUpdateDto)
                .expect(200);

            expect(await app.projectExists('before-test')).toBe(true);
            expect(await app.projectExists('after-test')).toBe(false);

            await app.request
                .patch(`${route}/${resp.body.id}`)
                .send({name: 'after-test'} satisfies ProjectUpdateDto)
                .expect(200);

            expect(await app.projectExists('before-test')).toBe(false);
            expect(await app.projectExists('after-test')).toBe(true);

            await app.request
                .delete(`${route}/${resp.body.id}`)
                .expect({})
                .expect(204);

            expect(await app.projectExists('before-test')).toBe(false);
            expect(await app.projectExists('after-test')).toBe(false);
        });

        it('should copy a project file', async () => {
            const resp1 = await app.request
                .post(route)
                .send({name: 'original'} satisfies ProjectCreateDto)
                .expect(201)
                .expect(/original/);

            await app.request
                .patch(`${route}/${resp1.body.id}`)
                .send({open: false} satisfies ProjectUpdateDto)
                .expect(200);

            await app.request
                .post(route)
                .send({
                    name: 'copy',
                    cloneId: resp1.body.id
                } satisfies ProjectCreateDto)
                .expect(201)
                .expect(/copy/);

            expect(await app.projectExists('original')).toBe(true);
            expect(await app.projectExists('copy')).toBe(true);
        });

        it('should report user deleted files as GONE', async () => {
            const resp = await app.request
                .post(route)
                .send({name: 'is-gone'} satisfies ProjectCreateDto)
                .expect(201)
                .expect(/is-gone/);

            await app.request
                .patch(`${route}/${resp.body.id}`)
                .send({open: false} satisfies ProjectUpdateDto)
                .expect(200);

            expect(await app.projectExists('is-gone')).toBe(true);
            await app.projectDelete('is-gone');
            expect(await app.projectExists('is-gone')).toBe(false);

            await app.request
                .patch(`${route}/${resp.body.id}`)
                .send({open: true} satisfies ProjectUpdateDto)
                .expect(410);
        });
    });
});
