import {AigConstraintCtx} from './AigConstraintCtx';

export interface AigConstraint<TValue, TContext> {
    rule: (value: TValue, ctx: AigConstraintCtx<TContext>) => boolean;
    reason: string;
}
