import { ZodRawShape } from 'zod/lib/types';
import { AigParamBoolean } from '../params/AigParamBoolean';
import { AigParamGroup } from '../params/AigParamGroup';
import { AigParamNumber } from '../params/AigParamNumber';
import { AigParamObject } from '../params/AigParamObject';
import { AigParamString } from '../params/AigParamString';
import { AigParamShape } from '../params/AigParamType';
import { AigParamUnknown } from '../params/AigParamUnknown';

export class AigInputCtx {
    public unknown() {
        return new AigParamUnknown();
    }

    public group<TShape extends AigParamShape>(shape: TShape) {
        return new AigParamGroup(shape);
    }

    public object<TZodShape extends ZodRawShape>(zod: TZodShape) {
        return new AigParamObject<TZodShape>(zod);
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
