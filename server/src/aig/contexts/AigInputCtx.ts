import { ZodRawShape } from 'zod/lib/types';
import { AigParamBoolean } from '../params/AigParamBoolean';
import { AigParamGroup } from '../params/AigParamGroup';
import { AigParamInferType } from '../params/AigParamInferType';
import { AigParamNumber } from '../params/AigParamNumber';
import { AigParamObject } from '../params/AigParamObject';
import { AigParamString } from '../params/AigParamString';
import { AigParamShape } from '../params/AigParamType';
import { AigParamUnknown } from '../params/AigParamUnknown';

export class AigInputCtx {
    /**
     * @deprecated lets not have ambiguous types
     */
    public unknown() {
        return new AigParamUnknown();
    }

    /**
     * @deprecated not sure I want to do parameter grouping in the inputs definition
     */
    public group<TShape extends AigParamShape>(shape: TShape) {
        return new AigParamGroup(shape);
    }

    public object<TZodShape extends ZodRawShape>(zod: TZodShape) {
        return new AigParamObject<TZodShape>(zod);
    }

    public inferType() {
        return new AigParamInferType();
    }

    public string() {
        return new AigParamString();
    }

    public number() {
        return new AigParamNumber();
    }

    public boolean() {
        return new AigParamBoolean();
    }
}
