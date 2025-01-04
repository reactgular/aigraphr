import {aig} from '@/nodes/aig/aig';
import {coreConstant} from '@/nodes/core/coreConstant';
import {coreIfThenElse} from '@/nodes/core/coreIfThenElse';
import {coreJsonObject} from '@/nodes/core/coreJsonObject';

export const CORE = aig.group({
    description: 'Core nodes',
    name: 'core'
});

CORE.register(coreIfThenElse);
CORE.register(coreConstant);
CORE.register(coreJsonObject);
