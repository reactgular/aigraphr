import {GrParamType} from '@/graph/dtos/gr-node-def-param.dto';
import {ZodRawShape} from 'zod/lib/types';
import {AigTypeBase, AigTypeDef} from '../types/AigTypeBase';

export class AigInputObject<TZodShape extends ZodRawShape> extends AigTypeBase<
    TZodShape,
    AigTypeDef
> {
    public constructor(zod: TZodShape) {
        super({
            type: GrParamType.Object,
            description: ''
        });
    }
}
