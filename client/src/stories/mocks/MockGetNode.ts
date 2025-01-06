import type {NodesGetResponses} from '@/api';
import type {NodeAddress} from '@/components/hooks/useNodeDto';
import {mockNodeDto} from '@/stories/mocks/MockNodeDto';

export const mockGetNode = (
    {projectId, workspaceId, nodeId}: NodeAddress,
    type: string
) => {
    return {
        url: `http://localhost:6006/api/projects/${projectId}/workspaces/${workspaceId}/nodes/${nodeId}`,
        method: 'GET',
        status: 200,
        response: mockNodeDto({
            workspaceId,
            nodeId,
            type
        }) satisfies NodesGetResponses['200']
    };
};
