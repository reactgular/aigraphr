import type {NodeDto} from '@/api';

export const mockNodeDto = ({
    workspaceId,
    nodeId,
    type
}: {
    workspaceId: number;
    nodeId: number;
    type: string;
}): NodeDto => {
    return {
        id: nodeId,
        workspaceId,
        type,
        view: false,
        name: 'mockNode1'
    };
};
