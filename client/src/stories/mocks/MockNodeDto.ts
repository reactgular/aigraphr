import type {NodeDto} from '@/api';

export const mockNodeDto = (): NodeDto => {
    return {
        id: 1,
        workspaceId: 1,
        type: 'core:if-then-else',
        name: 'forEach1'
    };
};
