import {z} from 'zod';
import {aig} from '../aig/aig';

const nodeIfThenElse = aig
    .node({
        type: 'core/if-then-else',
        description:
            'If the condition is true, then return the then value, otherwise return the else value'
    })
    .inputs((ctx) => ({
        condition: ctx.boolean().describe('The condition to check'),
        then: ctx.userType().describe('The then value'),
        else: ctx.userType().describe('The else value')
    }))
    .constraint({
        rule: ({then: _then, else: _else}) => _then.type === _else.type,
        reason: 'The then and else values must be of the same type'
    })
    .outputs((ctx) => ({
        value: ctx.inputType('then').describe('The output value')
    }))
    .compile();

const nodeConstant = aig
    .node({
        type: 'core/constant',
        description: 'A constant value'
    })
    .inputs((ctx) => ({
        value: ctx.string().describe('The value to use')
    }))
    .outputs((ctx) => ({
        value: ctx.inputType('value')
    }))
    .compile();

const jsonObject = aig
    .node({
        type: 'core/object',
        description: 'An object'
    })
    .inputs((ctx) => ({
        object: ctx
            .object({
                key: z.string(),
                value: z.string()
            })
            .describe('The object to use')
    }))
    .compile();

export const coreNodes = [nodeIfThenElse, nodeConstant, jsonObject];
