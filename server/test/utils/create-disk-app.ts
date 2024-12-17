import {MainModule} from '@/main.module';
import {PROJECTS_STORAGE} from '@/projects/project.symbols';
import {ProjectsStorageDiskService} from '@/projects/storages/projects-storage-disk.service';
import {Test, TestingModuleBuilder} from '@nestjs/testing';
import {promises as fs} from 'fs';
import request from 'supertest';
import {compileApp} from './compile-app';
import {tmpFolder} from './tmp-folder';

export type CreateDisk = Awaited<ReturnType<typeof createDiskApp>>;

export const createDiskApp = async () => {
    const builder: TestingModuleBuilder = Test.createTestingModule({
        imports: [MainModule]
    });

    const folder = await tmpFolder();
    console.warn(`Using projects folder: ${folder}`);

    builder
        .overrideProvider(PROJECTS_STORAGE)
        .useValue(new ProjectsStorageDiskService(folder));

    const app = await compileApp(builder);

    return {
        app,
        request: request(app.getHttpServer()),
        folder,
        shutdown: async () => {
            await app.close();
            await fs.rm(folder, {recursive: true});
        }
    };
};
