import type {FC} from 'react';

interface GraphNodeProps {
    title: string;
}

export const GraphNode: FC<GraphNodeProps> = ({title}) => {
    return (
        <div className="bg-red-500 dark:bg-green-500 p-10">I am a Node!</div>
    );
};
