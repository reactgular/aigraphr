import {scaValidationPipe} from '@/scaffold/pipes/sca-validation.pipe';
import {Body, Type} from '@nestjs/common';

export function ScaBody<T extends object>(dto: Type<T>) {
    return Body(scaValidationPipe(dto));
}
