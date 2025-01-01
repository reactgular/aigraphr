import {nodesGetOptions} from '@/api/@tanstack/react-query.gen';
import {GrNodeContent} from '@/components/graph/GrNodeContent';
import {GrNodeFooter} from '@/components/graph/GrNodeFooter';
import {GrNodeFrame} from '@/components/graph/GrNodeFrame';
import {GrNodeHeader} from '@/components/graph/GrNodeHeader';
import {GrNodeName} from '@/components/graph/GrNodeName';
import {GrNodeState} from '@/components/graph/GrNodeState';
import {useQuery} from '@tanstack/react-query';
import type {FC} from 'react';

interface GrNodeProps {
    disabled?: boolean;

    nodeId: number;

    projectId: number;

    readonly?: boolean;

    workspaceId: number;
}

export const GrNode: FC<GrNodeProps> = ({
    disabled,
    nodeId,
    projectId,
    workspaceId,
    readonly
}) => {
    const {data, isError, isPending} = useQuery({
        ...nodesGetOptions({
            path: {
                projectId,
                workspaceId,
                nodeId
            }
        })
    });

    return (
        <GrNodeState.Provider
            defaultValue={{
                data,
                isActive: false,
                isDisabled: Boolean(disabled),
                isError,
                isPending,
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
