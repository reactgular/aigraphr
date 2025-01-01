import type {NodeDto} from '@/api';
import {createStateProvider} from '@/components/utils/createStateProvider';

export interface GraphNodeModel {
    /**
     * undefined when node is loading from server
     */
    data?: NodeDto;

    /**
     * active when node property editor is open
     */
    isActive: boolean;

    /**
     * disabled when node is not editable
     */
    isDisabled: boolean;

    /**
     * error when node is in error state
     */
    isError: boolean;

    /**
     * pending when node is loading from server
     */
    isPending: boolean;

    /**
     * readonly when node is not editable
     */
    isReadonly: boolean;

    /**
     * selected when node is selected
     */
    isSelected: boolean;

    /**
     * reason when node is in error state
     */
    reason?: string;
}

/**
 * @deprecated this can be replaced by the use of `useQuery` hook
 */
export const GrNodeState = createStateProvider<GraphNodeModel>('GraphNode');
