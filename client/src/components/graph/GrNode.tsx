import {GrNodeBoundary} from '@/components/graph/GrNodeBoundary';
import {GrNodeContent} from '@/components/graph/GrNodeContent';
import {GrNodeFooter} from '@/components/graph/GrNodeFooter';
import {GrNodeFrame} from '@/components/graph/GrNodeFrame';
import {GrNodeHeader} from '@/components/graph/GrNodeHeader';
import {GrNodeName} from '@/components/graph/GrNodeName';
import {type NodeAddress} from '@/components/graph/hooks/useNode';
import type {FC} from 'react';

interface GrNodeProps {
    active?: boolean;

    address: NodeAddress;

    error?: boolean;

    selected?: boolean;

    width: number;
}

export const GrNode: FC<GrNodeProps> = ({
    active,
    address,
    error,
    selected,
    width
}) => {
    return (
        <GrNodeBoundary className="flex flex-col gap-2" width={width}>
            <GrNodeName address={address} />
            <GrNodeFrame selected={selected} error={error} active={active}>
                <GrNodeHeader />
                <GrNodeContent address={address} />
                <GrNodeFooter />
            </GrNodeFrame>
        </GrNodeBoundary>
    );
};
