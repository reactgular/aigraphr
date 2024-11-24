import { z } from 'zod';
import { aig } from '../aig/aig';

const nodeIfThenElse = aig
    .node()
    .inputs(ctx => ({
        condition: ctx.boolean().describe('The condition to check'),
        then: ctx.inferType().describe('The then value'),
        else: ctx.inferType().describe('The else value')
    }))
    .outputs(ctx => ({
        value: ctx.string().describe('The output value')
    }));

const nodeConstant = aig
    .node()
    .inputs(ctx => ({
        value: ctx.unknown()
    }))
    .outputs(ctx => ({
        value: ctx.refer('value')
    }));

const nodeChild = aig
    .node()
    .inputs(ctx => ({
        child: ctx
            .group({
                name: ctx.string().describe('The name of the child'),
                subChild: ctx.group({
                    deepName: ctx.string().describe('The name of the sub-child')
                })
            })
            .title('Child')
            .describe('The child to use')
            .expanded(false)
    }));

const jsonObject = aig
    .node()
    .inputs(ctx => ({
        object: ctx
            .object({
                key: z.string(),
                value: z.string()
            })
            .describe('The object to use')
    }));
