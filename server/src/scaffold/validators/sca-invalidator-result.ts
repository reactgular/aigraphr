import {ScaValidationResponseDto} from '@/scaffold/dtos/sca-validation.dto';
import {BadRequestException} from '@nestjs/common';

export class ScaInvalidatorResult {
    public constructor(private readonly dto: ScaValidationResponseDto) {}

    public exception(): BadRequestException {
        return new BadRequestException('Invalidator failed', {
            cause: this.dto,
            description: 'Invalidator failed'
        });
    }

    public isValid(): boolean {
        return this.dto.valid;
    }

    public response(): ScaValidationResponseDto {
        return this.dto;
    }
}
