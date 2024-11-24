import { AigTypeSchema, AigTypeShape } from '../types/AigTypeBase';
import { AigConstraintCtx } from './AigConstraintCtx';

export interface AigConstraintRule<TInputShape extends AigTypeShape> {
    rule: (
        inputs: AigTypeSchema<TInputShape>,
        ctx: AigConstraintCtx<TInputShape>
    ) => boolean;
    reason: string;
}
