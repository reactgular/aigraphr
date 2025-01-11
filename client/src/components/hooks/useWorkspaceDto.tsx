import type {WorkspaceDto, WorkspacesGetData} from '@/api';
import {workspacesGetOptions} from '@/api/@tanstack/react-query.gen';
import {useSuspenseQuery} from '@tanstack/react-query';

export type WorkspaceAddress = WorkspacesGetData['path'];

export const useWorkspaceDto = (address: WorkspaceAddress): WorkspaceDto => {
    const {data} = useSuspenseQuery(workspacesGetOptions({path: address}));
    return data;
};
