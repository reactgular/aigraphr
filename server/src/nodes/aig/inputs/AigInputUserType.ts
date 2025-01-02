import {GrParamType} from '@/graph/dtos/gr-param.dto';
import {AigTypeBase, AigTypeDef} from '../types/AigTypeBase';
import {AigValueUserType} from '../values/AigValueUserType';

export class AigInputUserType extends AigTypeBase<
    AigValueUserType,
    AigTypeDef
> {
    public constructor() {
        super({
            type: GrParamType.UserType,
            description: ''
        });
    }
}
