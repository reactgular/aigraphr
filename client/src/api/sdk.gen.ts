// This file is auto-generated by @hey-api/openapi-ts

import {createClient, createConfig, type Options} from '@hey-api/client-fetch';
import type {
    ProjectsPaginateData,
    ProjectsPaginateResponse,
    ProjectsCreateData,
    ProjectsCreateError,
    ProjectsCreateResponse,
    ProjectsRemoveData,
    ProjectsRemoveResponse,
    ProjectsGetData,
    ProjectsGetResponse,
    ProjectsUpdateData,
    ProjectsUpdateError,
    ProjectsUpdateResponse,
    ProjectsCreateValidateData,
    ProjectsCreateValidateError,
    ProjectsCreateValidateResponse,
    ProjectsUpdateValidateData,
    ProjectsUpdateValidateError,
    ProjectsUpdateValidateResponse,
    EdgesPaginateData,
    EdgesPaginateResponse,
    EdgesCreateData,
    EdgesCreateError,
    EdgesCreateResponse,
    EdgesRemoveData,
    EdgesRemoveResponse,
    EdgesGetData,
    EdgesGetResponse,
    EdgesUpdateData,
    EdgesUpdateError,
    EdgesUpdateResponse,
    NodesPaginateData,
    NodesPaginateResponse,
    NodesCreateData,
    NodesCreateError,
    NodesCreateResponse,
    NodesRemoveData,
    NodesRemoveResponse,
    NodesGetData,
    NodesGetResponse,
    NodesUpdateData,
    NodesUpdateError,
    NodesUpdateResponse,
    WorkspacesPaginateData,
    WorkspacesPaginateResponse,
    WorkspacesCreateData,
    WorkspacesCreateError,
    WorkspacesCreateResponse,
    WorkspacesRemoveData,
    WorkspacesRemoveResponse,
    WorkspacesGetData,
    WorkspacesGetResponse,
    WorkspacesUpdateData,
    WorkspacesUpdateError,
    WorkspacesUpdateResponse,
    WorkspacesCreateValidateData,
    WorkspacesCreateValidateError,
    WorkspacesCreateValidateResponse,
    WorkspacesUpdateValidateData,
    WorkspacesUpdateValidateError,
    WorkspacesUpdateValidateResponse,
    SettingsGetData,
    SettingsGetResponse,
    SettingsUpdateData,
    SettingsUpdateResponse,
    SettingsReplaceData,
    SettingsReplaceResponse
} from './types.gen';

export const client = createClient(createConfig());

/**
 * Paginate Project
 */
export const projectsPaginate = <ThrowOnError extends boolean = false>(
    options?: Options<ProjectsPaginateData, ThrowOnError>
) => {
    return (options?.client ?? client).get<
        ProjectsPaginateResponse,
        unknown,
        ThrowOnError
    >({
        ...options,
        url: '/api/projects'
    });
};

/**
 * Create a new Project
 */
export const projectsCreate = <ThrowOnError extends boolean = false>(
    options: Options<ProjectsCreateData, ThrowOnError>
) => {
    return (options?.client ?? client).post<
        ProjectsCreateResponse,
        ProjectsCreateError,
        ThrowOnError
    >({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/projects'
    });
};

/**
 * Delete a Project by projectId
 */
export const projectsRemove = <ThrowOnError extends boolean = false>(
    options: Options<ProjectsRemoveData, ThrowOnError>
) => {
    return (options?.client ?? client).delete<
        ProjectsRemoveResponse,
        unknown,
        ThrowOnError
    >({
        ...options,
        url: '/api/projects/{projectId}'
    });
};

/**
 * Get Project by projectId
 */
export const projectsGet = <ThrowOnError extends boolean = false>(
    options: Options<ProjectsGetData, ThrowOnError>
) => {
    return (options?.client ?? client).get<
        ProjectsGetResponse,
        unknown,
        ThrowOnError
    >({
        ...options,
        url: '/api/projects/{projectId}'
    });
};

/**
 * Update a Project by projectId
 */
export const projectsUpdate = <ThrowOnError extends boolean = false>(
    options: Options<ProjectsUpdateData, ThrowOnError>
) => {
    return (options?.client ?? client).patch<
        ProjectsUpdateResponse,
        ProjectsUpdateError,
        ThrowOnError
    >({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/projects/{projectId}'
    });
};

/**
 * Validates creation of a ProjectCreate
 */
