import {QueryClient} from '@tanstack/react-query';
import {useMemo} from 'react';

export const useQueryClient = (): QueryClient => {
    return useMemo(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        throwOnError: true,
                        retry: false
                    }
                }
            }),
        []
    );
};
