import {
    ScaFieldValidationCode,
    ScaFieldValidationDto,
    ScaValidationResponseDto
} from '@/scaffold/dtos/sca-validation.dto';

export class ScaInvalidator {
    private readonly invalidations: Array<ScaFieldValidationDto> = [];

    public notFound(name: string, message?: string): void {
        this.add(
            name,
            ScaFieldValidationCode.NOT_FOUND,
            message ?? 'Resource not found'
        );
    }

    public notUnique(name: string, message?: string): void {
        this.add(
            name,
            ScaFieldValidationCode.NOT_UNIQUE,
            message ?? 'Resource already exists'
        );
    }

    public format(name: string, message?: string): void {
        this.add(
            name,
            ScaFieldValidationCode.FORMAT,
            message ?? 'Invalid format'
        );
    }

    public value(name: string, message?: string): void {
        this.add(
            name,
            ScaFieldValidationCode.VALUE,
            message ?? 'Invalid value'
        );
    }

    public invalid(name: string, message?: string): void {
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

    private add(
        name: string,
        code: ScaFieldValidationCode,
        message: string
    ): void {
        this.invalidations.push({name, code, message});
    }
}
