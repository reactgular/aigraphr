import { z } from 'zod';
import { aig } from '../aig/aig';

const nodeIfThenElse = aig
    .node()
    .inputs(ctx => ({
        condition: ctx.boolean().describe('The condition to check'),
        then: ctx.userType().describe('The then value'),
        else: ctx.userType().describe('The else value')
    }))
    .constraint({
        rule: ({
            then: _then,
            else: _else
        }) => _then.type === _else.type,
        reason: 'The then and else values must be of the same type'
    })
    .outputs(ctx => ({
        value: ctx.inputType('then').describe('The output value')
    }));

const nodeConstant = aig
    .node()
    .inputs(ctx => ({
        value: ctx.string().describe('The value to use')
    }))
    .outputs(ctx => ({
        value: ctx.inputType('value')
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
