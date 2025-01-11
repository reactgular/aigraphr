import type {NodeDto} from '@/api';
import {nodesPaginateOptions} from '@/api/@tanstack/react-query.gen';
import type {WorkspaceAddress} from '@/components/hooks/useWorkspaceDto';
import {useSuspenseQuery} from '@tanstack/react-query';

export const useNodesDto = (address: WorkspaceAddress): Array<NodeDto> => {
    const {data} = useSuspenseQuery(nodesPaginateOptions({path: address}));
    return data;
};