export const projectsCreateValidate = <ThrowOnError extends boolean = false>(
    options: Options<ProjectsCreateValidateData, ThrowOnError>
) => {
    return (options?.client ?? client).post<
        ProjectsCreateValidateResponse,
        ProjectsCreateValidateError,
        ThrowOnError
    >({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/projects/validates'
    });
};

/**
 * Validates updating a ProjectUpdate by projectId
 */
export const projectsUpdateValidate = <ThrowOnError extends boolean = false>(
    options: Options<ProjectsUpdateValidateData, ThrowOnError>
) => {
    return (options?.client ?? client).patch<
        ProjectsUpdateValidateResponse,
        ProjectsUpdateValidateError,
        ThrowOnError
    >({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/projects/{projectId}/validates'
    });
};

/**
 * Paginate Edge
 */
export const edgesPaginate = <ThrowOnError extends boolean = false>(
    options: Options<EdgesPaginateData, ThrowOnError>
) => {
    return (options?.client ?? client).get<
        EdgesPaginateResponse,
        unknown,
        ThrowOnError
    >({
        ...options,
        url: '/api/projects/{projectId}/workspaces/{workspaceId}/edges'
    });
};

/**
 * Create a new Edge
 */
export const edgesCreate = <ThrowOnError extends boolean = false>(
    options: Options<EdgesCreateData, ThrowOnError>
) => {
    return (options?.client ?? client).post<
        EdgesCreateResponse,
        EdgesCreateError,
        ThrowOnError
    >({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/projects/{projectId}/workspaces/{workspaceId}/edges'
    });
};

/**
 * Delete a Edge by edgeId
 */
export const edgesRemove = <ThrowOnError extends boolean = false>(
    options: Options<EdgesRemoveData, ThrowOnError>
) => {
    return (options?.client ?? client).delete<
        EdgesRemoveResponse,
        unknown,
        ThrowOnError
    >({
        ...options,
        url: '/api/projects/{projectId}/workspaces/{workspaceId}/edges/{edgeId}'
    });
};

/**
 * Get Edge by edgeId
 */
export const edgesGet = <ThrowOnError extends boolean = false>(
    options: Options<EdgesGetData, ThrowOnError>
) => {
    return (options?.client ?? client).get<
        EdgesGetResponse,
        unknown,
        ThrowOnError
    >({
        ...options,
        url: '/api/projects/{projectId}/workspaces/{workspaceId}/edges/{edgeId}'
    });
};

/**
 * Update a Edge by edgeId
 */
export const edgesUpdate = <ThrowOnError extends boolean = false>(
    options: Options<EdgesUpdateData, ThrowOnError>
) => {
    return (options?.client ?? client).patch<
        EdgesUpdateResponse,
        EdgesUpdateError,
        ThrowOnError
    >({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/projects/{projectId}/workspaces/{workspaceId}/edges/{edgeId}'
    });
};

/**
 * Paginate Node
 */
export const nodesPaginate = <ThrowOnError extends boolean = false>(
    options: Options<NodesPaginateData, ThrowOnError>
) => {
    return (options?.client ?? client).get<
        NodesPaginateResponse,
        unknown,
        ThrowOnError
    >({
        ...options,
        url: '/api/projects/{projectId}/workspaces/{workspaceId}/nodes'
    });
};

/**
 * Create a new Node
 */
export const nodesCreate = <ThrowOnError extends boolean = false>(
    options: Options<NodesCreateData, ThrowOnError>
) => {
    return (options?.client ?? client).post<
        NodesCreateResponse,
        NodesCreateError,
        ThrowOnError
    >({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/projects/{projectId}/workspaces/{workspaceId}/nodes'
    });
};

/**
 * Delete a Node by nodeId
 */
export const nodesRemove = <ThrowOnError extends boolean = false>(
    options: Options<NodesRemoveData, ThrowOnError>
) => {
    return (options?.client ?? client).delete<
        NodesRemoveResponse,
        unknown,
        ThrowOnError
    >({
        ...options,
        url: '/api/projects/{projectId}/workspaces/{workspaceId}/nodes/{nodeId}'
    });
};

/**
 * Get Node by nodeId
 */
export const nodesGet = <ThrowOnError extends boolean = false>(
    options: Options<NodesGetData, ThrowOnError>
) => {
    return (options?.client ?? client).get<
        NodesGetResponse,
        unknown,
        ThrowOnError
    >({
        ...options,
        url: '/api/projects/{projectId}/workspaces/{workspaceId}/nodes/{nodeId}'
    });
};

