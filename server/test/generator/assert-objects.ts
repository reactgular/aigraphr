export function assertObjects<
    TBody extends {
        id: number;
    },
    TChain
>(chain: TChain) {
    const isPartial = (value: TBody) => {
        // we lose the other assertions here
        return chain;
    };
    return {isPartial};
}
