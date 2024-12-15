import {
    ScaFieldValidationDto,
    ScaValidationResponseDto
} from '@/scaffold/dtos/sca-validation.dto';

export class ScaInvalidator {
    private readonly invalidations: Array<ScaFieldValidationDto> = [];

    public addError(name: string, message: string): void {
        this.invalidations.push({name, message});
    }

    public response(): ScaValidationResponseDto {
        return {
            valid: this.invalidations.length === 0,
            fields: this.invalidations.map(({name}) => name),
            invalidations: this.invalidations.reduce(
                (acc, {name, message}) => {
                    acc[name] = {name, message};
                    return acc;
                },
                {} as Record<string, ScaFieldValidationDto>
            )
        };
    }
}
