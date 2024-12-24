// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import {
    edgesCreate,
    edgesGet,
    edgesPaginate,
    edgesRemove,
    edgesUpdate
} from '@shared/api/sdk.gen';
import {
    EdgesCreateData,
    EdgesCreateErrors,
    EdgesCreateResponses,
    EdgesGetData,
    EdgesGetErrors,
    EdgesGetResponses,
    EdgesPaginateData,
    EdgesPaginateResponses,
    EdgesRemoveData,
    EdgesRemoveErrors,
    EdgesRemoveResponses,
    EdgesUpdateData,
    EdgesUpdateErrors,
    EdgesUpdateResponses
} from '@shared/api/types.gen';
import {assetEntity} from '../generator/asset-entity';

export function edges() {
    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/edges
     */
    function create(
        path: EdgesCreateData['path'],
        body: EdgesCreateData['body']
    ) {
        const promise = edgesCreate({path, body});
        /**
         * Bug, can't disable 200 response from custom decorator
         */
        function is200() {
            const entity = assetEntity<
                EdgesCreateResponses[200],
                ReturnType<typeof edgesCreate>
            >(promise);
            return {...promise, entity};
        }
        /**
         * Return a new Edge
         */
        function is201() {
            const entity = assetEntity<
                EdgesCreateResponses[201],
                ReturnType<typeof edgesCreate>
            >(promise);
            return {...promise, entity};
        }
        /**
         * TypeORM related errors
         */
        function is400() {
            const entity = assetEntity<
                EdgesCreateErrors[400],
                ReturnType<typeof edgesCreate>
            >(promise);
            return {...promise, entity};
        }
        /**
         * TypeORM related constraint errors
         */
        function is409() {
            const entity = assetEntity<
                EdgesCreateErrors[409],
                ReturnType<typeof edgesCreate>
            >(promise);
            return {...promise, entity};
        }

        return {...promise, is200, is201, is400, is409};
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/edges/{edgeId}
     */
    function get(path: EdgesGetData['path']) {
        const promise = edgesGet({path});
        /**
         * Return a Edge by edgeId
         */
        function is200() {
            const entity = assetEntity<
                EdgesGetResponses[200],
                ReturnType<typeof edgesGet>
            >(promise);
            return {...promise, entity};
        }
        /**
         * A Edge with the specified edgeId was not found
         */
        function is404() {
            const entity = assetEntity<
                EdgesGetErrors[404],
                ReturnType<typeof edgesGet>
            >(promise);
            return {...promise, entity};
        }

        return {...promise, is200, is404};
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/edges
     */
    function paginate(path: EdgesPaginateData['path']) {
        const promise = edgesPaginate({path});
        /**
         * Return a list of Edge
         */
        function is200() {
            const entity = assetEntity<
                EdgesPaginateResponses[200],
                ReturnType<typeof edgesPaginate>
            >(promise);
            return {...promise, entity};
        }

        return {...promise, is200};
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/edges/{edgeId}
     */
    function remove(path: EdgesRemoveData['path']) {
        const promise = edgesRemove({path});
        /**
         * The Edge has been deleted
         */
        function is204() {
            const entity = assetEntity<
                EdgesRemoveResponses[204],
                ReturnType<typeof edgesRemove>
            >(promise);
            return {...promise, entity};
        }
        /**
         * A Edge with the specified edgeId was not found
         */
        function is404() {
            const entity = assetEntity<
                EdgesRemoveErrors[404],
                ReturnType<typeof edgesRemove>
            >(promise);
            return {...promise, entity};
        }

        return {...promise, is204, is404};
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/edges/{edgeId}
     */
    function update(
        path: EdgesUpdateData['path'],
        body: EdgesUpdateData['body']
    ) {
        const promise = edgesUpdate({path, body});
        /**
         * Return a Edge by edgeId
         */
        function is200() {
            const entity = assetEntity<
                EdgesUpdateResponses[200],
                ReturnType<typeof edgesUpdate>
            >(promise);
            return {...promise, entity};
        }
        /**
         * TypeORM related errors
         */
        function is400() {
            const entity = assetEntity<
                EdgesUpdateErrors[400],
                ReturnType<typeof edgesUpdate>
            >(promise);
            return {...promise, entity};
        }
        /**
         * A Edge with the specified edgeId was not found
         */
        function is404() {
            const entity = assetEntity<
                EdgesUpdateErrors[404],
                ReturnType<typeof edgesUpdate>
            >(promise);
            return {...promise, entity};
        }
        /**
         * TypeORM related constraint errors
         */
        function is409() {
            const entity = assetEntity<
                EdgesUpdateErrors[409],
                ReturnType<typeof edgesUpdate>
            >(promise);
            return {...promise, entity};
        }

        return {...promise, is200, is400, is404, is409};
    }

    return {create, get, paginate, remove, update};
}
