import {GrNodeState} from '@/components/graph/GrNodeState';
import type {FC} from 'react';

export const GrNodeName: FC = () => {
    const {name} = GrNodeState.useState();

    return <div>{name}</div>;
};
