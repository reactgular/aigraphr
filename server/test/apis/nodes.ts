// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import {
    nodesCreate,
    nodesGet,
    nodesPaginate,
    nodesRemove,
    nodesUpdate
} from '@shared/api/sdk.gen';
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
        const promise = nodesCreate({path, body});
        /**
         * Bug, can't disable 200 response from custom decorator
         */
        function is200() {}
        /**
         * Return a new Node
         */
        function is201() {}
        /**
         * TypeORM related errors
         */
        function is400() {}
        /**
         * TypeORM related constraint errors
         */
        function is409() {}

        return {...promise, is200, is201, is400, is409};
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/nodes/{nodeId}
     */
    function get(path: NodesGetData['path']) {
        const promise = nodesGet({path});
        /**
         * Return a Node by nodeId
         */
        function is200() {}
        /**
         * A Node with the specified nodeId was not found
         */
        function is404() {}

        return {...promise, is200, is404};
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/nodes
     */
    function paginate(path: NodesPaginateData['path']) {
        const promise = nodesPaginate({path});
        /**
         * Return a list of Node
         */
        function is200() {}

        return {...promise, is200};
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/nodes/{nodeId}
     */
    function remove(path: NodesRemoveData['path']) {
        const promise = nodesRemove({path});
        /**
         * The Node has been deleted
         */
        function is204() {}
        /**
         * A Node with the specified nodeId was not found
         */
        function is404() {}

        return {...promise, is204, is404};
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/nodes/{nodeId}
     */
    function update(
        path: NodesUpdateData['path'],
        body: NodesUpdateData['body']
    ) {
        const promise = nodesUpdate({path, body});
        /**
         * Return a Node by nodeId
         */
        function is200() {}
        /**
         * TypeORM related errors
         */
        function is400() {}
        /**
         * A Node with the specified nodeId was not found
         */
        function is404() {}
        /**
         * TypeORM related constraint errors
         */
        function is409() {}

        return {...promise, is200, is400, is404, is409};
    }

    return {create, get, paginate, remove, update};
}
