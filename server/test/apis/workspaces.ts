// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import {
    WorkspacesCreateData,
    WorkspacesCreateValidateData,
    WorkspacesGetData,
    WorkspacesPaginateData,
    WorkspacesRemoveData,
    WorkspacesUpdateData,
    WorkspacesUpdateValidateData
} from '@shared/api/types.gen';

export function workspaces() {
    /**
     * /api/projects/{projectId}/workspaces
     */
    function create(
        path: WorkspacesCreateData['path'],
        body: WorkspacesCreateData['body']
    ) {
        // TODO: implement Create
    }

    /**
     * /api/projects/{projectId}/workspaces/validates
     */
    function createValidate(body: WorkspacesCreateValidateData['body']) {
        // TODO: implement CreateValidate
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}
     */
    function get(path: WorkspacesGetData['path']) {
        // TODO: implement Get
    }

    /**
     * /api/projects/{projectId}/workspaces
     */
    function paginate(path: WorkspacesPaginateData['path']) {
        // TODO: implement Paginate
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}
     */
    function remove(path: WorkspacesRemoveData['path']) {
        // TODO: implement Remove
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}
     */
    function update(
        path: WorkspacesUpdateData['path'],
        body: WorkspacesUpdateData['body']
    ) {
        // TODO: implement Update
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/validates
     */
    function updateValidate(
        path: WorkspacesUpdateValidateData['path'],
        body: WorkspacesUpdateValidateData['body']
    ) {
        // TODO: implement UpdateValidate
    }

    return {
        create,
        createValidate,
        get,
        paginate,
        remove,
        update,
        updateValidate
    };
}
