import { AigInputKind } from './AigInputKind';
import { AigInputType, AigParamDef } from './AigInputType';

export class AigInputString extends AigInputType<string, AigParamDef> {
    public constructor() {
        super({
            kind: AigInputKind.String,
            description: ''
        });
    }
}
