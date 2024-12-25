import {Type, ValidationPipe} from '@nestjs/common';

/**
 * Not a real pipe, but a factory function that returns a new instance of ValidationPipe with the given options.
 */
export function scaValidationPipe(expectedType?: Type) {
    return new ValidationPipe({
        expectedType,
        always: true,
        strictGroups: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {enableImplicitConversion: true}
    });
}
