import { AigInputCtx } from '../contexts/AigInputCtx';
import { AigOutputCtx } from '../contexts/AigOutputCtx';
import { AigParamShape } from '../params/AigParamType';

export class AigNodeDesc<TInputShape extends AigParamShape, TOutputShape extends AigParamShape> {
    protected constructor(
        private readonly inputShape: TInputShape,
        private readonly outputShape: TOutputShape
    ) {
    }

    public static create(): AigNodeDesc<AigParamShape, AigParamShape> {
        return new AigNodeDesc({}, {});
    }

    public inputs<TInputs extends AigParamShape>(inputShape: (ctx: AigInputCtx) => TInputs): AigNodeDesc<TInputs, TOutputShape> {
        const inputCtx = new AigInputCtx();
        const inputObject = inputShape(inputCtx);
        return new AigNodeDesc(inputObject, this.outputShape);
    }

    public outputs<TOutputs extends AigParamShape>(outputShape: (ctx: AigOutputCtx<TInputShape>) => TOutputs): AigNodeDesc<TInputShape, TOutputs> {
        const outputCtx = new AigOutputCtx(this.inputShape);
        const outputObject = outputShape(outputCtx);
        return new AigNodeDesc(this.inputShape, outputObject);
    }
}
