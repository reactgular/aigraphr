import { AigInputType } from './AigInputType';
import { AigInputBase, AigInputDef } from './AigInputBase';

export class AigInputNumber extends AigInputBase<number, AigInputDef> {
    public constructor() {
        super({
            type: AigInputType.Number,
            description: ''
        });
    }
}
