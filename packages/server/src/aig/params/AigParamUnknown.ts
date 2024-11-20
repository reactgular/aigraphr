import { AigParamKind } from './AigParamKind';
import { AigParamDef, AigParamType } from './AigParamType';

export class AigParamUnknown extends AigParamType<unknown, AigParamDef> {
  public constructor() {
    super({
      kind: AigParamKind.Unknown,
      description: '',
    });
  }
}
