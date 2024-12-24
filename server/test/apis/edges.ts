// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import {
    EdgesCreateData,
    EdgesGetData,
    EdgesPaginateData,
    EdgesRemoveData,
    EdgesUpdateData
} from '@shared/api/types.gen';

export function edges() {
    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/edges
     */
    function create(
        path: EdgesCreateData['path'],
        body: EdgesCreateData['body']
    ) {
        // TODO: implement Create
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/edges/{edgeId}
     */
    function get(path: EdgesGetData['path']) {
        // TODO: implement Get
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/edges
     */
    function paginate(path: EdgesPaginateData['path']) {
        // TODO: implement Paginate
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/edges/{edgeId}
     */
    function remove(path: EdgesRemoveData['path']) {
        // TODO: implement Remove
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/edges/{edgeId}
     */
    function update(
        path: EdgesUpdateData['path'],
        body: EdgesUpdateData['body']
    ) {
        // TODO: implement Update
    }

    return {create, get, paginate, remove, update};
}
