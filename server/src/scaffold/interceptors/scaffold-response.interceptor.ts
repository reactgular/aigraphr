import {InternalServerErrorException} from '@nestjs/common';
import {instanceToPlain, plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';

export abstract class ScaffoldResponseInterceptor<T extends object> {
    protected constructor(protected readonly dto: new () => T) {}

    protected isNotEmpty(data: unknown) {
        if (data === undefined || data === null || typeof data !== 'object') {
            throw new InternalServerErrorException({
                message: 'Response validation failed',
                errors: [
                    {
                        property: 'response',
                        constraints: {
                            isDefined: 'Response is required'
                        }
                    }
                ]
            });
        }
    }

    protected async validate(data: T): Promise<T> {
        const transformedData = plainToInstance(
            this.dto,
            instanceToPlain(data)
        );

        const errors = await validate(transformedData);
        if (errors.length > 0) {
            throw new InternalServerErrorException({
                message: 'Response validation failed',
                errors
            });
        }

        return transformedData;
    }
}
