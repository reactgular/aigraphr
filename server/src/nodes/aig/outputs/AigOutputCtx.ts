import {AigInputBoolean} from '@/nodes/aig/inputs/AigInputBoolean';
import {AigInputNumber} from '@/nodes/aig/inputs/AigInputNumber';
import {AigInputString} from '@/nodes/aig/inputs/AigInputString';
import {AigInputUserType} from '@/nodes/aig/inputs/AigInputUserType';
import {AigTypeShape} from '@/nodes/aig/types/AigTypeBase';

export class AigOutputCtx<TInputShape extends AigTypeShape> {
    public constructor(private inputObject: TInputShape) {}

    public inputType(inputKey: keyof TInputShape) {
        return new AigInputUserType();
    }

    public userType() {
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
