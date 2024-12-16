import {AiGraphrApp} from '@/app.config';
import {ProjectDto} from '@/entities/project.entity';
import {ProjectsController} from '@/projects/controllers/projects.controller';
import request from 'supertest';
import {createTestApp} from '../../../test/utils/create-test-app';

describe(ProjectsController.name, () => {
    let app: AiGraphrApp;
    let r: ReturnType<typeof request>;

    beforeAll(async () => {
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
