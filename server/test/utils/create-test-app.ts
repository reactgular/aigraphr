import {AiGraphrApp, appConfig} from '@/app.config';
import {MainModule} from '@/main.module';
import {ConsoleLogger} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config();

export const createTestApp = async (
    mode: 'memory' | 'disk' = 'memory'
): Promise<AiGraphrApp> => {
    const PROJECTS_FOLDER = process.env.PROJECTS_FOLDER;
    if (!PROJECTS_FOLDER || !PROJECTS_FOLDER.includes('e2e')) {
        throw new Error(`Possible wrong projects folder: ${PROJECTS_FOLDER}`);
    }

    // if (mode === 'disk') {
    //     await fs.unlink(PROJECTS_FOLDER);
    // }

    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [MainModule]
    }).compile();

    const app = moduleFixture.createNestApplication<AiGraphrApp>();

    appConfig(app);

    app.useLogger(new ConsoleLogger());

    await app.init();

    return app;
};
