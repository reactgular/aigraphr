import {ProjectDto} from '@/entities/project.entity';
import {
    WorkspaceCreateDto,
    WorkspaceDto,
    WorkspaceEngine
} from '@/projects/entities/workspace.entity';
import {CreateMemory, createMemoryApp} from '../utils/create-memory-app';
import {expectPartial} from '../utils/expect-partial';

describe('Workspaces API (e2e) Tests', () => {
    let app: CreateMemory;
    const route = '/api/projects/1/workspaces';

    beforeAll(async () => {
        app = await createMemoryApp();

        await app.request
            .post('/api/projects')
            .send({name: 'test'})
            .expect(201)
            .expect({
                id: 1,
                name: 'test',
                open: true
            } satisfies ProjectDto);
    });

    afterAll(async () => {
        await app.shutdown();
    });

    it('should create a workspace', async () => {
        await app.request
            .post(route)
            .send({
                name: 'test',
                description: 'A test workspace',
                engine: WorkspaceEngine.JAVASCRIPT
            } satisfies WorkspaceCreateDto)
            .expect(201)
            .expect(
                expectPartial<WorkspaceDto>({
                    name: 'test',
                    description: 'A test workspace',
                    engine: WorkspaceEngine.JAVASCRIPT
                })
            );
    });
});
