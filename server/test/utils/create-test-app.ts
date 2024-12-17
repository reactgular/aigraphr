import {AiGraphrApp, appConfig} from '@/app.config';
import {MainModule} from '@/main.module';
import {PROJECT_STORAGE_MODE} from '@/projects/project.symbols';
import {ProjectsStorageMode} from '@/projects/storages/projects-storage';
import {ConsoleLogger} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';

export const createTestApp = async (
    mode: ProjectsStorageMode = 'memory'
): Promise<AiGraphrApp> => {
    // const PROJECTS_FOLDER = process.env.PROJECTS_FOLDER;
    // if (!PROJECTS_FOLDER || !PROJECTS_FOLDER.includes('e2e')) {
    //     throw new Error(`Possible wrong projects folder: ${PROJECTS_FOLDER}`);
    // }

    // if (mode === 'disk') {
    //     await fs.unlink(PROJECTS_FOLDER);
    // }

    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [MainModule],
        providers: [
            {
                provide: PROJECT_STORAGE_MODE,
                useValue: mode
            }
        ]
    }).compile();

    const app = moduleFixture.createNestApplication<AiGraphrApp>({
        logger: new ConsoleLogger()
    });

    appConfig(app);

    await app.init();

    return app;
};
