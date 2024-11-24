import { AigInputType } from './AigInputType';
import { AigInputBase, AigInputDef } from './AigInputBase';

export class AigInputString extends AigInputBase<string, AigInputDef> {
    public constructor() {
        super({
            type: AigInputType.String,
            description: ''
        });
    }
}
