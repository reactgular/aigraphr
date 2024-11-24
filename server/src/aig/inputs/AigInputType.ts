import { AigInputKind } from './AigInputKind';

export type AigParamShape = { [k: string]: AigParamTypeAny };
export type AigParamTypeAny = AigInputType<any, any>;
export type infer<T extends AigInputType<any, any>> = T['_type'];

export interface AigParamDef {
    kind: AigInputKind;
    description: string;
}

export abstract class AigInputType<
    TType,
    TDef extends AigParamDef = AigParamDef
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
