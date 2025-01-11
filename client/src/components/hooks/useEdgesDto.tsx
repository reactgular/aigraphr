import type {EdgeDto} from '@/api';
import {edgesPaginateOptions} from '@/api/@tanstack/react-query.gen';
import type {WorkspaceAddress} from '@/components/hooks/useWorkspaceDto';
import {useSuspenseQuery} from '@tanstack/react-query';

export const useEdgesDto = (address: WorkspaceAddress): Array<EdgeDto> => {
    const {data} = useSuspenseQuery(edgesPaginateOptions({path: address}));
    return data;
};
