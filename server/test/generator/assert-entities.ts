export function assertEntities<
    TBody extends {
        id: number;
    },
    TPromise
>(promise: TPromise) {
    const isId = (value: number) => {
        return {...promise, isId, isEntity, isWithoutId};
    };
    const isEntity = (value: TBody) => {
        return {...promise, isId, isEntity, isWithoutId};
    };
    const isWithoutId = (value: Omit<TBody, 'id'>) => {
        return {...promise, isId, isEntity, isWithoutId};
    };
    return {...promise, isId, isEntity, isWithoutId};
}
