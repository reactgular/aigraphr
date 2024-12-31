import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/shadcn/ui/avatar';
import type {FC} from 'react';

const USER = {
    name: 'Nick Foscarini',
    email: 'nick@nickfoscarini.com',
    avatar: '/avatars/shadcn.jpg'
};

export const UserInfo: FC = () => {
    return (
        <>
            <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={USER.avatar} alt={USER.name} />
                <AvatarFallback className="rounded-lg">NF</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{USER.name}</span>
                <span className="truncate text-xs">{USER.email}</span>
            </div>
        </>
    );
};
