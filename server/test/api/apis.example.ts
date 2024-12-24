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
        .is201()
        .isEntity({
            id: 1,
            name: 'test',
            engine: 'javascript',
            description: 'example'
        })
        .isWithoutId({
            name: 'test',
            engine: 'javascript',
            description: 'example'
        })
        .isId(1);
}
