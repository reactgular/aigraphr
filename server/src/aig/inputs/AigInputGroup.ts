import { AigInputKind } from './AigInputKind';
import { AigInputType, AigParamDef, AigParamShape } from './AigInputType';

export declare type AigGroupType<Shape extends AigParamShape> = {
    [k in keyof Shape]: Shape[k]['_type'];
};

export interface AigParamGroupDef extends AigParamDef {
    title: string;
    expanded: boolean;
}

/**
 * @deprecated not sure I want to do parameter grouping in the inputs definition
 */
export class AigInputGroup<TShape extends AigParamShape> extends AigInputType<
    AigGroupType<TShape>,
    AigParamGroupDef
> {
    public constructor(shape: TShape) {
        super({
            kind: AigInputKind.Group,
            description: '',
            title: '',
            expanded: true
        });
    }

    public title(title: string): this {
        this._def.title = title;
        return this;
    }

    public expanded(expanded: boolean): this {
        this._def.expanded = expanded;
        return this;
    }
}
