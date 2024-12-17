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

async function makeTmpFolder(): Promise<string> {
    try {
        await fs.access('tmp');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        await fs.mkdir('tmp', {recursive: true});
    }
    return await fs.mkdtemp('tmp/aigraphr-test-');
}

export const createTestApp = async (
    mode: ProjectsStorageMode = 'memory'
): Promise<AiGraphrApp> => {
    const builder: TestingModuleBuilder = Test.createTestingModule({
        imports: [MainModule]
    });

    if (mode === 'disk') {
        const projectsFolder = await makeTmpFolder();
        console.warn(`Using projects folder: ${projectsFolder}`);
        builder
            .overrideProvider(PROJECTS_STORAGE)
            .useValue(new ProjectsStorageDiskService(projectsFolder));
    } else {
        builder
            .overrideProvider(PROJECTS_STORAGE)
            .useValue(new ProjectsStorageMemoryService());
    }

    const module = await builder.compile();

    const app = module.createNestApplication<AiGraphrApp>({
        logger: new ConsoleLogger()
    });

    appConfig(app);

    await app.init();

    return app;
};
