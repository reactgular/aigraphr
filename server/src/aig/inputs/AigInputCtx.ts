import { ZodRawShape } from 'zod/lib/types';
import { AigTypeShape } from '../types/AigTypeBase';
import { AigInputBoolean } from './AigInputBoolean';
import { AigInputGroup } from './AigInputGroup';
import { AigInputNumber } from './AigInputNumber';
import { AigInputObject } from './AigInputObject';
import { AigInputString } from './AigInputString';
import { AigInputUserType } from './AigInputUserType';

export class AigInputCtx {
    /**
   * @deprecated not sure I want to do parameter grouping in the inputs definition
   */
    public group<TShape extends AigTypeShape>(shape: TShape) {
        return new AigInputGroup(shape);
    }

    public object<TZodShape extends ZodRawShape>(zod: TZodShape) {
        return new AigInputObject<TZodShape>(zod);
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
