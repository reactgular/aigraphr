import { ZodRawShape } from 'zod/lib/types';
import { AigType } from '../types/AigType';
import { AigTypeBase, AigTypeDef } from '../types/AigTypeBase';

export class AigInputObject<TZodShape extends ZodRawShape> extends AigTypeBase<
    TZodShape,
    AigTypeDef
> {
    public constructor(zod: TZodShape) {
        super({
            type: AigType.Object,
            description: ''
        });
    }
}
