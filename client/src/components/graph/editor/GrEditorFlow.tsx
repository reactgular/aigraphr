import {useGrEditor} from '@/components/graph/editor/useGrEditor';
import {GrNode} from '@/components/graph/node/GrNode';
import {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    type NodeTypes,
    ReactFlow,
    useEdgesState,
    useNodesState
} from '@xyflow/react';
import type {FC} from 'react';

const nodeTypes: NodeTypes = {GrNode};

export const GrEditorFlow: FC = () => {
    const {nodes: _nodes, edges: _edges} = useGrEditor();
    const [nodes, setNodes, onNodesChange] = useNodesState(_nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    return (
        <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
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
