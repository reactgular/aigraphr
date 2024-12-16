import {appConfig} from '@/app.config';
import {MainModule} from '@/main.module';
import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {Express} from 'express';

declare global {
    // eslint-disable-next-line no-var
    var __app: INestApplication<Express>;
}

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [MainModule]
    }).compile();
    global.__app = moduleFixture.createNestApplication();
    appConfig(global.__app);
    await global.__app.init();
});
