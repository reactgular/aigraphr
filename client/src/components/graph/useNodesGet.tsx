import type {NodesGetData} from '@/api';
import {nodesGetOptions} from '@/api/@tanstack/react-query.gen';
import {useQuery} from '@tanstack/react-query';

export type NodeAddress = NodesGetData['path'];

export const useNodesGet = (address: NodeAddress) => {
    return useQuery({...nodesGetOptions({path: address})});
};
