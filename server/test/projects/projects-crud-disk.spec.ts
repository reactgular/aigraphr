import {ProjectDto} from '@/entities/project.entity';
import request from 'supertest';
import {createTestApp, CreateTestAppResult} from '../utils/create-test-app';

describe('Projects', () => {
    let testApp: CreateTestAppResult;
    let r: ReturnType<typeof request>;

    beforeAll(async () => {
        testApp = await createTestApp({mode: 'disk'});
        r = request(testApp.app.getHttpServer());
    });

    afterAll(async () => {
        await testApp.shutdown();
    });

    it('should have no projects', () => {
        return r.get('/api/projects').expect(200).expect([]);
    });

    it('should not open a project when creating it', () => {
        return r
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
