// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import {
    workspacesCreate,
    workspacesCreateValidate,
    workspacesGet,
    workspacesPaginate,
    workspacesRemove,
    workspacesUpdate,
    workspacesUpdateValidate
} from '@shared/api/sdk.gen';
import {
    WorkspacesCreateData,
    WorkspacesCreateErrors,
    WorkspacesCreateResponses,
    WorkspacesCreateValidateData,
    WorkspacesCreateValidateErrors,
    WorkspacesCreateValidateResponses,
    WorkspacesGetData,
    WorkspacesGetErrors,
    WorkspacesGetResponses,
    WorkspacesPaginateData,
    WorkspacesPaginateResponses,
    WorkspacesRemoveData,
    WorkspacesRemoveErrors,
    WorkspacesRemoveResponses,
    WorkspacesUpdateData,
    WorkspacesUpdateErrors,
    WorkspacesUpdateResponses,
    WorkspacesUpdateValidateData,
    WorkspacesUpdateValidateErrors,
    WorkspacesUpdateValidateResponses
} from '@shared/api/types.gen';
import {assertEntity} from '../generator/assert-entity';
import {assertObject} from '../generator/assert-object';

export function workspaces() {
    /**
     * /api/projects/{projectId}/workspaces
     */
    function create(
        path: WorkspacesCreateData['path'],
        body: WorkspacesCreateData['body']
    ) {
        const promise = workspacesCreate({path, body});
        /**
         * Bug, can't disable 200 response from custom decorator
         */
        function is200() {
            return {...promise};
        }
        /**
         * Return a new Workspace
         */
        function is201() {
            const objects = assertObject<
                WorkspacesCreateResponses[201],
                ReturnType<typeof workspacesCreate>
            >(promise);
            return {...promise, ...objects};
        }
        /**
         * TypeORM related errors
         */
        function is400() {
            const objects = assertObject<
                WorkspacesCreateErrors[400],
                ReturnType<typeof workspacesCreate>
            >(promise);
            return {...promise, ...objects};
        }
        /**
         * TypeORM related constraint errors
         */
        function is409() {
            const objects = assertObject<
                WorkspacesCreateErrors[409],
                ReturnType<typeof workspacesCreate>
            >(promise);
            return {...promise, ...objects};
        }

        return {...promise, is200, is201, is400, is409};
    }

    /**
     * /api/projects/{projectId}/workspaces/validates
     */
    function createValidate(body: WorkspacesCreateValidateData['body']) {
        const promise = workspacesCreateValidate({body});
        /**
         * Validation results of WorkspaceCreate
         */
        function is200() {
            const objects = assertObject<
                WorkspacesCreateValidateResponses[200],
                ReturnType<typeof workspacesCreateValidate>
            >(promise);
            return {...promise, ...objects};
        }
        /**
         * Invalid request body
         */
        function is400() {
            const objects = assertObject<
                WorkspacesCreateValidateErrors[400],
                ReturnType<typeof workspacesCreateValidate>
            >(promise);
            return {...promise, ...objects};
        }

        return {...promise, is200, is400};
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}
     */
    function get(path: WorkspacesGetData['path']) {
        const promise = workspacesGet({path});
        /**
         * Return a Workspace by workspaceId
         */
        function is200() {
            const objects = assertObject<
                WorkspacesGetResponses[200],
                ReturnType<typeof workspacesGet>
            >(promise);
            return {...promise, ...objects};
        }
        /**
         * A Workspace with the specified workspaceId was not found
         */
        function is404() {
            return {...promise};
        }

        return {...promise, is200, is404};
    }

    /**
     * /api/projects/{projectId}/workspaces
     */
    function paginate(path: WorkspacesPaginateData['path']) {
        const promise = workspacesPaginate({path});
        /**
         * Return a list of Workspace
         */
        function is200() {
            const objects = assertObject<
                WorkspacesPaginateResponses[200],
                ReturnType<typeof workspacesPaginate>
            >(promise);
            return {...promise, ...objects};
        }

        return {...promise, is200};
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}
     */
    function remove(path: WorkspacesRemoveData['path']) {
        const promise = workspacesRemove({path});
        /**
         * The Workspace has been deleted
         */
        function is204() {
            return {...promise};
        }
        /**
         * A Workspace with the specified workspaceId was not found
         */
        function is404() {
            return {...promise};
        }

        return {...promise, is204, is404};
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}
     */
    function update(
        path: WorkspacesUpdateData['path'],
        body: WorkspacesUpdateData['body']
    ) {
        const promise = workspacesUpdate({path, body});
        /**
         * Return a Workspace by workspaceId
         */
        function is200() {
            const objects = assertObject<
                WorkspacesUpdateResponses[200],
                ReturnType<typeof workspacesUpdate>
            >(promise);
            return {...promise, ...objects};
        }
        /**
         * TypeORM related errors
         */
        function is400() {
            const objects = assertObject<
                WorkspacesUpdateErrors[400],
                ReturnType<typeof workspacesUpdate>
            >(promise);
            return {...promise, ...objects};
        }
        /**
         * A Workspace with the specified workspaceId was not found
         */
        function is404() {
            return {...promise};
        }
        /**
         * TypeORM related constraint errors
         */
        function is409() {
            const objects = assertObject<
                WorkspacesUpdateErrors[409],
                ReturnType<typeof workspacesUpdate>
            >(promise);
            return {...promise, ...objects};
        }

        return {...promise, is200, is400, is404, is409};
    }

    /**
     * /api/projects/{projectId}/workspaces/{workspaceId}/validates
     */
    function updateValidate(
        path: WorkspacesUpdateValidateData['path'],
        body: WorkspacesUpdateValidateData['body']
    ) {
        const promise = workspacesUpdateValidate({path, body});
        /**
         * Validation results of WorkspaceUpdate
         */
        function is200() {
            const objects = assertObject<
                WorkspacesUpdateValidateResponses[200],
                ReturnType<typeof workspacesUpdateValidate>
            >(promise);
            return {...promise, ...objects};
        }
        /**
         * Invalid request body
         */
        function is400() {
            const objects = assertObject<
                WorkspacesUpdateValidateErrors[400],
                ReturnType<typeof workspacesUpdateValidate>
            >(promise);
            return {...promise, ...objects};
        }
        /**
         * A WorkspaceUpdate with the specified workspaceId was not found
         */
        function is404() {
            return {...promise};
        }

        return {...promise, is200, is400, is404};
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
