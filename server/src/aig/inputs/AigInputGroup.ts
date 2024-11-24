import { AigInputType } from './AigInputType';
import { AigInputBase, AigInputDef, AigParamShape } from './AigInputBase';

export declare type AigGroupType<Shape extends AigParamShape> = {
    [k in keyof Shape]: Shape[k]['_type'];
};

export interface AigParamGroupDef extends AigInputDef {
    title: string;
    expanded: boolean;
}

/**
 * @deprecated not sure I want to do parameter grouping in the inputs definition
 */
export class AigInputGroup<TShape extends AigParamShape> extends AigInputBase<
    AigGroupType<TShape>,
    AigParamGroupDef
> {
    public constructor(shape: TShape) {
        super({
            type: AigInputType.Group,
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
