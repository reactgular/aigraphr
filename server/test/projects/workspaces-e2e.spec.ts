import {ProjectCreateDto, ProjectDto} from '@/entities/project.entity';
import {
    WorkspaceCreateDto,
    WorkspaceDto,
    WorkspaceEngine
} from '@/projects/entities/workspace.entity';
import {client, workspacesGet} from '@shared/api/sdk.gen';
import {CreateMemory, createMemoryApp} from '../utils/create-memory-app';
import {expectPartial} from '../utils/expect-partial';

client.setConfig({
    baseUrl: 'http://localhost:3030'
});

xdescribe('Workspaces API (e2e) Tests', () => {
    let app: CreateMemory;
    const route = '/api/projects/1/workspaces';

    beforeAll(async () => {
        app = await createMemoryApp();

        await app.request
            .post('/api/projects')
            .send({
                name: 'test',
                fileName: 'test.aigraphr',
                encrypted: false
            } satisfies ProjectCreateDto)
            .expect(201)
            .expect({
                id: 1,
                name: 'test',
                fileName: 'test.aigraphr',
                open: true,
                encrypted: false
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

    it('should get a workspace', async () => {
        const resp = await workspacesGet({
            path: {
                projectId: 1,
                workspaceId: 1
            }
        });

        expect(resp.response.status).toBe(200);
        expect(resp.data).toEqual(
            expect.objectContaining<Omit<WorkspaceDto, 'id'>>({
                name: 'test',
                description: 'A test workspace',
                engine: WorkspaceEngine.JAVASCRIPT
            })
        );
    });
});
