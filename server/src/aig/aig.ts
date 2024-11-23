import { AigInputCtx } from './contexts/AigInputCtx';
import { AigOutputCtx } from './contexts/AigOutputCtx';
import { AigParamGroup } from './params/AigParamGroup';
import { AigParamShape } from './params/AigParamType';

export namespace aig {
  export function node() {
    return {
      inputs: <TInputShape extends AigParamShape>(
        inputShape: (ctx: AigInputCtx) => TInputShape
      ) => {
        const inputObject = inputShape(new AigInputCtx());
        return {
          output: <TOutputShape extends AigParamShape>(
            outputShape: (ctx: AigOutputCtx<TInputShape>) => TOutputShape
          ) => {
            const outputObject = outputShape(new AigOutputCtx(inputObject));
            return {
              input: new AigParamGroup(inputObject).title('Input'),
              output: new AigParamGroup(outputObject).title('Output')
            };
          }
        };
      }
    };
  }
}
