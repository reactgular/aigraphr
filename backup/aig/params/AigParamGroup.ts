import { AigParamKind } from './AigParamKind';
import { AigParamDef, AigParamShape, AigParamType } from './AigParamType';

export declare type AigGroupType<Shape extends AigParamShape> = {
  [k in keyof Shape]: Shape[k]['_type'];
};

export interface AigParamGroupDef extends AigParamDef {
  title: string;
  expanded: boolean;
}

export class AigParamGroup<TShape extends AigParamShape> extends AigParamType<
  AigGroupType<TShape>,
  AigParamGroupDef
> {
  public constructor(shape: TShape) {
    super({
      kind: AigParamKind.Group,
      description: '',
      title: '',
      expanded: true,
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
