import { AigInputKind } from './AigInputKind';
import { AigInputType } from './AigInputType';

class AigInputTypeTest extends AigInputType<string> {
    public constructor() {
        super({
            kind: AigInputKind.String,
            description: ''
        });
    }
}

test('Should set description', () => {
    const p = new AigInputTypeTest().describe('Test');
    expect(p._def.description).toBe('Test');
});
