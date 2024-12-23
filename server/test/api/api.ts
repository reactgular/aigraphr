// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import {
    projectsPaginate,
    projectsCreate,
    projectsGet,
    projectsRemove,
    projectsUpdate,
    projectsCreateValidate,
    projectsUpdateValidate,
    edgesPaginate,
    edgesCreate,
    edgesGet,
    edgesRemove,
    edgesUpdate,
    nodesPaginate,
    nodesCreate,
    nodesGet,
    nodesRemove,
    nodesUpdate,
    workspacesPaginate,
    workspacesCreate,
    workspacesGet,
    workspacesRemove,
    workspacesUpdate,
    workspacesCreateValidate,
    workspacesUpdateValidate,
    settingsGet,
    settingsReplace,
    settingsUpdate
} from '@shared/api/sdk.gen';
import type {
    ProjectsPaginateData,
    ProjectsPaginateResponses,
    ProjectsCreateData,
    ProjectsCreateResponses,
    ProjectsCreateErrors,
    ProjectsGetData,
    ProjectsGetResponses,
    ProjectsGetErrors,
    ProjectsRemoveData,
    ProjectsRemoveResponses,
    ProjectsRemoveErrors,
    ProjectsUpdateData,
    ProjectsUpdateResponses,
    ProjectsUpdateErrors,
    ProjectsCreateValidateData,
    ProjectsCreateValidateResponses,
    ProjectsCreateValidateErrors,
    ProjectsUpdateValidateData,
    ProjectsUpdateValidateResponses,
    ProjectsUpdateValidateErrors,
    EdgesPaginateData,
    EdgesPaginateResponses,
    EdgesCreateData,
    EdgesCreateResponses,
    EdgesCreateErrors,
    EdgesGetData,
    EdgesGetResponses,
    EdgesGetErrors,
    EdgesRemoveData,
    EdgesRemoveResponses,
    EdgesRemoveErrors,
    EdgesUpdateData,
    EdgesUpdateResponses,
    EdgesUpdateErrors,
    NodesPaginateData,
    NodesPaginateResponses,
    NodesCreateData,
    NodesCreateResponses,
    NodesCreateErrors,
    NodesGetData,
    NodesGetResponses,
    NodesGetErrors,
    NodesRemoveData,
    NodesRemoveResponses,
    NodesRemoveErrors,
    NodesUpdateData,
    NodesUpdateResponses,
    NodesUpdateErrors,
    WorkspacesPaginateData,
    WorkspacesPaginateResponses,
    WorkspacesCreateData,
    WorkspacesCreateResponses,
    WorkspacesCreateErrors,
    WorkspacesGetData,
    WorkspacesGetResponses,
    WorkspacesGetErrors,
    WorkspacesRemoveData,
    WorkspacesRemoveResponses,
    WorkspacesRemoveErrors,
    WorkspacesUpdateData,
    WorkspacesUpdateResponses,
    WorkspacesUpdateErrors,
    WorkspacesCreateValidateData,
    WorkspacesCreateValidateResponses,
    WorkspacesCreateValidateErrors,
    WorkspacesUpdateValidateData,
    WorkspacesUpdateValidateResponses,
    WorkspacesUpdateValidateErrors,
    SettingsGetData,
    SettingsGetResponses,
    SettingsReplaceData,
    SettingsReplaceResponses,
    SettingsUpdateData,
    SettingsUpdateResponses
} from '@shared/api/types.gen';
import {builder} from './builder';

/**
 * AIGraphr
 * AIGraphr API
 *
 * Version: 1.0.0
 */
