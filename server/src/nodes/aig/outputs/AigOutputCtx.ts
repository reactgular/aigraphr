import {AigInputBoolean} from '../inputs/AigInputBoolean';
import {AigInputNumber} from '../inputs/AigInputNumber';
import {AigInputString} from '../inputs/AigInputString';
import {AigInputUserType} from '../inputs/AigInputUserType';
import {AigTypeShape} from '../types/AigTypeBase';

export class AigOutputCtx<TInputShape extends AigTypeShape> {
    public constructor(private inputObject: TInputShape) {}

    public boolean() {
        return new AigInputBoolean();
    }

    public inputType(inputKey: keyof TInputShape) {
        return new AigInputUserType();
    }

    public number() {
        return new AigInputNumber();
    }

    public string() {
        return new AigInputString();
    }

    public userType() {
        return new AigInputUserType();
    }
}
