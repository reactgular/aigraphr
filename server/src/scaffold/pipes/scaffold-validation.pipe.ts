import {Type, ValidationPipe} from '@nestjs/common';

/**
 * Not a real pipe, but a factory function that returns a new instance of ValidationPipe with the given options.
 */
export function scaffoldValidationPipe(expectedType?: Type) {
    return new ValidationPipe({
        expectedType,
        // Allow only parameters specified in the endpoint
        whitelist: true,
        // Throws error if unknown parameter is provided
        forbidNonWhitelisted: true,
        // implicit type conversion of request params in the DTO
        transform: true,
        transformOptions: {enableImplicitConversion: true}
    });
}
