import {AigConstraint} from '../constraints/AigConstraint';
import {AigConstraints} from '../constraints/AigConstraints';
import {AigInputCtx} from '../inputs/AigInputCtx';
import {AigOutputCtx} from '../outputs/AigOutputCtx';
import {AigTypeSchema, AigTypeShape} from '../types/AigTypeBase';

export class AigNodeBuilder<
    TInputShape extends AigTypeShape,
    TOutputShape extends AigTypeShape
> {
    protected constructor(
        private readonly inputShape: TInputShape,
        private readonly outputShape: TOutputShape,
        private readonly inputConstraints: AigConstraints<
            AigTypeSchema<TInputShape>,
            TInputShape
        >,
        private readonly outputConstraints: AigConstraints<
            AigTypeSchema<TOutputShape>,
            TOutputShape
        >
    ) {}

    public static create(): AigNodeBuilder<AigTypeShape, AigTypeShape> {
        return new AigNodeBuilder(
            {},
            {},
            new AigConstraints(),
            new AigConstraints()
        );
    }

    public constraint(
        rule: AigConstraint<AigTypeSchema<TInputShape>, TInputShape>
    ) {
        this.inputConstraints.add(rule);
        return this;
    }

    public constraintOutput(
        rule: AigConstraint<AigTypeSchema<TOutputShape>, TOutputShape>
    ) {
        this.outputConstraints.add(rule);
        return this;
    }

    public inputs<TInputs extends AigTypeShape>(
        inputs: (ctx: AigInputCtx) => TInputs
    ): AigNodeBuilder<TInputs, TOutputShape> {
        const inputCtx = new AigInputCtx();
        return new AigNodeBuilder(
            inputs(inputCtx),
            this.outputShape,
            new AigConstraints(),
            this.outputConstraints
        );
    }

    public outputs<TOutputs extends AigTypeShape>(
        outputs: (ctx: AigOutputCtx<TInputShape>) => TOutputs
    ): AigNodeBuilder<TInputShape, TOutputs> {
        const outputCtx = new AigOutputCtx(this.inputShape);
        return new AigNodeBuilder(
            this.inputShape,
            outputs(outputCtx),
            this.inputConstraints,
            new AigConstraints()
        );
    }
}
