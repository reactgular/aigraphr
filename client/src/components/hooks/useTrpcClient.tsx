import {trpc} from '@/trpc';
import {httpBatchLink} from '@trpc/client';
import {useMemo} from 'react';

export const useTrpcClient = () => {
    return useMemo(
        () =>
            trpc.createClient({
                links: [
                    httpBatchLink({
                        url: 'http://localhost:3000/trpc',
                        async headers() {
                            return {
                                authorization: 'xxx'
                            };
                        }
                    })
                ]
            }),
        []
    );
};
