import {GrNodeDefIcons} from '@/components/graph/GrNodeDefIcons';
import {useGrNodeDef} from '@/components/graph/hooks/useGrNodeDef';
import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC} from 'react';

export const GrNodeIcon: FC<PropsWithClassName> = ({className}) => {
    const def = useGrNodeDef();
    const Icon = GrNodeDefIcons[def.icon] ?? GrNodeDefIcons.Cog;
    return <Icon className={cn(className)} />;
};
