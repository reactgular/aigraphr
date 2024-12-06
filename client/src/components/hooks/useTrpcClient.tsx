import {trpc} from '@/components/hooks/trpc';
import {httpBatchLink} from '@trpc/client';
import {useMemo} from 'react';

export const useTrpcClient = () => {
    return useMemo(
        () =>
            trpc.createClient({
                links: [
                    httpBatchLink({
                        // @todo this should be configurable, and the /trpc part should be from the shared config
                        url: 'http://localhost:3000/trpc',
                        async headers() {
                            return {
                                // @todo this should be configurable
                                authorization: 'xxx'
                            };
                        }
                    })
                ]
            }),
        []
    );
};
