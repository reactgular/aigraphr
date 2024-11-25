import {AigType} from './AigType';
import {AigTypeBase} from './AigTypeBase';

class AigTypeBaseTest extends AigTypeBase<string> {
    public constructor() {
        super({
            type: AigType.String,
            description: ''
        });
    }
}

test('Should set description', () => {
    const p = new AigTypeBaseTest().describe('Test');
    expect(p._def.description).toBe('Test');
});
