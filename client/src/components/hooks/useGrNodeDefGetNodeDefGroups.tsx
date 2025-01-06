import {
    type GrNodeDefDto,
    grNodeDefGetNodeDefGroups,
    type GrNodeDefGroupDto
} from '@/api';
import {grNodeDefGetNodeDefGroupsQueryKey} from '@/api/@tanstack/react-query.gen';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query';

interface NodeDefModel {
    readonly groups: Record<string, Readonly<GrNodeDefGroupDto>>;

    readonly groupsIndex: ReadonlyArray<string>;

    readonly nodes: Record<string, Readonly<GrNodeDefDto>>;

    readonly nodesIndex: ReadonlyArray<string>;
}

const toModel = (data: GrNodeDefGroupDto[]): NodeDefModel => {
    const groups: Record<string, GrNodeDefGroupDto> = data.reduce(
        (acc, group) => {
            acc[group.name] = group;
            return acc;
        },
        {} as Record<string, GrNodeDefGroupDto>
    );

    const allNodes = data.map((group) => group.nodes).flat();

    const nodes = allNodes.reduce(
        (acc, node) => {
            acc[node.type] = node;
            return acc;
        },
        {} as Record<string, GrNodeDefDto>
    );

    const nodesIndex = allNodes.map((node) => `${node.group}:${node.type}`);

    return {
        groups,
        groupsIndex: data.map((group) => group.name),
        nodes,
        nodesIndex
    };
};

export const useGrNodeDefGetNodeDefGroups = () => {
    const {data} = useSuspenseQuery(
        queryOptions({
            queryFn: async ({queryKey, signal}) => {
                const {data} = await grNodeDefGetNodeDefGroups({
                    ...queryKey[0],
                    signal,
                    throwOnError: true
                });
                return toModel(data);
            },
            queryKey: grNodeDefGetNodeDefGroupsQueryKey({}),
            gcTime: Infinity
        })
    );
    return data;
};
