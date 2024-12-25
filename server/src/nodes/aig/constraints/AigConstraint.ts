import {AigConstraintCtx} from './AigConstraintCtx';

export interface AigConstraint<TValue, TContext> {
    reason: string;
    rule: (value: TValue, ctx: AigConstraintCtx<TContext>) => boolean;
}
