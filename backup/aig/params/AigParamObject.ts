import { ZodRawShape } from 'zod/lib/types';
import { AigParamKind } from './AigParamKind';
import { AigParamDef, AigParamType } from './AigParamType';

export class AigParamObject<TZodShape extends ZodRawShape> extends AigParamType<
  TZodShape,
  AigParamDef
> {
  public constructor(zod: TZodShape) {
    super({
      kind: AigParamKind.Object,
      description: '',
    });
  }
}
