import {workspacesCreate} from '@shared/api/sdk.gen';
import {
    WorkspaceDto,
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

export function fetchApiParamsBody<
    TPath,
    TBody,
    TQuery,
    TCodes extends Record<string, (param: any[]) => void> = Record<
        string,
        (param: any[]) => void
    >
>(fetcher: unknown, codes: TCodes) {
    return (path: TPath, body: TBody, query?: TQuery) => {
        const expectations = [];
        return new Promise((resolver) => {
            // call the fetcher and test expectations
        });
    };
}

const test = fetchApiParamsBody<
    WorkspacesCreateData['path'],
    WorkspacesCreateData['body'],
    WorkspacesCreateData['query']
>(workspacesCreate, {
    _200: createResponseExpects(200)
});

export type WorkspacesPaginateResponses = {
    200: WorkspaceDto;
};

function createResponseExpects<
    TResponses,
    TCode extends Extract<keyof TResponses, number>
>(code: TCode): {[P in `is${TCode}`]: null} {
    return {
        [`is${code}`]: null
    } as {[P in `is${TCode}`]: null};
}

const x = {
    ...createResponseExpects<WorkspacesCreateResponses, 200>(200),
    ...createResponseExpects<WorkspacesCreateResponses, 201>(201)
};
console.log(x.is200, x.is201);
