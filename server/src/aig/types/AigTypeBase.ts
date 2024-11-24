import { ZodTypeAny } from 'zod/lib/types';
import { AigType } from './AigType';

// export type AigTypeShape = { [k: string]: AigTypeAny };
export type AigTypeShape = Record<string, AigTypeAny>;
export type AigTypeAny = AigTypeBase<any, any>;
export type infer<T extends AigTypeBase<any, any>> = T['_type'];

export type AigTypeSchema<Shape extends AigTypeShape> = {
    [k in keyof Shape]: Shape[k]['_type'];
};

export interface AigTypeDef {
    type: AigType;
    description: string;
}

export abstract class AigTypeBase<
    TType,
    TDef extends AigTypeDef = AigTypeDef
> {
    readonly _type!: TType;
    readonly _def: TDef;

    protected constructor(def: TDef) {
        this._def = def;
    }

    public describe(description: string): this {
        this._def.description = description;
        return this;
    }
}
