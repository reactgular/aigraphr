import type {FC, PropsWithChildren} from 'react';

export const GrNodeFrame: FC<PropsWithChildren> = ({children}) => {
    return <div className="border rounded-md">{children}</div>;
};
