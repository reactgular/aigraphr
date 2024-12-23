import {workspacesCreate} from '@shared/api/sdk.gen';
import {
    WorkspacesCreateData,
    WorkspacesCreateResponses
} from '@shared/api/types.gen';

export function fetchApi<TQuery, TFetcher>(fetcher: unknown) {
    return (query?: TQuery) => {
        const expectations = [];
        return new Promise((resolver) => {
            // call the fetcher and test expectations
        });
    };
}

export function fetchApiParams<TPath, TQuery>(fetcher: unknown) {
    return (path: TPath, query?: TQuery) => {
        const expectations = [];
        return new Promise((resolver) => {
            // call the fetcher and test expectations
        });
    };
}

export function fetchApiBody<TBody, TQuery>(fetcher: unknown) {
    return (body: TBody, query?: TQuery) => {
        const expectations = [];
        return new Promise((resolver) => {
            // call the fetcher and test expectations
        });
    };
}

export function fetchApiParamsBody<TPath, TBody, TQuery, TCodes>(
    fetcher: unknown,
    codes: TCodes
) {
    return (
        path: TPath,
        body: TBody,
        query?: TQuery
    ): Promise<unknown> & TCodes => {
        const expectations = [];
        const promise = new Promise((resolver) => {
            // call the fetcher and test expectations
        });
        return {...promise, ...codes};
    };
}

function status<TResponses, TCode extends Extract<keyof TResponses, number>>(
    code: TCode
): {[P in `is${TCode}`]: () => Promise<null>} {
    return {
        [`is${code}`]: async () => null
    } as {[P in `is${TCode}`]: () => Promise<null>};
}

const codes = {
    ...status<WorkspacesCreateResponses, 200>(200),
    ...status<WorkspacesCreateResponses, 201>(201)
};
const create = fetchApiParamsBody<
    WorkspacesCreateData['path'],
    WorkspacesCreateData['body'],
    WorkspacesCreateData['query'],
    typeof codes
>(workspacesCreate, codes);

(async function () {
    const resp = await create(
        {projectId: 1},
        {name: 'example', engine: 'javascript', description: 'description'}
    ).is200();
})().then();
