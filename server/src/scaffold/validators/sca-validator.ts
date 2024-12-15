import {ScaInvalidator} from '@/scaffold/validators/sca-invalidator';

export interface ScaValidator<
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
