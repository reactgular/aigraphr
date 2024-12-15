import {AigConstraint} from '../constraints/AigConstraint';
import {AigConstraints} from '../constraints/AigConstraints';
import {AigType} from './AigType';

export type AigTypeShape = Record<string, AigTypeAny>;
export type AigTypeAny = AigTypeBase<any, any>;
export type infer<T extends AigTypeBase<any, any>> = T['_type'];

export type AigTypeSchema<Shape extends AigTypeShape> = {
    [k in keyof Shape]: Shape[k]['_type'];
};

export interface AigTypeDef {
    description: string;
    type: AigType;
}

export abstract class AigTypeBase<TType, TDef extends AigTypeDef = AigTypeDef> {
    readonly _def: TDef;
    readonly _type!: TType;
    readonly constraints: AigConstraints<TType, TDef>;

    protected constructor(def: TDef) {
        this._def = def;
        this.constraints = new AigConstraints();
    }

    public constraint(rule: AigConstraint<TType, TDef>) {
        this.constraints.add(rule);
        return this;
    }

    public describe(description: string): this {
        this._def.description = description;
        return this;
    }
}
