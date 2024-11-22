import { AigParamKind } from './AigParamKind';
import { AigParamDef, AigParamType } from './AigParamType';

export class AigParamBoolean extends AigParamType<boolean, AigParamDef> {
  public constructor() {
    super({
      kind: AigParamKind.Boolean,
      description: ''
    });
  }
}
