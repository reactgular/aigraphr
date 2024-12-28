import type {FC, PropsWithChildren} from 'react';

export const UiContainer: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="flex flex-col mx-auto w-full max-w-6xl py-10 gap-5">
            {children}
        </div>
    );
};
