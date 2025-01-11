import type {FC, PropsWithChildren} from 'react';

export const combineProviders = (
    ...providers: Array<FC<PropsWithChildren>>
): FC<PropsWithChildren> => {
    return providers.reduce<FC<PropsWithChildren>>(
        (AccumulatedProviders, CurrentProvider) => {
            const Component: FC<PropsWithChildren> = ({children}) => (
                <AccumulatedProviders>
                    <CurrentProvider>{children}</CurrentProvider>
                </AccumulatedProviders>
            );
            Component.displayName = 'CombinedProviders';
            return Component;
        },
        ({children}) => <>{children}</>
    );
};
