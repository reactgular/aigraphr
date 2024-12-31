import {createStateProvider} from '@/components/utils/createStateProvider';

export interface GraphNodeModel {
    disabled?: boolean;

    name: string;

    selected?: boolean;
}

export const GraphNodeState = createStateProvider<GraphNodeModel>('GraphNode');
