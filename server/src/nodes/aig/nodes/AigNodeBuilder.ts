import {GrGroupDto} from '@/graph/dtos/gr-group.dto';
import {GrNodeDto} from '@/graph/dtos/gr-node.dto';
import {GrParamDto} from '@/graph/dtos/gr-param.dto';
import {AigConstraint} from '../constraints/AigConstraint';
import {AigConstraints} from '../constraints/AigConstraints';
import {AigInputCtx} from '../inputs/AigInputCtx';
import {AigOutputCtx} from '../outputs/AigOutputCtx';
import {AigTypeSchema, AigTypeShape} from '../types/AigTypeBase';

export interface AigNodeBuilderOptions {
    description: string;

    type: string;
}

export class AigNodeBuilder<
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
    ): AigNodeBuilder<AigTypeShape, AigTypeShape> {
        return new AigNodeBuilder(
            options,
            {},
            {},
            new AigConstraints(),
            new AigConstraints()
        );
    }

    public compile(group: string, grGroupDto?: GrGroupDto): GrNodeDto {
        const compileShape = (shape: AigTypeShape) =>
            Object.entries(shape).reduce((acc, [key, value]) => {
                acc.push(value.compile(key));
                return acc;
            }, [] as GrParamDto[]);

        return {
            description: this.options.description,
            group,
            inputs: compileShape(this.inputShape),
            outputs: compileShape(this.outputShape),
            type: `${group}:${this.options.type}`,
            version: this.version
        } satisfies GrNodeDto;
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

    public end(): AigNodeBuilder<AigTypeShape, AigTypeShape> {
        return this as unknown as AigNodeBuilder<AigTypeShape, AigTypeShape>;
    }

    public inputs<TInputs extends AigTypeShape>(
        inputs: (ctx: AigInputCtx) => TInputs
    ): AigNodeBuilder<TInputs, TOutputShape> {
        const inputCtx = new AigInputCtx();
        return new AigNodeBuilder(
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
    ): AigNodeBuilder<TInputShape, TOutputs> {
        const outputCtx = new AigOutputCtx(this.inputShape);
        return new AigNodeBuilder(
            this.options,
            this.inputShape,
            outputs(outputCtx),
            this.inputConstraints,
            new AigConstraints()
        );
    }
}
