// This file is auto-generated by @hey-api/openapi-ts

import type {Options} from '@hey-api/client-fetch';
import {
    type UseMutationOptions,
    type DefaultError,
    queryOptions
} from '@tanstack/react-query';
import type {
    AppControllerRemoveData,
    AppControllerRemoveResponse,
    AppControllerGetHelloData,
    AppControllerPatchData,
    AppControllerPatchResponse,
    AppControllerCreateData,
    AppControllerCreateResponse,
    AppControllerPutData,
    AppControllerPutResponse,
    ProjectsInstancesControllerRemoveAllData,
    ProjectsInstancesControllerIndexData,
    ProjectsInstancesControllerCreateData,
    ProjectsInstancesControllerCreateResponse,
    ProjectsInstancesControllerRemoveData,
    ProjectsInstancesControllerGetData,
    ProjectsFilesControllerIndexData,
    ProjectsFilesControllerCreateData,
    ProjectsFilesControllerCreateResponse,
    ProjectsFilesControllerGetData
} from '../types.gen';
import {
    appControllerRemove,
    client,
    appControllerGetHello,
    appControllerPatch,
    appControllerCreate,
    appControllerPut,
    projectsInstancesControllerRemoveAll,
    projectsInstancesControllerIndex,
    projectsInstancesControllerCreate,
    projectsInstancesControllerRemove,
    projectsInstancesControllerGet,
    projectsFilesControllerIndex,
    projectsFilesControllerCreate,
    projectsFilesControllerGet
} from '../sdk.gen';

