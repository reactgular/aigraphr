import { AigInputKind } from './AigInputKind';
import { AigInputType, AigParamDef } from './AigInputType';

export class AigInputNumber extends AigInputType<number, AigParamDef> {
    public constructor() {
        super({
            kind: AigInputKind.Number,
            description: ''
        });
    }
}
