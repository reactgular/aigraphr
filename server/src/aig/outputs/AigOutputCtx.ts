import { AigInputBoolean } from '../inputs/AigInputBoolean';
import { AigInputUserType } from '../inputs/AigInputUserType';
import { AigInputNumber } from '../inputs/AigInputNumber';
import { AigInputString } from '../inputs/AigInputString';
import { AigTypeShape } from '../types/AigTypeBase';

export class AigOutputCtx<TInputShape extends AigTypeShape> {
    public constructor(private inputObject: TInputShape) {
    }

    public refer(inputKey: keyof TInputShape) {
        return new AigInputUserType();
    }

    public string() {
        return new AigInputString();
    }

    public number() {
        return new AigInputNumber();
    }

    public boolean() {
        return new AigInputBoolean();
    }
}
