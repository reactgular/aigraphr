import { AigType } from '../types/AigType';
import { AigTypeBase, AigTypeDef, AigTypeShape } from '../types/AigTypeBase';

export declare type AigGroupType<Shape extends AigTypeShape> = {
    [k in keyof Shape]: Shape[k]['_type'];
};

export interface AigParamGroupDef extends AigTypeDef {
    title: string;
    expanded: boolean;
}

/**
 * @deprecated not sure I want to do parameter grouping in the inputs definition
 */
export class AigInputGroup<TShape extends AigTypeShape> extends AigTypeBase<
    AigGroupType<TShape>,
    AigParamGroupDef
> {
    public constructor(shape: TShape) {
        super({
            type: AigType.Group,
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
