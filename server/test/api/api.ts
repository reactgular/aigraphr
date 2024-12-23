import {
    projectsCreate,
    projectsGet,
    projectsPaginate,
    projectsRemove,
    workspacesGet
} from '@shared/api/sdk.gen';
import type {
    ProjectsCreateData,
    ProjectsCreateErrors,
    ProjectsCreateResponses,
    ProjectsGetData,
    ProjectsGetErrors,
    ProjectsGetResponses,
    ProjectsPaginateData,
    ProjectsPaginateResponses,
    ProjectsRemoveData,
    ProjectsRemoveErrors,
    ProjectsRemoveResponses,
    WorkspacesGetData,
    WorkspacesGetErrors,
    WorkspacesGetResponses
} from '@shared/api/types.gen';
import {builder} from './builder';

// TODO: this could be auto-generated from OpenAPI spec, but what a pain to code such a generator
export const api = {
    projects: {
        create: builder<
            ProjectsCreateData,
            ProjectsCreateResponses,
            ProjectsCreateErrors
        >(projectsCreate),
        get: builder<ProjectsGetData, ProjectsGetResponses, ProjectsGetErrors>(
            projectsGet
        ),
        paginate: builder<ProjectsPaginateData, ProjectsPaginateResponses>(
            projectsPaginate
        ),
        remove: builder<
            ProjectsRemoveData,
            ProjectsRemoveResponses,
            ProjectsRemoveErrors
        >(projectsRemove)
    },
    workspaces: {
        get: builder<
            WorkspacesGetData,
            WorkspacesGetResponses,
            WorkspacesGetErrors
        >(workspacesGet)
    }
};
