import {
    createContext,
    type FC,
    type PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
    useState as useReactState
} from 'react';

interface CreateStateModel<TModel> {
    patch: (value: Partial<TModel>) => void;

    reset: () => void;

    set: (value: TModel) => void;

    state: TModel;
}

export function createStateProvider<TModel>(name: string) {
    const Context = createContext<CreateStateModel<TModel> | null>(null);
    Context.displayName = `${name}Context`;

    const Provider: FC<PropsWithChildren<{defaultValue: TModel}>> = ({
        defaultValue,
        children
    }) => {
        const [state, set] = useReactState(() => defaultValue);
        const reset = useCallback(() => set(defaultValue), [set, defaultValue]);
        const patch = useCallback(
            (value: Partial<TModel>) => set((prev) => ({...prev, ...value})),
            [set]
        );

        return (
            <Context.Provider value={{patch, reset, state, set}}>
                {children}
            </Context.Provider>
        );
    };
    Provider.displayName = `${name}Provider`;

    const useService = (): Omit<CreateStateModel<TModel>, 'state'> => {
        const value = useContext(Context);
        if (!value) {
            throw new Error(`useService must be used within a ${name}Provider`);
        }

        return useMemo(() => {
            return {reset: value.reset, set: value.set, patch: value.patch};
        }, [value.reset, value.set, value.patch]);
    };

    const useState = (): TModel => {
        const value = useContext(Context);
        if (!value) {
            throw new Error(`useState must be used within a ${name}Provider`);
        }
        return value.state;
    };

    return {Provider, useService, useState};
}