export const appControllerRemoveMutation = (
    options?: Partial<Options<AppControllerRemoveData>>
) => {
    const mutationOptions: UseMutationOptions<
        AppControllerRemoveResponse,
        DefaultError,
        Options<AppControllerRemoveData>
    > = {
        mutationFn: async (localOptions) => {
            const {data} = await appControllerRemove({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

type QueryKey<TOptions extends Options> = [
    Pick<TOptions, 'baseUrl' | 'body' | 'headers' | 'path' | 'query'> & {
        _id: string;
        _infinite?: boolean;
    }
];

const createQueryKey = <TOptions extends Options>(
    id: string,
    options?: TOptions,
    infinite?: boolean
): QueryKey<TOptions>[0] => {
    const params: QueryKey<TOptions>[0] = {
        _id: id,
        baseUrl: (options?.client ?? client).getConfig().baseUrl
    } as QueryKey<TOptions>[0];
    if (infinite) {
        params._infinite = infinite;
    }
    if (options?.body) {
        params.body = options.body;
    }
    if (options?.headers) {
        params.headers = options.headers;
    }
    if (options?.path) {
        params.path = options.path;
    }
    if (options?.query) {
        params.query = options.query;
    }
    return params;
};

export const appControllerGetHelloQueryKey = (
    options?: Options<AppControllerGetHelloData>
) => [createQueryKey('appControllerGetHello', options)];

export const appControllerGetHelloOptions = (
    options?: Options<AppControllerGetHelloData>
) => {
    return queryOptions({
        queryFn: async ({queryKey, signal}) => {
            const {data} = await appControllerGetHello({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: appControllerGetHelloQueryKey(options)
    });
};

export const appControllerPatchMutation = (
    options?: Partial<Options<AppControllerPatchData>>
) => {
    const mutationOptions: UseMutationOptions<
        AppControllerPatchResponse,
        DefaultError,
        Options<AppControllerPatchData>
    > = {
        mutationFn: async (localOptions) => {
            const {data} = await appControllerPatch({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const appControllerCreateQueryKey = (
    options?: Options<AppControllerCreateData>
) => [createQueryKey('appControllerCreate', options)];

export const appControllerCreateOptions = (
    options?: Options<AppControllerCreateData>
) => {
    return queryOptions({
        queryFn: async ({queryKey, signal}) => {
            const {data} = await appControllerCreate({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: appControllerCreateQueryKey(options)
    });
};

export const appControllerCreateMutation = (
    options?: Partial<Options<AppControllerCreateData>>
) => {
    const mutationOptions: UseMutationOptions<
        AppControllerCreateResponse,
        DefaultError,
        Options<AppControllerCreateData>
    > = {
        mutationFn: async (localOptions) => {
            const {data} = await appControllerCreate({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const appControllerPutMutation = (
    options?: Partial<Options<AppControllerPutData>>
) => {
    const mutationOptions: UseMutationOptions<
        AppControllerPutResponse,
        DefaultError,
        Options<AppControllerPutData>
    > = {
        mutationFn: async (localOptions) => {
            const {data} = await appControllerPut({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const projectsInstancesControllerRemoveAllMutation = (
    options?: Partial<Options<ProjectsInstancesControllerRemoveAllData>>
) => {
    const mutationOptions: UseMutationOptions<
        unknown,
        DefaultError,
        Options<ProjectsInstancesControllerRemoveAllData>
    > = {
        mutationFn: async (localOptions) => {
            const {data} = await projectsInstancesControllerRemoveAll({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const projectsInstancesControllerIndexQueryKey = (
    options?: Options<ProjectsInstancesControllerIndexData>
) => [createQueryKey('projectsInstancesControllerIndex', options)];

export const projectsInstancesControllerIndexOptions = (
    options?: Options<ProjectsInstancesControllerIndexData>
) => {
    return queryOptions({
        queryFn: async ({queryKey, signal}) => {
            const {data} = await projectsInstancesControllerIndex({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: projectsInstancesControllerIndexQueryKey(options)
    });
};

export const projectsInstancesControllerCreateQueryKey = (
    options?: Options<ProjectsInstancesControllerCreateData>
) => [createQueryKey('projectsInstancesControllerCreate', options)];

export const projectsInstancesControllerCreateOptions = (
    options?: Options<ProjectsInstancesControllerCreateData>
) => {
    return queryOptions({
        queryFn: async ({queryKey, signal}) => {
            const {data} = await projectsInstancesControllerCreate({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: projectsInstancesControllerCreateQueryKey(options)
    });
};

export const projectsInstancesControllerCreateMutation = (
    options?: Partial<Options<ProjectsInstancesControllerCreateData>>
) => {
    const mutationOptions: UseMutationOptions<
        ProjectsInstancesControllerCreateResponse,
        DefaultError,
        Options<ProjectsInstancesControllerCreateData>
    > = {
        mutationFn: async (localOptions) => {
            const {data} = await projectsInstancesControllerCreate({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const projectsInstancesControllerRemoveMutation = (
    options?: Partial<Options<ProjectsInstancesControllerRemoveData>>
) => {
    const mutationOptions: UseMutationOptions<
        unknown,
        DefaultError,
        Options<ProjectsInstancesControllerRemoveData>
    > = {
        mutationFn: async (localOptions) => {
            const {data} = await projectsInstancesControllerRemove({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const projectsInstancesControllerGetQueryKey = (
    options?: Options<ProjectsInstancesControllerGetData>
) => [createQueryKey('projectsInstancesControllerGet', options)];

export const projectsInstancesControllerGetOptions = (
    options?: Options<ProjectsInstancesControllerGetData>
) => {
    return queryOptions({
        queryFn: async ({queryKey, signal}) => {
            const {data} = await projectsInstancesControllerGet({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: projectsInstancesControllerGetQueryKey(options)
    });
};

export const projectsFilesControllerIndexQueryKey = (
    options?: Options<ProjectsFilesControllerIndexData>
) => [createQueryKey('projectsFilesControllerIndex', options)];

export const projectsFilesControllerIndexOptions = (
    options?: Options<ProjectsFilesControllerIndexData>
) => {
    return queryOptions({
        queryFn: async ({queryKey, signal}) => {
            const {data} = await projectsFilesControllerIndex({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: projectsFilesControllerIndexQueryKey(options)
    });
};

export const projectsFilesControllerCreateQueryKey = (
    options?: Options<ProjectsFilesControllerCreateData>
) => [createQueryKey('projectsFilesControllerCreate', options)];

export const projectsFilesControllerCreateOptions = (
    options?: Options<ProjectsFilesControllerCreateData>
) => {
    return queryOptions({
        queryFn: async ({queryKey, signal}) => {
            const {data} = await projectsFilesControllerCreate({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: projectsFilesControllerCreateQueryKey(options)
    });
};

export const projectsFilesControllerCreateMutation = (
    options?: Partial<Options<ProjectsFilesControllerCreateData>>
) => {
    const mutationOptions: UseMutationOptions<
        ProjectsFilesControllerCreateResponse,
        DefaultError,
        Options<ProjectsFilesControllerCreateData>
    > = {
        mutationFn: async (localOptions) => {
            const {data} = await projectsFilesControllerCreate({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const projectsFilesControllerGetQueryKey = (
    options: Options<ProjectsFilesControllerGetData>
) => [createQueryKey('projectsFilesControllerGet', options)];

export const projectsFilesControllerGetOptions = (
    options: Options<ProjectsFilesControllerGetData>
) => {
    return queryOptions({
        queryFn: async ({queryKey, signal}) => {
            const {data} = await projectsFilesControllerGet({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: projectsFilesControllerGetQueryKey(options)
    });
};