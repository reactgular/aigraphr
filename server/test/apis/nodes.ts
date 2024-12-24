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
    NodesCreateErrors,
    NodesCreateResponses,
    NodesGetData,
    NodesGetErrors,
    NodesGetResponses,
    NodesPaginateData,
    NodesPaginateResponses,
    NodesRemoveData,
    NodesRemoveErrors,
    NodesRemoveResponses,
    NodesUpdateData,
    NodesUpdateErrors,
    NodesUpdateResponses
} from '@shared/api/types.gen';
import {assetEntity} from '../generator/asset-entity';

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
        function is200() {
            const entity = assetEntity<
                NodesCreateResponses[200],
                ReturnType<typeof nodesCreate>
            >(promise);
            return {...promise, entity};
        }
        /**
         * Return a new Node
         */
        function is201() {
            const entity = assetEntity<
                NodesCreateResponses[201],
                ReturnType<typeof nodesCreate>
            >(promise);
            return {...promise, entity};
        }
        /**
         * TypeORM related errors
         */
        function is400() {
            const entity = assetEntity<
                NodesCreateErrors[400],
                ReturnType<typeof nodesCreate>
            >(promise);
            return {...promise, entity};
        }
        /**
         * TypeORM related constraint errors
         */
        function is409() {
            const entity = assetEntity<
                NodesCreateErrors[409],
                ReturnType<typeof nodesCreate>
            >(promise);
            return {...promise, entity};
        }

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
        function is200() {
            const entity = assetEntity<
                NodesGetResponses[200],
                ReturnType<typeof nodesGet>
            >(promise);
            return {...promise, entity};
        }
        /**
         * A Node with the specified nodeId was not found
         */
        function is404() {
            const entity = assetEntity<
                NodesGetErrors[404],
                ReturnType<typeof nodesGet>
            >(promise);
            return {...promise, entity};
        }

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
        function is200() {
            const entity = assetEntity<
                NodesPaginateResponses[200],
                ReturnType<typeof nodesPaginate>
            >(promise);
            return {...promise, entity};
        }

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
        function is204() {
            const entity = assetEntity<
                NodesRemoveResponses[204],
                ReturnType<typeof nodesRemove>
            >(promise);
            return {...promise, entity};
        }
        /**
         * A Node with the specified nodeId was not found
         */
        function is404() {
            const entity = assetEntity<
                NodesRemoveErrors[404],
                ReturnType<typeof nodesRemove>
            >(promise);
            return {...promise, entity};
        }

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
        function is200() {
            const entity = assetEntity<
                NodesUpdateResponses[200],
                ReturnType<typeof nodesUpdate>
            >(promise);
            return {...promise, entity};
        }
        /**
         * TypeORM related errors
         */
        function is400() {
            const entity = assetEntity<
                NodesUpdateErrors[400],
                ReturnType<typeof nodesUpdate>
            >(promise);
            return {...promise, entity};
        }
        /**
         * A Node with the specified nodeId was not found
         */
        function is404() {
            const entity = assetEntity<
                NodesUpdateErrors[404],
                ReturnType<typeof nodesUpdate>
            >(promise);
            return {...promise, entity};
        }
        /**
         * TypeORM related constraint errors
         */
        function is409() {
            const entity = assetEntity<
                NodesUpdateErrors[409],
                ReturnType<typeof nodesUpdate>
            >(promise);
            return {...promise, entity};
        }

        return {...promise, is200, is400, is404, is409};
    }

    return {create, get, paginate, remove, update};
}
