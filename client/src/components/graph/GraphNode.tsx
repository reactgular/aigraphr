import {
    type GraphNodeModel,
    GraphNodeState
} from '@/components/graph/GraphNodeState';
import {cn} from '@/components/shadcn/lib/utils';
import type {FC} from 'react';

export const GraphNode: FC<GraphNodeModel> = (props) => {
    return (
        <GraphNodeState.Provider defaultValue={props}>
            <div className={cn({'bg-red-500': props.disabled})}>
                I am a Node!
            </div>
        </GraphNodeState.Provider>
    );
};
