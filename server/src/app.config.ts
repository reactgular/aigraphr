import {ScaExceptionFilter} from '@/scaffold/filters/sca-exception.filter';
import {scaValidationPipe} from '@/scaffold/pipes/sca-validation.pipe';
import {INestApplication} from '@nestjs/common';
import {HttpAdapterHost} from '@nestjs/core';
import {Express} from 'express';

export type AiGraphrApp = INestApplication<Express>;

/**
 * Used by main.ts and Jest tests to configure the app.
 */
export function appConfig(app: AiGraphrApp) {
    app.enableCors();
    app.useGlobalPipes(scaValidationPipe());
    app.useGlobalFilters(new ScaExceptionFilter(app.get(HttpAdapterHost)));
    app.enableShutdownHooks();
    app.setGlobalPrefix('api');
}
