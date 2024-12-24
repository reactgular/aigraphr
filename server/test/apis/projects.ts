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
import {assertEntity} from '../generator/assert-entity';
import {assertObject} from '../generator/assert-object';

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
            const objects = assertObject<
                ProjectsCreateResponses[201],
                ReturnType<typeof projectsCreate>
            >(promise);
            return {...promise, ...objects};
        }
        /**
         * TypeORM related errors
         */
        function is400() {
            const objects = assertObject<
                ProjectsCreateErrors[400],
                ReturnType<typeof projectsCreate>
            >(promise);
            return {...promise, ...objects};
        }
        /**
         * TypeORM related constraint errors
         */
        function is409() {
            const objects = assertObject<
                ProjectsCreateErrors[409],
                ReturnType<typeof projectsCreate>
            >(promise);
            return {...promise, ...objects};
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
            const objects = assertObject<
                ProjectsCreateValidateResponses[200],
                ReturnType<typeof projectsCreateValidate>
            >(promise);
            return {...promise, ...objects};
        }
        /**
         * Invalid request body
         */
        function is400() {
            const objects = assertObject<
                ProjectsCreateValidateErrors[400],
                ReturnType<typeof projectsCreateValidate>
            >(promise);
            return {...promise, ...objects};
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
            const objects = assertObject<
                ProjectsGetResponses[200],
                ReturnType<typeof projectsGet>
            >(promise);
            return {...promise, ...objects};
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
            const objects = assertObject<
                ProjectsPaginateResponses[200],
                ReturnType<typeof projectsPaginate>
            >(promise);
            return {...promise, ...objects};
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
            const objects = assertObject<
                ProjectsRemoveResponses[200],
                ReturnType<typeof projectsRemove>
            >(promise);
            return {...promise, ...objects};
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
            const objects = assertObject<
                ProjectsUpdateResponses[200],
                ReturnType<typeof projectsUpdate>
            >(promise);
            return {...promise, ...objects};
        }
        /**
         * TypeORM related errors
         */
        function is400() {
            const objects = assertObject<
                ProjectsUpdateErrors[400],
                ReturnType<typeof projectsUpdate>
            >(promise);
            return {...promise, ...objects};
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
            const objects = assertObject<
                ProjectsUpdateErrors[409],
                ReturnType<typeof projectsUpdate>
            >(promise);
            return {...promise, ...objects};
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
            const objects = assertObject<
                ProjectsUpdateValidateResponses[200],
                ReturnType<typeof projectsUpdateValidate>
            >(promise);
            return {...promise, ...objects};
        }
        /**
         * Invalid request body
         */
        function is400() {
            const objects = assertObject<
                ProjectsUpdateValidateErrors[400],
                ReturnType<typeof projectsUpdateValidate>
            >(promise);
            return {...promise, ...objects};
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
