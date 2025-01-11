import type {EdgeDto, NodeDto, WorkspaceDto} from '@/api';

export interface GrEditorModel {
    edges: Array<EdgeDto>;

    nodes: Array<NodeDto>;

    workspace: WorkspaceDto;
}
