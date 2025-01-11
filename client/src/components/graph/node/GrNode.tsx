import {GrNodeContent} from '@/components/graph/node/GrNodeContent';
import {
    GrNodeContext,
    type GrNodeType
} from '@/components/graph/node/GrNodeContext';
import {GrNodeFooter} from '@/components/graph/node/GrNodeFooter';
import {GrNodeFrame} from '@/components/graph/node/GrNodeFrame';
import {GrNodeHeader} from '@/components/graph/node/GrNodeHeader';
import {GrNodeName} from '@/components/graph/node/GrNodeName';
import type {NodeProps} from '@xyflow/react';
import type {FC} from 'react';

export const GrNode: FC<NodeProps<GrNodeType>> = (props) => {
    return (
        <div
            className="flex flex-col gap-2"
            style={{width: `${props.width}px`, height: `${props.height}px`}}
        >
            <GrNodeContext.Provider value={props}>
                <GrNodeName />
                <GrNodeFrame
                    selected={props.selected}
                    error={false}
                    active={false}
                >
                    <GrNodeHeader />
                    <GrNodeContent />
                    <GrNodeFooter />
                </GrNodeFrame>
            </GrNodeContext.Provider>
        </div>
    );
};
