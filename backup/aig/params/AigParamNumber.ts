import { AigParamKind } from './AigParamKind';
import { AigParamDef, AigParamType } from './AigParamType';

export class AigParamNumber extends AigParamType<number, AigParamDef> {
  public constructor() {
    super({
      kind: AigParamKind.Number,
      description: ''
    });
  }
}
