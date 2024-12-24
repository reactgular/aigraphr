// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
import {
    ProjectsCreateData,
    ProjectsCreateValidateData,
    ProjectsGetData,
    ProjectsPaginateData,
    ProjectsRemoveData,
    ProjectsUpdateData,
    ProjectsUpdateValidateData
} from '@shared/api/types.gen';

export function projects() {
    /**
     * /api/projects
     */
    function create(body: ProjectsCreateData['body']) {
        // TODO: implement Create
    }

    /**
     * /api/projects/validates
     */
    function createValidate(body: ProjectsCreateValidateData['body']) {
        // TODO: implement CreateValidate
    }

    /**
     * /api/projects/{projectId}
     */
    function get(path: ProjectsGetData['path']) {
        // TODO: implement Get
    }

    /**
     * /api/projects
     */
    function paginate() {
        // TODO: implement Paginate
    }

    /**
     * /api/projects/{projectId}
     */
    function remove(path: ProjectsRemoveData['path']) {
        // TODO: implement Remove
    }

    /**
     * /api/projects/{projectId}
     */
    function update(
        path: ProjectsUpdateData['path'],
        body: ProjectsUpdateData['body']
    ) {
        // TODO: implement Update
    }

    /**
     * /api/projects/{projectId}/validates
     */
    function updateValidate(
        path: ProjectsUpdateValidateData['path'],
        body: ProjectsUpdateValidateData['body']
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
