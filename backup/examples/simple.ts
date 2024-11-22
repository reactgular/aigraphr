import { aig } from '@/aig/aig';
import { z } from 'zod';

const nodeIfThenElse = aig
  .node()
  .inputs(ctx => ({
    condition: ctx.boolean().describe('The condition to check'),
    then: ctx.string().describe('The then value'),
    else: ctx.string().describe('The else value')
  }))
  .output(ctx => ({
    value: ctx.string().describe('The output value')
  }));

const nodeConstant = aig
  .node()
  .inputs(ctx => ({
    value: ctx.unknown()
  }))
  .output(ctx => ({
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
  }))
  .output(ctx => ({}));

const jsonObject = aig
  .node()
  .inputs(ctx => ({
    object: ctx
      .object({
        key: z.string(),
        value: z.string()
      })
      .describe('The object to use')
  }))
  .output(ctx => ({}));