/**
 * Update a Node by nodeId
 */
export const nodesUpdate = <ThrowOnError extends boolean = false>(
    options: Options<NodesUpdateData, ThrowOnError>
) => {
    return (options?.client ?? client).patch<
        NodesUpdateResponse,
        NodesUpdateError,
        ThrowOnError
    >({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/projects/{projectId}/workspaces/{workspaceId}/nodes/{nodeId}'
    });
};

/**
 * Paginate Workspace
 */
export const workspacesPaginate = <ThrowOnError extends boolean = false>(
    options: Options<WorkspacesPaginateData, ThrowOnError>
) => {
    return (options?.client ?? client).get<
        WorkspacesPaginateResponse,
        unknown,
        ThrowOnError
    >({
        ...options,
        url: '/api/projects/{projectId}/workspaces'
    });
};

/**
 * Create a new Workspace
 */
export const workspacesCreate = <ThrowOnError extends boolean = false>(
    options: Options<WorkspacesCreateData, ThrowOnError>
) => {
    return (options?.client ?? client).post<
        WorkspacesCreateResponse,
        WorkspacesCreateError,
        ThrowOnError
    >({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/projects/{projectId}/workspaces'
    });
};

/**
 * Delete a Workspace by workspaceId
 */
export const workspacesRemove = <ThrowOnError extends boolean = false>(
    options: Options<WorkspacesRemoveData, ThrowOnError>
) => {
    return (options?.client ?? client).delete<
        WorkspacesRemoveResponse,
        unknown,
        ThrowOnError
    >({
        ...options,
        url: '/api/projects/{projectId}/workspaces/{workspaceId}'
    });
};

/**
 * Get Workspace by workspaceId
 */
export const workspacesGet = <ThrowOnError extends boolean = false>(
    options: Options<WorkspacesGetData, ThrowOnError>
) => {
    return (options?.client ?? client).get<
        WorkspacesGetResponse,
        unknown,
        ThrowOnError
    >({
        ...options,
        url: '/api/projects/{projectId}/workspaces/{workspaceId}'
    });
};

/**
 * Update a Workspace by workspaceId
 */
export const workspacesUpdate = <ThrowOnError extends boolean = false>(
    options: Options<WorkspacesUpdateData, ThrowOnError>
) => {
    return (options?.client ?? client).patch<
        WorkspacesUpdateResponse,
        WorkspacesUpdateError,
        ThrowOnError
    >({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/projects/{projectId}/workspaces/{workspaceId}'
    });
};

/**
 * Validates creation of a WorkspaceCreate
 */
export const workspacesCreateValidate = <ThrowOnError extends boolean = false>(
    options: Options<WorkspacesCreateValidateData, ThrowOnError>
) => {
    return (options?.client ?? client).post<
        WorkspacesCreateValidateResponse,
        WorkspacesCreateValidateError,
        ThrowOnError
    >({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/projects/{projectId}/workspaces/validates'
    });
};

/**
 * Validates updating a WorkspaceUpdate by workspaceId
 */
export const workspacesUpdateValidate = <ThrowOnError extends boolean = false>(
    options: Options<WorkspacesUpdateValidateData, ThrowOnError>
) => {
    return (options?.client ?? client).patch<
        WorkspacesUpdateValidateResponse,
        WorkspacesUpdateValidateError,
        ThrowOnError
    >({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/projects/{projectId}/workspaces/{workspaceId}/validates'
    });
};

/**
 * Get App settings
 */
export const settingsGet = <ThrowOnError extends boolean = false>(
    options?: Options<SettingsGetData, ThrowOnError>
) => {
    return (options?.client ?? client).get<
        SettingsGetResponse,
        unknown,
        ThrowOnError
    >({
        ...options,
        url: '/api/app/settings'
    });
};

/**
 * Update App settings
 */
export const settingsUpdate = <ThrowOnError extends boolean = false>(
    options: Options<SettingsUpdateData, ThrowOnError>
) => {
    return (options?.client ?? client).patch<
        SettingsUpdateResponse,
        unknown,
        ThrowOnError
    >({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/app/settings'
    });
};

/**
 * Replace App settings
 */
export const settingsReplace = <ThrowOnError extends boolean = false>(
    options: Options<SettingsReplaceData, ThrowOnError>
) => {
    return (options?.client ?? client).put<
        SettingsReplaceResponse,
        unknown,
        ThrowOnError
    >({
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        url: '/api/app/settings'
    });
};
