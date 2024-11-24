import { AigTypeShape } from '../types/AigTypeBase';

export class AigValidateCtx<TInputShape extends AigTypeShape> {
    public constructor(private inputObject: TInputShape) {
    }
}
