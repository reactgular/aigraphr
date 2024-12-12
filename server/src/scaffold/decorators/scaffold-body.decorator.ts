import {ScaffoldDto} from '@/scaffold/services/scaffold-crud.service';
import {Body, Type, ValidationPipe} from '@nestjs/common';

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
