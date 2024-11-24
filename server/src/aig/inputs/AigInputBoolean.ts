import { AigInputType } from './AigInputType';
import { AigInputBase, AigInputDef } from './AigInputBase';

export class AigInputBoolean extends AigInputBase<boolean, AigInputDef> {
    public constructor() {
        super({
            type: AigInputType.Boolean,
            description: ''
        });
    }
}
