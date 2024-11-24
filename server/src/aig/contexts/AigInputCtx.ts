import { ZodRawShape } from 'zod/lib/types';
import { AigInputBoolean } from '../inputs/AigInputBoolean';
import { AigInputGroup } from '../inputs/AigInputGroup';
import { AigInputInferType } from '../inputs/AigInputInferType';
import { AigInputNumber } from '../inputs/AigInputNumber';
import { AigInputObject } from '../inputs/AigInputObject';
import { AigInputString } from '../inputs/AigInputString';
import { AigParamShape } from '../inputs/AigInputBase';

export class AigInputCtx {
    /**
     * @deprecated not sure I want to do parameter grouping in the inputs definition
     */
    public group<TShape extends AigParamShape>(shape: TShape) {
        return new AigInputGroup(shape);
    }

    public object<TZodShape extends ZodRawShape>(zod: TZodShape) {
        return new AigInputObject<TZodShape>(zod);
    }

    public inferType() {
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
