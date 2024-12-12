import {ScaffoldDto} from '@/scaffold/services/scaffold-entity.service';
import {Body, Type, ValidationPipe} from '@nestjs/common';

/**
 * @deprecated use scaffoldDecoratorPipe() instead
 */
export function ScaffoldBody<TDto extends ScaffoldDto>(
    PostDto: Type<Partial<TDto>>
): ParameterDecorator {
    return Body(
        new ValidationPipe({
            expectedType: PostDto,
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {enableImplicitConversion: true}
        })
    );
}
