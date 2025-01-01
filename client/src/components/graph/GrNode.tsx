import {GrNodeFooter} from '@/components/graph/GrNodeFooter';
import {GrNodeFrame} from '@/components/graph/GrNodeFrame';
import {GrNodeHeader} from '@/components/graph/GrNodeHeader';
import {GrNodeName} from '@/components/graph/GrNodeName';
import {type GraphNodeModel, GrNodeState} from '@/components/graph/GrNodeState';
import type {FC} from 'react';

export const GrNode: FC<GraphNodeModel> = (props) => {
    return (
        <GrNodeState.Provider defaultValue={props}>
            <GrNodeName />
            <GrNodeFrame>
                <GrNodeHeader />
                CONTENTS
                <GrNodeFooter />
            </GrNodeFrame>
        </GrNodeState.Provider>
    );
};
