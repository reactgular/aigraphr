import {AiGraphrApp} from '@/app.config';
import {ProjectDto} from '@/entities/project.entity';
import request from 'supertest';
import {createTestApp} from '../utils/create-test-app';

describe('Projects', () => {
    let app: AiGraphrApp;
    let r: ReturnType<typeof request>;

    beforeAll(async () => {
        // TODO: createTestApp should start with a clean database
        app = await createTestApp();
        r = request(app.getHttpServer());
    });

    afterAll(async () => {
        await app.close();
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
                open: false
            } satisfies ProjectDto);
    });
});
