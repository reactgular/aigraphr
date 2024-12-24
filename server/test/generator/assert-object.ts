export function assertObject<
    TBody extends {
        id: number;
    },
    TPromise
>(promise: TPromise) {
    const isPartial = (value: TBody) => {
        // we lose the other assertions here
        return {...promise, isPartial};
    };
    return {isPartial};
}
