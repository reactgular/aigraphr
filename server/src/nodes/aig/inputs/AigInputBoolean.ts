import {GrParamType} from '@/graph/dtos/gr-node-def-param.dto';
import {AigTypeBase, AigTypeDef} from '../types/AigTypeBase';

export class AigInputBoolean extends AigTypeBase<boolean, AigTypeDef> {
    public constructor() {
        super({
            type: GrParamType.Boolean,
            description: ''
        });
    }
}
