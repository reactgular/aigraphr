import {createStateProvider} from '@/components/utils/createStateProvider';

export interface GraphNodeModel {
    /**
     * The property editor is showing for this node.
     */
    active: boolean;

    disabled?: boolean;

    name: string;

    /**
     * The node is selected in the graph view.
     */
    selected: boolean;
}

export const GrNodeState = createStateProvider<GraphNodeModel>('GraphNode');
