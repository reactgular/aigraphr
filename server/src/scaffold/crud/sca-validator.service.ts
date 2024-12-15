import {ScaffoldEntity} from '@/scaffold/crud/sca-crud.service';
import {ScaValidator} from '@/scaffold/crud/sca-validator';
import {ScaInvalidator} from '@/scaffold/dtos/sca-invalidator';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {Logger, Type} from '@nestjs/common';

export abstract class ScaValidatorService<
    Entity extends ScaffoldEntity,
    TCreateDto extends object = never,
    TUpdateDto extends object = never
> implements ScaValidator<TCreateDto, TUpdateDto>
{
    private readonly name: string;

    private readonly scaLog: Logger;

    protected constructor(protected readonly type: Type<Entity>) {
        this.name = toHumanUtils(type.name);
        this.scaLog = new Logger(`ScaValidator::${this.name}`);
    }

    public async onCreateValidate(
        invalidator: ScaInvalidator<TCreateDto>,
        data: TCreateDto
    ): Promise<void> {
        // do nothing
    }

    public async onUpdateValidate(
        invalidator: ScaInvalidator<TUpdateDto>,
        id: number,
        data: TUpdateDto
    ): Promise<void> {
        // TODO: make sure the record exists
        // do nothing
    }

    public async scaCreateValidate(
        data: TCreateDto
    ): Promise<ScaInvalidator<TCreateDto>> {
        const invalidator = new ScaInvalidator<TCreateDto>();

        this.scaLog.debug(`CreateValidate:${JSON.stringify(data)}`);
        await this.onCreateValidate(invalidator, data);

        return invalidator;
    }

    public async scaUpdateValidate(
        id: number,
        data: TUpdateDto
    ): Promise<ScaInvalidator<TUpdateDto>> {
        const invalidator = new ScaInvalidator<TUpdateDto>();

        this.scaLog.debug(`UpdateValidate:${JSON.stringify(data)}`);
        await this.onUpdateValidate(invalidator, id, data);

        return invalidator;
    }
}
