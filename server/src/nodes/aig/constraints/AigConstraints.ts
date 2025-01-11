import {GrNodeDefParamDto} from '@/graph/dtos/gr-node-def-param.dto';
import {AigConstraint} from './AigConstraint';
import {AigConstraintCtx} from './AigConstraintCtx';

export class AigConstraints<TValue, TContext> {
    private readonly constraints: Array<AigConstraint<TValue, TContext>>;

    public constructor() {
        this.constraints = [];
    }

    public add(rule: AigConstraint<TValue, TContext>) {
        this.constraints.push(rule);
    }

    public compile(): GrNodeDefParamDto[] {
        return [];
    }

    public validate(value: TValue, context: TContext) {
        const ctx = new AigConstraintCtx(context);
        for (const constraint of this.constraints) {
            if (!constraint.rule(value, ctx)) {
                // @TODO Add more context to the error message
                throw new Error(constraint.reason);
            }
        }
    }
}
