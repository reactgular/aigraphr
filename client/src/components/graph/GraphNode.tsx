import type {FC} from 'react';

interface GraphNodeProps {
    title: string;
}

export const GraphNode: FC<GraphNodeProps> = ({title}) => {
    return <div>I am a Node!</div>;
};
