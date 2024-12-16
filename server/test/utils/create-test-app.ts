import {AiGraphrApp, appConfig} from '@/app.config';
import {MainModule} from '@/main.module';
import {ProjectsStorageService} from '@/projects/services/projects-storage.service';
import {Test, TestingModule} from '@nestjs/testing';

export const createTestApp = async (): Promise<AiGraphrApp> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [MainModule]
    }).compile();

    const app = moduleFixture.createNestApplication<AiGraphrApp>();

    appConfig(app);

    await app.init();

    const projectsStorage = app.get(ProjectsStorageService);
    const rootFolder = await projectsStorage.rootFolder();

    if (!rootFolder.includes('e2e')) {
        throw new Error(`Possible wrong root folder: ${rootFolder}`);
    }

    // TODO: folder is locked
    // await fs.unlink(rootFolder);

    return app;
};
