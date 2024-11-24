import { AigType } from '../types/AigType';
import { AigTypeBase, AigTypeDef } from '../types/AigTypeBase';

export class AigInputNumber extends AigTypeBase<number, AigTypeDef> {
    public constructor() {
        super({
            type: AigType.Number,
            description: ''
        });
    }
}
