import { AigParamKind } from './AigParamKind';
import { AigParamDef, AigParamType } from './AigParamType';

export class AigParamString extends AigParamType<string, AigParamDef> {
  public constructor() {
    super({
      kind: AigParamKind.String,
      description: '',
    });
  }
}
