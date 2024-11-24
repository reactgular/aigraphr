import { AigInputCtx } from '../contexts/AigInputCtx';
import { AigOutputCtx } from '../contexts/AigOutputCtx';
import { AigParamShape } from '../inputs/AigInputBase';

/**
 * @todo add an inputConstraints method, example: if/then/else - then type must match else type
 */
export class AigNodeBuilder<TInputShape extends AigParamShape, TOutputShape extends AigParamShape> {
    protected constructor(
        private readonly inputShape: TInputShape,
        private readonly outputShape: TOutputShape
    ) {
    }

    public static create(): AigNodeBuilder<AigParamShape, AigParamShape> {
        return new AigNodeBuilder({}, {});
    }

    public inputs<TInputs extends AigParamShape>(inputs: (ctx: AigInputCtx) => TInputs): AigNodeBuilder<TInputs, TOutputShape> {
        const inputCtx = new AigInputCtx();
        return new AigNodeBuilder(inputs(inputCtx), this.outputShape);
    }

    public outputs<TOutputs extends AigParamShape>(outputs: (ctx: AigOutputCtx<TInputShape>) => TOutputs): AigNodeBuilder<TInputShape, TOutputs> {
        const outputCtx = new AigOutputCtx(this.inputShape);
        return new AigNodeBuilder(this.inputShape, outputs(outputCtx));
    }
}
