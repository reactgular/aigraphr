import {GrNodeParams} from '@/components/graph/node/GrNodeParams';
import {useGrNodeDef} from '@/components/graph/node/useGrNodeDef';
import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC} from 'react';

export const GrNodeContent: FC<PropsWithClassName> = ({className}) => {
    const def = useGrNodeDef();

    const hasLeft = def.inputs.length > 0;
    const hasRight = def.outputs.length > 0;

    return (
        <div className={cn('flex py-2', className)}>
            {hasLeft ? (
                <GrNodeParams
                    className={hasRight ? 'w-1/2' : 'w-full'}
                    side="left"
                    params={def.inputs}
                />
            ) : null}
            {hasRight ? (
                <GrNodeParams
                    className={hasLeft ? 'w-1/2' : 'w-full'}
                    side="right"
                    params={def.outputs}
                />
            ) : null}
        </div>
    );
};
