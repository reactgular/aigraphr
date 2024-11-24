import { AigInputKind } from './AigInputKind';
import { AigInputType, AigParamDef } from './AigInputType';

export class AigInputBoolean extends AigInputType<boolean, AigParamDef> {
    public constructor() {
        super({
            kind: AigInputKind.Boolean,
            description: ''
        });
    }
}
