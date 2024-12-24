import {apis} from '../apis';

async function testIt() {
    const resp = await apis
        .workspaces()
        .create(
            {projectId: 1},
            {
                name: 'test',
                engine: 'javascript',
                description: 'example'
            }
        )
        .is200()
        .isBody({
            id: 1,
            name: 'test',
            engine: 'javascript',
            description: 'example'
        })
        .isBodyWithoutId({
            name: 'test',
            engine: 'javascript',
            description: 'example'
        })
        .isId(3);
}
