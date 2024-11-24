import { AigInputType } from './AigInputType';

export type AigParamShape = { [k: string]: AigParamTypeAny };
export type AigParamTypeAny = AigInputBase<any, any>;
export type infer<T extends AigInputBase<any, any>> = T['_type'];

export interface AigInputDef {
    type: AigInputType;
    description: string;
}

export abstract class AigInputBase<
    TType,
    TDef extends AigInputDef = AigInputDef
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
