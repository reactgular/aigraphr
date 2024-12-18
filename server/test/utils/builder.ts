import {workspacesGet} from '@shared/api/sdk.gen';
import {
    WorkspacesGetData,
    WorkspacesGetErrors,
    WorkspacesGetResponses
} from '@shared/api/types.gen';

interface DataShape {
    body?: unknown;

    headers?: unknown;

    path?: unknown;

    query?: unknown;

    url: string;
}

export function builder<
    TData extends DataShape,
    TResponses extends Record<number, unknown>,
    TErrors = never
>(fetch: unknown) {
    return (path: TData['path']) => {
        const expects = [];
        const promise = new Promise((resolver) => {
            //
        });

        function status<StatusCode extends keyof TResponses>(code: StatusCode) {
            expects.push(() => {
                // asset the status code
            });

            const body = (data: TResponses[StatusCode]) => {
                expects.push(() => {
                    // assert the body
                });
                return {
                    ...promise,
                    body
                };
            };

            return {
                ...promise,
                body
            };
        }

        return {...promise, status};
    };
}

const get = builder<
    WorkspacesGetData,
    WorkspacesGetResponses,
    WorkspacesGetErrors
>(workspacesGet);

get({
    projectId: 1,
    workspaceId: 2
})
    .status(200)
    .body({
        id: 2,
        name: 'test',
        description: 'A test workspace',
        engine: 'javascript'
    })
    .then();

export const api = {
    workspaces: {
        get: builder<
            WorkspacesGetData,
            WorkspacesGetResponses,
            WorkspacesGetErrors
        >(workspacesGet)
    }
};
