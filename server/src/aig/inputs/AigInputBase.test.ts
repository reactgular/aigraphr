import { AigInputType } from './AigInputType';
import { AigInputBase } from './AigInputBase';

class AigInputBaseTest extends AigInputBase<string> {
    public constructor() {
        super({
            type: AigInputType.String,
            description: ''
        });
    }
}

test('Should set description', () => {
    const p = new AigInputBaseTest().describe('Test');
    expect(p._def.description).toBe('Test');
});
