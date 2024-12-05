import {ZodRawShape} from 'zod/lib/types';
import {AigInputBoolean} from './AigInputBoolean';
import {AigInputNumber} from './AigInputNumber';
import {AigInputObject} from './AigInputObject';
import {AigInputString} from './AigInputString';
import {AigInputUserType} from './AigInputUserType';

export class AigInputCtx {
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
        return new AigInputNumber().notNaN().notInfinity();
    }

    public boolean() {
        return new AigInputBoolean();
    }
}
