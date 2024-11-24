import { AigInputKind } from './AigInputKind';
import { AigInputType, AigParamDef } from './AigInputType';

export class AigInputInferType extends AigInputType<string, AigParamDef> {
    public constructor() {
        super({
            kind: AigInputKind.InferType,
            description: ''
        });
    }
}
