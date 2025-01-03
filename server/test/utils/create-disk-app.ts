import {MainModule} from '@/main.module';
import {PROJECTS_STORAGE} from '@/projects/project.symbols';
import {ProjectsStorageDiskService} from '@/projects/storages/projects-storage-disk.service';
import {Test, TestingModuleBuilder} from '@nestjs/testing';
import {promises as fs} from 'fs';
import path from 'path';
import request from 'supertest';
import {compileApp} from './compile-app';
import {tmpFolder} from './tmp-folder';

export type CreateDisk = Awaited<ReturnType<typeof createDiskApp>>;

export const createDiskApp = async (logger: boolean = false) => {
    const builder: TestingModuleBuilder = Test.createTestingModule({
        imports: [MainModule]
    });

    const folder = await tmpFolder();

    builder
        .overrideProvider(PROJECTS_STORAGE)
        .useValue(new ProjectsStorageDiskService(folder));

    const app = await compileApp(builder, logger);

    return {
        app,
        request: request(app.getHttpServer()),
        folder,
        projectExists: async (name: string) => {
            try {
                await fs.access(path.join(folder, `${name}.aigraphr`));
                return true;
            } catch (err) {
                return false;
            }
        },
        projectDelete: async (name: string) => {
            await fs.rm(path.join(folder, `${name}.aigraphr`));
        },
        shutdown: async () => {
            await app.close();
            await fs.rm(folder, {recursive: true});
        }
    };
};
