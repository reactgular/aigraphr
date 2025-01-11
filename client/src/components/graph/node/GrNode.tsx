import {GrNodeAddress} from '@/components/graph/context/GrNodeAddress';
import {GrNodeBoundary} from '@/components/graph/node/GrNodeBoundary';
import {GrNodeContent} from '@/components/graph/node/GrNodeContent';
import {GrNodeFooter} from '@/components/graph/node/GrNodeFooter';
import {GrNodeFrame} from '@/components/graph/node/GrNodeFrame';
import {GrNodeHeader} from '@/components/graph/node/GrNodeHeader';
import {GrNodeName} from '@/components/graph/node/GrNodeName';
import {type NodeAddress} from '@/components/hooks/useNodeDto';
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
            <GrNodeAddress.Provider value={address}>
                <GrNodeName />
                <GrNodeFrame selected={selected} error={error} active={active}>
                    <GrNodeHeader />
                    <GrNodeContent />
                    <GrNodeFooter />
                </GrNodeFrame>
            </GrNodeAddress.Provider>
        </GrNodeBoundary>
    );
};
