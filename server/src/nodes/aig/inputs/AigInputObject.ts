import {AigType} from '@/nodes/aig/types/AigType';
import {AigTypeBase, AigTypeDef} from '@/nodes/aig/types/AigTypeBase';
import {ZodRawShape} from 'zod/lib/types';

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
