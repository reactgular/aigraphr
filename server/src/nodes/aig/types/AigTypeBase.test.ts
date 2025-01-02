import {GrParamType} from '@/graph/dtos/gr-param.dto';
import {AigTypeBase} from './AigTypeBase';

class AigTypeBaseTest extends AigTypeBase<string> {
    public constructor() {
        super({
            type: GrParamType.String,
            description: ''
        });
    }
}

test('Should set description', () => {
    const p = new AigTypeBaseTest().describe('Test');
    expect(p._def.description).toBe('Test');
});
