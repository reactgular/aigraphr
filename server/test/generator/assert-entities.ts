export function assertEntities<
    TBody extends {
        id: number;
    },
    TChain
>(chain: () => TChain) {
    const isId = (value: number) => {
        return chain();
    };
    const isEntity = (value: TBody) => {
        return chain();
    };
    const isWithoutId = (value: Omit<TBody, 'id'>) => {
        return chain();
    };
    return {isId, isEntity, isWithoutId};
}
