import {ProjectDto} from '@/entities/project.entity';
import {INestApplication} from '@nestjs/common';
import {Express} from 'express';
import request from 'supertest';

declare global {
    // eslint-disable-next-line no-var
    var __app: INestApplication<Express>;
}

describe('ProjectsController (e2e)', () => {
    // let app: INestApplication;
    //
    // beforeEach(async () => {
    //     const moduleFixture: TestingModule = await Test.createTestingModule({
    //         imports: [MainModule]
    //     }).compile();
    //     app = moduleFixture.createNestApplication();
    //     appConfig(app);
    //     await app.init();
    // });

    it('/ (GET)', () => {
        return request(global.__app.getHttpServer())
            .get('/api/projects')
            .expect(200)
            .expect([
                {
                    id: 1,
                    name: 'project',
                    open: false
                } satisfies ProjectDto
            ]);
    });
});
