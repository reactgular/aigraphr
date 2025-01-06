import {GrNodeDefIcon} from '@/graph/dtos/gr-node-def.dto';
import {aig} from '@/nodes/aig/aig';

export const coreIfThenElse = aig
    .node({
        type: 'if-then-else',
        icon: GrNodeDefIcon.CORE,
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
    }));
