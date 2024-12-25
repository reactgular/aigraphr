export function assertObjects<TBody extends object, TPromise>(
    promise: TPromise
) {
    function isKeyValue<TKey extends keyof TBody>(
        key: TKey,
        value: TBody[TKey]
    ) {
        return {...promise, isKeyValue, isPartial};
    }

    const isPartial = (value: Partial<TBody>) => {
        // we lose the other assertions here
        return {...promise, isKeyValue, isPartial};
    };
    return {...promise, isKeyValue, isPartial};
}
