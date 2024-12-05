import {AigType} from '@/nodes/aig/types/AigType';
import {AigTypeBase, AigTypeDef} from '@/nodes/aig/types/AigTypeBase';
import {AigValueUserType} from '@/nodes/aig/values/AigValueUserType';

export class AigInputUserType extends AigTypeBase<
    AigValueUserType,
    AigTypeDef
> {
    public constructor() {
        super({
            type: AigType.UserType,
            description: ''
        });
    }
}
