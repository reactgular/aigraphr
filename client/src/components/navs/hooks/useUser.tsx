import {useMemo} from 'react';

export interface UserDesc {
    avatar: string;

    email: string;

    name: string;
}

export const useUser = (): UserDesc => {
    return useMemo(
        () => ({
            name: 'shadcn',
            email: 'm@example.com',
            avatar: '/avatars/shadcn.jpg'
        }),
        []
    );
};
