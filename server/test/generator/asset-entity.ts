export function assetEntity<
    TBody extends {
        id: number;
    },
    TPromise
>(promise: TPromise) {
    const isId = (value: number) => {
        return {...promise, isId, isBody, isPartial, isBodyWithoutId};
    };
    const isBody = (value: TBody) => {
        return {...promise, isId, isBody, isPartial, isBodyWithoutId};
    };
    const isPartial = (value: TBody) => {
        return {...promise, isId, isBody, isPartial, isBodyWithoutId};
    };
    const isBodyWithoutId = (value: Omit<TBody, 'id'>) => {
        return {...promise, isId, isBody, isBodyWithoutId};
    };
    return {isId, isBody, isPartial, isBodyWithoutId};
}
