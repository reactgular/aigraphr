import {useGrEditor} from '@/components/graph/hooks/useGrEditor';
import {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    ReactFlow,
    useEdgesState,
    useNodesState
} from '@xyflow/react';
import type {FC} from 'react';

export const GrEditorFlow: FC = () => {
    const {nodes: _nodes, edges: _edges} = useGrEditor();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
        >
            <Controls />
            <MiniMap />
            <Background color="#bbb" variant={BackgroundVariant.Dots} />
        </ReactFlow>
    );
};
