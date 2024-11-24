import { AigParamKind } from './AigParamKind';
import { AigParamDef, AigParamType } from './AigParamType';

export class AigParamInferType extends AigParamType<string, AigParamDef> {
    public constructor() {
        super({
            kind: AigParamKind.InferType,
            description: ''
        });
    }
}
