import {aig} from '@/nodes/aig/aig';

export const coreConstant = aig
    .node({
        type: 'constant',
        description: 'A constant value'
    })
    .inputs((ctx) => ({
        value: ctx.string().describe('The value to use')
    }))
    .outputs((ctx) => ({
        value: ctx.inputType('value')
    }));
