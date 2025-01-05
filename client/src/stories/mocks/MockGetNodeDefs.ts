import type {GrNodeDefDto, GrNodeDefGetNodeDefGroupsResponses} from '@/api';

export const mockGetNodeDefs = (nodes: Array<GrNodeDefDto>) => {
    return {
        url: 'http://localhost:6006/api/node-def/groups',
        method: 'GET',
        status: 200,
        response: [
            {
                description: 'Core nodes',
                name: 'core',
                nodes
            }
        ] satisfies GrNodeDefGetNodeDefGroupsResponses['200']
    };
};
