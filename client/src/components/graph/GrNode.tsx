import type {NodeMockDto} from '@/components/graph/GrNode.types';
import {GrNodeContent} from '@/components/graph/GrNodeContent';
import {GrNodeFooter} from '@/components/graph/GrNodeFooter';
import {GrNodeFrame} from '@/components/graph/GrNodeFrame';
import {GrNodeHeader} from '@/components/graph/GrNodeHeader';
import {GrNodeName} from '@/components/graph/GrNodeName';
import {GrNodeState} from '@/components/graph/GrNodeState';
import type {FC} from 'react';

interface GrNodeProps {
    disabled?: boolean;

    dto?: NodeMockDto;

    readonly?: boolean;
}

export const GrNode: FC<GrNodeProps> = ({disabled, dto, readonly}) => {
    return (
        <GrNodeState.Provider
            defaultValue={{
                dto,
                isActive: false,
                isDisabled: Boolean(disabled),
                isError: false,
                isPending: false,
                isReadonly: Boolean(readonly),
                isSelected: false
            }}
        >
            <div className="flex flex-col gap-2">
                <GrNodeName />
                <GrNodeFrame className="w-[20rem]">
                    <GrNodeHeader />
                    <GrNodeContent />
                    <GrNodeFooter />
                </GrNodeFrame>
            </div>
        </GrNodeState.Provider>
    );
};
