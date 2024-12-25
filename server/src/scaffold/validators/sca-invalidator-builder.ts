import {
    ScaFieldValidationCode,
    ScaFieldValidationDto,
    ScaValidationResponseDto
} from '@/scaffold/dtos/sca-validation.dto';
import {ScaInvalidator} from '@/scaffold/validators/sca-invalidator';
import {ScaInvalidatorResult} from '@/scaffold/validators/sca-invalidator-result';

export class ScaInvalidatorBuilder<TDto extends object>
    implements ScaInvalidator<TDto>
{
    private readonly invalidations: Array<ScaFieldValidationDto> = [];

    public badValue(name: keyof TDto, message?: string): void {
        this.add(
            name,
            ScaFieldValidationCode.BAD_VALUE,
            message ?? 'Invalid value'
        );
    }

    public format(name: keyof TDto, message?: string): void {
        this.add(
            name,
            ScaFieldValidationCode.FORMAT,
            message ?? 'Invalid format'
        );
    }

    public invalid(name: keyof TDto, message?: string): void {
        this.add(name, ScaFieldValidationCode.INVALID, message ?? 'Invalid');
    }

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

    public required(name: keyof TDto, message?: string): void {
        this.add(name, ScaFieldValidationCode.REQUIRED, message ?? 'Required');
    }

    public result(): ScaInvalidatorResult {
        return new ScaInvalidatorResult(this.response());
    }

    private add(
        name: keyof TDto,
        code: ScaFieldValidationCode,
        message: string
    ): void {
        this.invalidations.push({name: name as string, code, message});
    }

    /**
     * Only the first invalidation for each field is kept.
     */
    private response(): ScaValidationResponseDto {
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
}
