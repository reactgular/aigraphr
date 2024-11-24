import { ZodRawShape } from 'zod/lib/types';
import { AigInputKind } from './AigInputKind';
import { AigInputType, AigParamDef } from './AigInputType';

export class AigInputObject<TZodShape extends ZodRawShape> extends AigInputType<
    TZodShape,
    AigParamDef
> {
    public constructor(zod: TZodShape) {
        super({
            kind: AigInputKind.Object,
            description: ''
        });
    }
}
