import {ScaInvalidator} from '@/scaffold/dtos/sca-invalidator';

export interface ScaValidatorService<
    TCreateDto extends object,
    TUpdateDto extends object
> {
    onCreateValidate(
        invalidator: ScaInvalidator<TCreateDto>,
        data: TCreateDto
    ): Promise<void>;

    onUpdateValidate(
        invalidator: ScaInvalidator<TUpdateDto>,
        id: number,
        data: TUpdateDto
    ): Promise<void>;
}
