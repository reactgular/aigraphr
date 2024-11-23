import { AigParamBoolean } from '../params/AigParamBoolean';
import { AigParamNumber } from '../params/AigParamNumber';
import { AigParamString } from '../params/AigParamString';
import { AigParamShape } from '../params/AigParamType';
import { AigParamUnknown } from '../params/AigParamUnknown';

export class AigOutputCtx<TInputShape extends AigParamShape> {
  public constructor(private inputObject: TInputShape) {
  }

  public unknown() {
    return new AigParamUnknown();
  }

  public refer(inputKey: keyof TInputShape) {
    return new AigParamUnknown();
  }

  public string() {
    return new AigParamString();
  }

  public number() {
    return new AigParamNumber();
  }

  public boolean() {
    return new AigParamBoolean();
  }
}
