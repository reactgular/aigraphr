import {scaffoldValidationPipe} from '@/scaffold/pipes/scaffold-validation.pipe';
import {Body, Type} from '@nestjs/common';

export function ScaBody<T extends object>(dto: Type<T>) {
    return Body(scaffoldValidationPipe(dto));
}
