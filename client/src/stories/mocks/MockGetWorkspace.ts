import type {WorkspacesGetResponses} from '@/api';
import type {WorkspaceAddress} from '@/components/hooks/useWorkspaceDto';
import {faker} from '@faker-js/faker';

export const mockGetWorkspace = ({
    projectId,
    workspaceId
}: WorkspaceAddress) => {
    return {
        url: `http://localhost:6006/api/projects/${projectId}/workspaces/${workspaceId}`,
        method: 'GET',
        status: 200,
        response: {
            id: 1,
            description: faker.lorem.sentence(),
            engine: 'javascript',
            name: faker.lorem.words(2)
        } satisfies WorkspacesGetResponses['200']
    };
};
