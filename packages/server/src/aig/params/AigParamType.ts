import { AigParamKind } from './AigParamKind';

export type AigParamShape = { [k: string]: AigParamTypeAny };
export type AigParamTypeAny = AigParamType<any, any>;
export type infer<T extends AigParamType<any, any>> = T['_type'];

export interface AigParamDef {
  kind: AigParamKind;
  description: string;
}

export abstract class AigParamType<
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
