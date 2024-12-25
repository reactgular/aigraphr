import {ScaEntity} from '@/scaffold/crud/sca-entity';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {ScaInvalidator} from '@/scaffold/validators/sca-invalidator';
import {ScaInvalidatorBuilder} from '@/scaffold/validators/sca-invalidator-builder';
import {ScaInvalidatorResult} from '@/scaffold/validators/sca-invalidator-result';
import {ScaValidatorHandler} from '@/scaffold/validators/sca-validator-handler';
import {Logger, Type} from '@nestjs/common';

export abstract class ScaValidatorService<
    TEntity extends ScaEntity,
    TCreateDto extends object = never,
    TUpdateDto extends object = never
> implements ScaValidatorHandler<TCreateDto, TUpdateDto>
{
    private readonly name: string;

    private readonly scaLog: Logger;

    protected constructor(protected readonly type: Type<TEntity>) {
        this.name = toHumanUtils(type.name);
        this.scaLog = new Logger(`ScaValidator::${this.name}`);
    }

    public abstract onCreateValidate(
        invalidator: ScaInvalidator<TCreateDto>,
        data: TCreateDto
    ): Promise<void>;

    public abstract onUpdateValidate(
        invalidator: ScaInvalidator<TUpdateDto>,
        id: number,
        data: TUpdateDto
    ): Promise<void>;

    public async scaCreateValidate(
        data: TCreateDto
    ): Promise<ScaInvalidatorResult> {
        const invalidator = new ScaInvalidatorBuilder<TCreateDto>();

        this.scaLog.debug(`CreateValidate:${JSON.stringify(data)}`);
        await this.onCreateValidate(invalidator, data);

        return invalidator.result();
    }

    public async scaUpdateValidate(
        id: number,
        data: TUpdateDto
    ): Promise<ScaInvalidatorResult> {
        const invalidator = new ScaInvalidatorBuilder<TUpdateDto>();

        this.scaLog.debug(`UpdateValidate:${JSON.stringify(data)}`);
        await this.onUpdateValidate(invalidator, id, data);

        return invalidator.result();
    }
}
