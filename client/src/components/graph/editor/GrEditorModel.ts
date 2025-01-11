import type {EdgeDto, WorkspaceDto} from '@/api';
import type {GrNodeType} from '@/components/graph/node/GrNodeContext';

export interface GrEditorModel {
    edges: Array<EdgeDto>;

    nodes: Array<GrNodeType>;

    workspace: WorkspaceDto;
}
