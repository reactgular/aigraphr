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
import {assertEntities} from '../generator/assert-entities';
import {assertObjects} from '../generator/assert-objects';

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
            return {...promise};
        }
        /**
         * Return a new Edge
         */
        function is201() {
            const objects = assertObjects<
                EdgesCreateResponses[201],
                ReturnType<typeof edgesCreate>
            >(promise);
            const entities = assertEntities<
                EdgesCreateResponses[201],
                ReturnType<typeof edgesCreate>
            >(promise);
            return {...promise, ...objects, ...entities};
        }
        /**
         * TypeORM related errors
         */
        function is400() {
            const objects = assertObjects<
                EdgesCreateErrors[400],
                ReturnType<typeof edgesCreate>
            >(promise);
            return {...promise, ...objects};
        }
        /**
         * TypeORM related constraint errors
         */
        function is409() {
            const objects = assertObjects<
                EdgesCreateErrors[409],
                ReturnType<typeof edgesCreate>
            >(promise);
            return {...promise, ...objects};
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
            const objects = assertObjects<
                EdgesGetResponses[200],
                ReturnType<typeof edgesGet>
            >(promise);
            const entities = assertEntities<
                EdgesGetResponses[200],
                ReturnType<typeof edgesGet>
            >(promise);
            return {...promise, ...objects, ...entities};
        }
        /**
         * A Edge with the specified edgeId was not found
         */
        function is404() {
            return {...promise};
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
            const objects = assertObjects<
                EdgesPaginateResponses[200],
                ReturnType<typeof edgesPaginate>
            >(promise);
            const entities = assertEntities<
                EdgesPaginateResponses[200],
                ReturnType<typeof edgesPaginate>
            >(promise);
            return {...promise, ...objects, ...entities};
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
            return {...promise};
        }
        /**
         * A Edge with the specified edgeId was not found
         */
        function is404() {
            return {...promise};
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
            const objects = assertObjects<
                EdgesUpdateResponses[200],
                ReturnType<typeof edgesUpdate>
            >(promise);
            const entities = assertEntities<
                EdgesUpdateResponses[200],
                ReturnType<typeof edgesUpdate>
            >(promise);
            return {...promise, ...objects, ...entities};
        }
        /**
         * TypeORM related errors
         */
        function is400() {
            const objects = assertObjects<
                EdgesUpdateErrors[400],
                ReturnType<typeof edgesUpdate>
            >(promise);
            return {...promise, ...objects};
        }
        /**
         * A Edge with the specified edgeId was not found
         */
        function is404() {
            return {...promise};
        }
        /**
         * TypeORM related constraint errors
         */
        function is409() {
            const objects = assertObjects<
                EdgesUpdateErrors[409],
                ReturnType<typeof edgesUpdate>
            >(promise);
            return {...promise, ...objects};
        }

        return {...promise, is200, is400, is404, is409};
    }

    return {create, get, paginate, remove, update};
}
