// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import {
    projectsCreate,
    projectsCreateValidate,
    projectsGet,
    projectsPaginate,
    projectsRemove,
    projectsUpdate,
    projectsUpdateValidate
} from '@shared/api/sdk.gen';
import {
    ProjectsCreateData,
    ProjectsCreateErrors,
    ProjectsCreateResponses,
    ProjectsCreateValidateData,
    ProjectsCreateValidateErrors,
    ProjectsCreateValidateResponses,
    ProjectsGetData,
    ProjectsGetErrors,
    ProjectsGetResponses,
    ProjectsPaginateData,
    ProjectsPaginateResponses,
    ProjectsRemoveData,
    ProjectsRemoveErrors,
    ProjectsRemoveResponses,
    ProjectsUpdateData,
    ProjectsUpdateErrors,
    ProjectsUpdateResponses,
    ProjectsUpdateValidateData,
    ProjectsUpdateValidateErrors,
    ProjectsUpdateValidateResponses
} from '@shared/api/types.gen';
import {assetEntity} from '../generator/asset-entity';

export function projects() {
    /**
     * /api/projects
     */
    function create(body: ProjectsCreateData['body']) {
        const promise = projectsCreate({body});
        /**
         * Bug, can't disable 200 response from custom decorator
         */
        function is200() {
            return {...promise};
        }
        /**
         * Return a new Project
         */
        function is201() {
            return {...promise};
        }
        /**
         * TypeORM related errors
         */
        function is400() {
            return {...promise};
        }
        /**
         * TypeORM related constraint errors
         */
        function is409() {
            return {...promise};
        }

        return {...promise, is200, is201, is400, is409};
    }

    /**
     * /api/projects/validates
     */
    function createValidate(body: ProjectsCreateValidateData['body']) {
        const promise = projectsCreateValidate({body});
        /**
         * Validation results of ProjectCreate
         */
        function is200() {
            return {...promise};
        }
        /**
         * Invalid request body
         */
        function is400() {
            return {...promise};
        }

        return {...promise, is200, is400};
    }

    /**
     * /api/projects/{projectId}
     */
    function get(path: ProjectsGetData['path']) {
        const promise = projectsGet({path});
        /**
         * Return a Project by projectId
         */
        function is200() {
            return {...promise};
        }
        /**
         * A Project with the specified projectId was not found
         */
        function is404() {
            return {...promise};
        }

        return {...promise, is200, is404};
    }

    /**
     * /api/projects
     */
    function paginate() {
        const promise = projectsPaginate({});
        /**
         * Return a list of Project
         */
        function is200() {
            return {...promise};
        }

        return {...promise, is200};
    }

    /**
     * /api/projects/{projectId}
     */
    function remove(path: ProjectsRemoveData['path']) {
        const promise = projectsRemove({path});
        /**
         *
         */
        function is200() {
            return {...promise};
        }
        /**
         * The Project has been deleted
         */
        function is204() {
            return {...promise};
        }
        /**
         * A Project with the specified projectId was not found
         */
        function is404() {
            return {...promise};
        }

        return {...promise, is200, is204, is404};
    }

    /**
     * /api/projects/{projectId}
     */
    function update(
        path: ProjectsUpdateData['path'],
        body: ProjectsUpdateData['body']
    ) {
        const promise = projectsUpdate({path, body});
        /**
         * Return a Project by projectId
         */
        function is200() {
            return {...promise};
        }
        /**
         * TypeORM related errors
         */
        function is400() {
            return {...promise};
        }
        /**
         * A Project with the specified projectId was not found
         */
        function is404() {
            return {...promise};
        }
        /**
         * TypeORM related constraint errors
         */
        function is409() {
            return {...promise};
        }

        return {...promise, is200, is400, is404, is409};
    }

    /**
     * /api/projects/{projectId}/validates
     */
    function updateValidate(
        path: ProjectsUpdateValidateData['path'],
        body: ProjectsUpdateValidateData['body']
    ) {
        const promise = projectsUpdateValidate({path, body});
        /**
         * Validation results of ProjectUpdate
         */
        function is200() {
            return {...promise};
        }
        /**
         * Invalid request body
         */
        function is400() {
            return {...promise};
        }
        /**
         * A ProjectUpdate with the specified projectId was not found
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
