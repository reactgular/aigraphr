import type {FC, PropsWithChildren} from 'react';

export const GrNodeFrame: FC<PropsWithChildren> = ({children}) => {
    return <div className="border border-4 border-red-500">{children}</div>;
};
