import { AigInputBoolean } from '../inputs/AigInputBoolean';
import { AigInputInferType } from '../inputs/AigInputInferType';
import { AigInputNumber } from '../inputs/AigInputNumber';
import { AigInputString } from '../inputs/AigInputString';
import { AigParamShape } from '../inputs/AigInputBase';

export class AigOutputCtx<TInputShape extends AigParamShape> {
    public constructor(private inputObject: TInputShape) {
    }

    public refer(inputKey: keyof TInputShape) {
        return new AigInputInferType();
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
