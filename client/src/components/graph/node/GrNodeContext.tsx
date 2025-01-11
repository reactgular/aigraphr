import type {NodeDto} from '@/api';
import type {Node, NodeProps} from '@xyflow/react';
import {createContext} from 'react';

export type GrNodeType = Node<NodeDto, 'GrNode'>;

const GrNodeContext = createContext<NodeProps<GrNodeType> | null>(null);
GrNodeContext.displayName = 'GrNodeContext';

export {GrNodeContext};
