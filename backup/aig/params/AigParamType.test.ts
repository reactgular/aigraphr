import { AigParamKind } from './AigParamKind';
import { AigParamType } from './AigParamType';

class AigParamTypeTest extends AigParamType<string> {
  public constructor() {
    super({
      kind: AigParamKind.String,
      description: '',
    });
  }
}

test('Should set description', () => {
  const p = new AigParamTypeTest().describe('Test');
  expect(p._def.description).toBe('Test');
});
