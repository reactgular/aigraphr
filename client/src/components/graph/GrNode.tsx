import {GrNodeFrame} from '@/components/graph/GrNodeFrame';
import {GrNodeProvider} from '@/components/graph/GrNodeProvider';
import {type GraphNodeModel, GrNodeState} from '@/components/graph/GrNodeState';
import type {FC} from 'react';

export const GrNode: FC<GraphNodeModel> = (props) => {
    return (
        <GrNodeState.Provider defaultValue={props}>
            <GrNodeProvider />
            <GrNodeFrame>CONTENTS</GrNodeFrame>
        </GrNodeState.Provider>
    );
};
