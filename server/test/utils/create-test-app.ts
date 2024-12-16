import {AiGraphrApp, appConfig} from '@/app.config';
import {MainModule} from '@/main.module';
import {Test, TestingModule} from '@nestjs/testing';

export const createTestApp = async (): Promise<AiGraphrApp> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [MainModule]
    }).compile();

    const app = moduleFixture.createNestApplication<AiGraphrApp>();

    appConfig(app);

    await app.init();

    return app;
};
