import {AiGraphrApp, appConfig} from '@/app.config';
import {MainModule} from '@/main.module';
import {PROJECTS_STORAGE} from '@/projects/project.symbols';
import {ProjectsStorageMode} from '@/projects/storages/projects-storage';
import {ProjectsStorageDiskService} from '@/projects/storages/projects-storage-disk.service';
import {ProjectsStorageMemoryService} from '@/projects/storages/projects-storage-memory.service';
import {ConsoleLogger} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import {TestingModuleBuilder} from '@nestjs/testing/testing-module.builder';
import {promises as fs} from 'fs';
import {tmpFolder} from './tmp-folder';

export interface CreateTestAppOptions {
    mode?: ProjectsStorageMode;
}

export interface CreateTestAppResult {
    app: AiGraphrApp;

    shutdown: () => Promise<void>;
}

async function compileApp(builder: TestingModuleBuilder): Promise<AiGraphrApp> {
    const module = await builder.compile();
    const app = module.createNestApplication<AiGraphrApp>({
        logger: new ConsoleLogger()
    });
    appConfig(app);
    await app.init();
    return app;
}

export const createTestApp = async ({
    mode = 'memory'
}: CreateTestAppOptions): Promise<CreateTestAppResult> => {
    const builder: TestingModuleBuilder = Test.createTestingModule({
        imports: [MainModule]
    });

    if (mode === 'disk') {
        const projectsFolder = await tmpFolder();
        console.warn(`Using projects folder: ${projectsFolder}`);

        builder
            .overrideProvider(PROJECTS_STORAGE)
            .useValue(new ProjectsStorageDiskService(projectsFolder));

        const app = await compileApp(builder);

        return {
            app,
            shutdown: async () => {
                await app.close();
                await fs.unlink(projectsFolder);
            }
        };
    } else if (mode === 'memory') {
        builder
            .overrideProvider(PROJECTS_STORAGE)
            .useValue(new ProjectsStorageMemoryService());

        const app = await compileApp(builder);

        return {
            app,
            shutdown: async () => {
                await app.close();
            }
        };
    } else {
        throw new Error(`Unknown mode: ${mode}`);
    }
};
