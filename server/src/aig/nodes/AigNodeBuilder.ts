import { ZodTypeAny } from 'zod/lib/types';
import { AigInputCtx } from '../inputs/AigInputCtx';
import { AigOutputCtx } from '../outputs/AigOutputCtx';
import { AigTypeShape } from '../types/AigTypeBase';

type AigTypeZod<Shape extends AigTypeShape> = {
    [k in keyof Shape]: ZodTypeAny;
};

type AigTypeValidate = Record<string, ZodTypeAny>

export class AigNodeBuilder<TInputShape extends AigTypeShape, TOutputShape extends AigTypeShape, TValidateShape extends AigTypeValidate> {
    protected constructor(
        private readonly inputShape: TInputShape,
        private readonly outputShape: TOutputShape,
        private readonly validateShape: TValidateShape
    ) {
    }

    public static create(): AigNodeBuilder<AigTypeShape, AigTypeShape, AigTypeValidate> {
        return new AigNodeBuilder({}, {}, {});
    }

    public inputs<TInputs extends AigTypeShape>(inputs: (ctx: AigInputCtx) => TInputs): AigNodeBuilder<TInputs, TOutputShape, TValidateShape> {
        const inputCtx = new AigInputCtx();
        return new AigNodeBuilder(
            inputs(inputCtx), this.outputShape, this.validateShape);
    }

    public validate(validate: () => AigTypeZod<TInputShape>) {
        // const validateCtx = new AigValidateCtx(this.inputShape);
        const zodShape = validate();
        return new AigNodeBuilder(this.inputShape, this.outputShape, zodShape);
    }

    public outputs<TOutputs extends AigTypeShape>(outputs: (ctx: AigOutputCtx<TInputShape>) => TOutputs): AigNodeBuilder<TInputShape, TOutputs, TValidateShape> {
        const outputCtx = new AigOutputCtx(this.inputShape);
        return new AigNodeBuilder(
            this.inputShape, outputs(outputCtx), this.validateShape);
    }
}
