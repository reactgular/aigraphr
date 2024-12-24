// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import {
    NodesCreateData,
    NodesGetData,
    NodesPaginateData,
    NodesRemoveData,
    NodesUpdateData
} from '@shared/api/types.gen';

export function nodes() {
    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/nodes
     */
    function create(
        path: NodesCreateData['path'],
        body: NodesCreateData['body']
    ) {
        // TODO: implement Create
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/nodes/{nodeId}
     */
    function get(path: NodesGetData['path']) {
        // TODO: implement Get
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/nodes
     */
    function paginate(path: NodesPaginateData['path']) {
        // TODO: implement Paginate
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/nodes/{nodeId}
     */
    function remove(path: NodesRemoveData['path']) {
        // TODO: implement Remove
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/nodes/{nodeId}
     */
    function update(
        path: NodesUpdateData['path'],
        body: NodesUpdateData['body']
    ) {
        // TODO: implement Update
    }

    return {create, get, paginate, remove, update};
}
