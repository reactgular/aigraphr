import type {NodeDto, NodesGetData} from '@/api';
import {nodesGetOptions} from '@/api/@tanstack/react-query.gen';
import {useSuspenseQuery} from '@tanstack/react-query';

export type NodeAddress = NodesGetData['path'];

export const useNodesGet = (address: NodeAddress): NodeDto => {
    const {data} = useSuspenseQuery(nodesGetOptions({path: address}));
    return data;
};
