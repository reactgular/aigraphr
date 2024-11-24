import { AigInputType } from './AigInputType';
import { AigInputBase, AigInputDef } from './AigInputBase';

export class AigInputInferType extends AigInputBase<string, AigInputDef> {
    public constructor() {
        super({
            type: AigInputType.InferType,
            description: ''
        });
    }
}
