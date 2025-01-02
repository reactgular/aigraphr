import {GrNodeBoundary} from '@/components/graph/GrNodeBoundary';
import {GrNodeContent} from '@/components/graph/GrNodeContent';
import {GrNodeFooter} from '@/components/graph/GrNodeFooter';
import {GrNodeFrame} from '@/components/graph/GrNodeFrame';
import {GrNodeHeader} from '@/components/graph/GrNodeHeader';
import {GrNodeName} from '@/components/graph/GrNodeName';
import {type NodeAddress} from '@/components/graph/useNodesGet';
import type {FC} from 'react';

interface GrNodeProps {
    address: NodeAddress;

    disabled?: boolean;

    readonly?: boolean;
}

export const GrNode: FC<GrNodeProps> = ({disabled, address, readonly}) => {
    return (
        <GrNodeBoundary className="flex flex-col gap-2">
            <GrNodeName address={address} />
            <GrNodeFrame className="w-[20rem]">
                <GrNodeHeader />
                <GrNodeContent address={address} />
                <GrNodeFooter />
            </GrNodeFrame>
        </GrNodeBoundary>
    );
};
