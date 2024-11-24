import { AigTypeShape } from '../types/AigTypeBase';

export class AigConstraintCtx<TInputShape extends AigTypeShape> {
    public constructor(private readonly inputObject: TInputShape) {
    }
}
