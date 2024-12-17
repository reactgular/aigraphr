import {MainModule} from '@/main.module';
import {PROJECTS_STORAGE} from '@/projects/project.symbols';
import {ProjectsStorageMemoryService} from '@/projects/storages/projects-storage-memory.service';
import {Test} from '@nestjs/testing';
import {TestingModuleBuilder} from '@nestjs/testing/testing-module.builder';
import request from 'supertest';
import {compileApp} from './compile-app';

export type CreateMemory = Awaited<ReturnType<typeof createMemoryApp>>;

export const createMemoryApp = async (logger: boolean = false) => {
    const builder: TestingModuleBuilder = Test.createTestingModule({
        imports: [MainModule]
    });

    builder
        .overrideProvider(PROJECTS_STORAGE)
        .useValue(new ProjectsStorageMemoryService());

    const app = await compileApp(builder, logger);

    return {
        app,
        request: request(app.getHttpServer()),
        shutdown: async () => {
            await app.close();
        }
    };
};
