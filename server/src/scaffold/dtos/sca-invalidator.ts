import {
    ScaFieldValidationCode,
    ScaFieldValidationDto,
    ScaValidationResponseDto
} from '@/scaffold/dtos/sca-validation.dto';
import {BadRequestException} from '@nestjs/common';

export class ScaInvalidator<TDto extends object> {
    private readonly invalidations: Array<ScaFieldValidationDto> = [];

    public notFound(name: keyof TDto, message?: string): void {
        this.add(
            name,
            ScaFieldValidationCode.NOT_FOUND,
            message ?? 'Resource not found'
        );
    }

    public notUnique(name: keyof TDto, message?: string): void {
        this.add(
            name,
            ScaFieldValidationCode.NOT_UNIQUE,
            message ?? 'Resource already exists'
        );
    }

    public format(name: keyof TDto, message?: string): void {
        this.add(
            name,
            ScaFieldValidationCode.FORMAT,
            message ?? 'Invalid format'
        );
    }

    public badValue(name: keyof TDto, message?: string): void {
        this.add(
            name,
            ScaFieldValidationCode.BAD_VALUE,
            message ?? 'Invalid value'
        );
    }

    public invalid(name: keyof TDto, message?: string): void {
        this.add(name, ScaFieldValidationCode.INVALID, message ?? 'Invalid');
    }

    /**
     * Only the first invalidation for each field is kept.
     */
    public response(): ScaValidationResponseDto {
        return {
            valid: this.invalidations.length === 0,
            fields: [...new Set(this.invalidations.map(({name}) => name))],
            invalidations: this.invalidations.reduce(
                (acc, {name, code, message}) => {
                    // will overwrite the previous invalidation for the same field
                    acc[name] = {name, code, message};
                    return acc;
                },
                {} as Record<string, ScaFieldValidationDto>
            )
        };
    }

    public badRequest(): BadRequestException {
        return new BadRequestException('Invalidator failed', {
            cause: this.response(),
            description: 'Invalidator failed'
        });
    }

    public isValid(): boolean {
        return this.invalidations.length === 0;
    }

    private add(
        name: keyof TDto,
        code: ScaFieldValidationCode,
        message: string
    ): void {
        this.invalidations.push({name: name as string, code, message});
    }
}
