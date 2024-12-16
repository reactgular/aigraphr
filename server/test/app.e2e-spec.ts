import {ProjectDto} from '@/entities/project.entity';
import {MainModule} from '@/main.module';
import {ScaExceptionFilter} from '@/scaffold/filters/sca-exception.filter';
import {scaValidationPipe} from '@/scaffold/pipes/sca-validation.pipe';
import {INestApplication} from '@nestjs/common';
import {HttpAdapterHost} from '@nestjs/core';
import {Test, TestingModule} from '@nestjs/testing';
import request from 'supertest';

describe('ProjectsController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [MainModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        app.enableCors();
        app.useGlobalPipes(scaValidationPipe());
        app.useGlobalFilters(new ScaExceptionFilter(app.get(HttpAdapterHost)));
        app.enableShutdownHooks();
        app.setGlobalPrefix('api');

        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
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
