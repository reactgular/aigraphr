import { ZodRawShape } from 'zod/lib/types';
import { AigInputType } from './AigInputType';
import { AigInputBase, AigInputDef } from './AigInputBase';

export class AigInputObject<TZodShape extends ZodRawShape> extends AigInputBase<
    TZodShape,
    AigInputDef
> {
    public constructor(zod: TZodShape) {
        super({
            type: AigInputType.Object,
            description: ''
        });
    }
}