export const api = {
    projects: {
        /**
         * /api/projects
         */
        paginate: builder<
            ProjectsPaginateData,
            ProjectsPaginateResponses,
            never
        >(projectsPaginate),
        /**
         * /api/projects
         */
        create: builder<
            ProjectsCreateData,
            ProjectsCreateResponses,
            ProjectsCreateErrors
        >(projectsCreate),
        /**
         * /api/projects/{projectId}
         */
        get: builder<ProjectsGetData, ProjectsGetResponses, ProjectsGetErrors>(
            projectsGet
        ),
        /**
         * /api/projects/{projectId}
         */
        remove: builder<
            ProjectsRemoveData,
            ProjectsRemoveResponses,
            ProjectsRemoveErrors
        >(projectsRemove),
        /**
         * /api/projects/{projectId}
         */
        update: builder<
            ProjectsUpdateData,
            ProjectsUpdateResponses,
            ProjectsUpdateErrors
        >(projectsUpdate),
        /**
         * /api/projects/validates
         */
        createValidate: builder<
            ProjectsCreateValidateData,
            ProjectsCreateValidateResponses,
            ProjectsCreateValidateErrors
        >(projectsCreateValidate),
        /**
         * /api/projects/{projectId}/validates
         */
        updateValidate: builder<
            ProjectsUpdateValidateData,
            ProjectsUpdateValidateResponses,
            ProjectsUpdateValidateErrors
        >(projectsUpdateValidate)
    },
    edges: {
        /**
         * /api/projects/{projectId}/workspaces/{workspaceId}/edges
         */
        paginate: builder<EdgesPaginateData, EdgesPaginateResponses, never>(
            edgesPaginate
        ),
        /**
         * /api/projects/{projectId}/workspaces/{workspaceId}/edges
         */
        create: builder<
            EdgesCreateData,
            EdgesCreateResponses,
            EdgesCreateErrors
        >(edgesCreate),
        /**
         * /api/projects/{projectId}/workspaces/{workspaceId}/edges/{edgeId}
         */
        get: builder<EdgesGetData, EdgesGetResponses, EdgesGetErrors>(edgesGet),
        /**
         * /api/projects/{projectId}/workspaces/{workspaceId}/edges/{edgeId}
         */
        remove: builder<
            EdgesRemoveData,
            EdgesRemoveResponses,
            EdgesRemoveErrors
        >(edgesRemove),
        /**
         * /api/projects/{projectId}/workspaces/{workspaceId}/edges/{edgeId}
         */
        update: builder<
            EdgesUpdateData,
            EdgesUpdateResponses,
            EdgesUpdateErrors
        >(edgesUpdate)
    },
    nodes: {
        /**
         * /api/projects/{projectId}/workspaces/{workspaceId}/nodes
         */
        paginate: builder<NodesPaginateData, NodesPaginateResponses, never>(
            nodesPaginate
        ),
        /**
         * /api/projects/{projectId}/workspaces/{workspaceId}/nodes
         */
        create: builder<
            NodesCreateData,
            NodesCreateResponses,
            NodesCreateErrors
        >(nodesCreate),
        /**
         * /api/projects/{projectId}/workspaces/{workspaceId}/nodes/{nodeId}
         */
        get: builder<NodesGetData, NodesGetResponses, NodesGetErrors>(nodesGet),
        /**
         * /api/projects/{projectId}/workspaces/{workspaceId}/nodes/{nodeId}
         */
        remove: builder<
            NodesRemoveData,
            NodesRemoveResponses,
            NodesRemoveErrors
        >(nodesRemove),
        /**
         * /api/projects/{projectId}/workspaces/{workspaceId}/nodes/{nodeId}
         */
        update: builder<
            NodesUpdateData,
            NodesUpdateResponses,
            NodesUpdateErrors
        >(nodesUpdate)
    },
    workspaces: {
        /**
         * /api/projects/{projectId}/workspaces
         */
        paginate: builder<
            WorkspacesPaginateData,
            WorkspacesPaginateResponses,
            never
        >(workspacesPaginate),
        /**
         * /api/projects/{projectId}/workspaces
         */
        create: builder<
            WorkspacesCreateData,
            WorkspacesCreateResponses,
            WorkspacesCreateErrors
        >(workspacesCreate),
        /**
         * /api/projects/{projectId}/workspaces/{workspaceId}
         */
        get: builder<
            WorkspacesGetData,
            WorkspacesGetResponses,
            WorkspacesGetErrors
        >(workspacesGet),
        /**
         * /api/projects/{projectId}/workspaces/{workspaceId}
         */
        remove: builder<
            WorkspacesRemoveData,
            WorkspacesRemoveResponses,
            WorkspacesRemoveErrors
        >(workspacesRemove),
        /**
         * /api/projects/{projectId}/workspaces/{workspaceId}
         */
        update: builder<
            WorkspacesUpdateData,
            WorkspacesUpdateResponses,
            WorkspacesUpdateErrors
        >(workspacesUpdate),
        /**
         * /api/projects/{projectId}/workspaces/validates
         */
        createValidate: builder<
            WorkspacesCreateValidateData,
            WorkspacesCreateValidateResponses,
            WorkspacesCreateValidateErrors
        >(workspacesCreateValidate),
        /**
         * /api/projects/{projectId}/workspaces/{workspaceId}/validates
         */
        updateValidate: builder<
            WorkspacesUpdateValidateData,
            WorkspacesUpdateValidateResponses,
            WorkspacesUpdateValidateErrors
        >(workspacesUpdateValidate)
    },
    settings: {
        /**
         * /api/app/settings
         */
        get: builder<SettingsGetData, SettingsGetResponses, never>(settingsGet),
        /**
         * /api/app/settings
         */
        replace: builder<SettingsReplaceData, SettingsReplaceResponses, never>(
            settingsReplace
        ),
        /**
         * /api/app/settings
         */
        update: builder<SettingsUpdateData, SettingsUpdateResponses, never>(
            settingsUpdate
        )
    }
};
