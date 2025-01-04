import {GrNodeDefParamDto} from '@/graph/dtos/gr-node-def-param.dto';
import {GrNodeDefDto} from '@/graph/dtos/gr-node-def.dto';
import {AigConstraint} from '../constraints/AigConstraint';
import {AigConstraints} from '../constraints/AigConstraints';
import {AigInputCtx} from '../inputs/AigInputCtx';
import {AigOutputCtx} from '../outputs/AigOutputCtx';
import {AigTypeSchema, AigTypeShape} from '../types/AigTypeBase';

export interface AigNodeBuilderOptions {
    description: string;

    type: string;
}

export class AigNodeDefBuilder<
    TInputShape extends AigTypeShape,
    TOutputShape extends AigTypeShape
> {
    protected version: number;

    protected constructor(
        private readonly options: AigNodeBuilderOptions,
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
    ) {
        this.version = 1;
    }

    public static create(
        options: AigNodeBuilderOptions
    ): AigNodeDefBuilder<AigTypeShape, AigTypeShape> {
        return new AigNodeDefBuilder(
            options,
            {},
            {},
            new AigConstraints(),
            new AigConstraints()
        );
    }

    public compile(group: string): GrNodeDefDto {
        const compileShape = (shape: AigTypeShape) => {
            const params = Object.entries(shape).reduce((acc, [key, value]) => {
                acc.push(value.compile(key));
                return acc;
            }, [] as GrNodeDefParamDto[]);
            return params.sort((a, b) => a.name.localeCompare(b.name));
        };

        return {
            description: this.options.description,
            group,
            inputs: compileShape(this.inputShape),
            outputs: compileShape(this.outputShape),
            type: `${group}:${this.options.type}`,
            version: this.version
        } satisfies GrNodeDefDto;
    }

    public constraint(
        rule: AigConstraint<AigTypeSchema<TInputShape>, TInputShape>
    ): this {
        this.inputConstraints.add(rule);
        return this;
    }

    public constraintOutput(
        rule: AigConstraint<AigTypeSchema<TOutputShape>, TOutputShape>
    ): this {
        this.outputConstraints.add(rule);
        return this;
    }

    public end(): AigNodeDefBuilder<AigTypeShape, AigTypeShape> {
        return this as unknown as AigNodeDefBuilder<AigTypeShape, AigTypeShape>;
    }

    public inputs<TInputs extends AigTypeShape>(
        inputs: (ctx: AigInputCtx) => TInputs
    ): AigNodeDefBuilder<TInputs, TOutputShape> {
        const inputCtx = new AigInputCtx();
        return new AigNodeDefBuilder(
            this.options,
            inputs(inputCtx),
            this.outputShape,
            new AigConstraints(),
            this.outputConstraints
        );
    }

    public migrate(): this {
        console.warn('Migrations not implemented');
        this.version++;
        return this;
    }

    public outputs<TOutputs extends AigTypeShape>(
        outputs: (ctx: AigOutputCtx<TInputShape>) => TOutputs
    ): AigNodeDefBuilder<TInputShape, TOutputs> {
        const outputCtx = new AigOutputCtx(this.inputShape);
        return new AigNodeDefBuilder(
            this.options,
            this.inputShape,
            outputs(outputCtx),
            this.inputConstraints,
            new AigConstraints()
        );
    }
}
