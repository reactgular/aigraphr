import {AiGraphrApp, appConfig} from '@/app.config';
import {ConsoleLogger} from '@nestjs/common';
import {TestingModuleBuilder} from '@nestjs/testing/testing-module.builder';

export async function compileApp(
    builder: TestingModuleBuilder
): Promise<AiGraphrApp> {
    const module = await builder.compile();
    const app = module.createNestApplication<AiGraphrApp>({
        logger: new ConsoleLogger()
    });
    appConfig(app);
    await app.init();
    return app;
}
