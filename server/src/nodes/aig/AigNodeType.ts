const core = 1000;

export const AigNodeTypeToId = {
    'core/if-then-else': core + 10,
    'core/constant': core + 20,
    'core/object': core + 30
};

export type AigNodeType = keyof typeof AigNodeTypeToId;

export const AigNodeIdToType: Record<number, AigNodeType> = Object.fromEntries(
    Object.entries(AigNodeTypeToId).map(([key, value]) => [value, key])
) as Record<number, AigNodeType>;
