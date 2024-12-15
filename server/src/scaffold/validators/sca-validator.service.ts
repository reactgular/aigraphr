import {ScaffoldEntity} from '@/scaffold/crud/sca-crud.service';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {ScaInvalidator} from '@/scaffold/validators/sca-invalidator';
import {ScaInvalidatorBuilder} from '@/scaffold/validators/sca-invalidator-builder';
import {ScaInvalidatorResult} from '@/scaffold/validators/sca-invalidator-result';
import {ScaValidatorHandler} from '@/scaffold/validators/sca-validator-handler';
import {Logger, Type} from '@nestjs/common';

export abstract class ScaValidatorService<
    Entity extends ScaffoldEntity,
    TCreateDto extends object = never,
    TUpdateDto extends object = never
> implements ScaValidatorHandler<TCreateDto, TUpdateDto>
{
    private readonly name: string;

    private readonly scaLog: Logger;

    protected constructor(protected readonly type: Type<Entity>) {
        this.name = toHumanUtils(type.name);
        this.scaLog = new Logger(`ScaValidator::${this.name}`);
    }

    public async onCreateValidate(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        invalidator: ScaInvalidator<TCreateDto>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data: TCreateDto
    ): Promise<void> {
        // do nothing
    }

    public async onUpdateValidate(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        invalidator: ScaInvalidator<TUpdateDto>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        id: number,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data: TUpdateDto
    ): Promise<void> {
        // do nothing
    }

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
