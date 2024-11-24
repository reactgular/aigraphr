import { AigInputCtx } from '../inputs/AigInputCtx';
import { AigOutputCtx } from '../outputs/AigOutputCtx';
import { AigTypeShape } from '../types/AigTypeBase';

export class AigNodeBuilder<TInputShape extends AigTypeShape, TOutputShape extends AigTypeShape> {
    protected constructor(
        private readonly inputShape: TInputShape,
        private readonly outputShape: TOutputShape
    ) {
    }

    public static create(): AigNodeBuilder<AigTypeShape, AigTypeShape> {
        return new AigNodeBuilder({}, {});
    }

    public inputs<TInputs extends AigTypeShape>(inputs: (ctx: AigInputCtx) => TInputs): AigNodeBuilder<TInputs, TOutputShape> {
        const inputCtx = new AigInputCtx();
        return new AigNodeBuilder(
            inputs(inputCtx), this.outputShape);
    }

    public outputs<TOutputs extends AigTypeShape>(outputs: (ctx: AigOutputCtx<TInputShape>) => TOutputs): AigNodeBuilder<TInputShape, TOutputs> {
        const outputCtx = new AigOutputCtx(this.inputShape);
        return new AigNodeBuilder(
            this.inputShape, outputs(outputCtx));
    }
}
