import {WorkspacesSchema} from '../workspaces/workspaces.schema';

export interface AppConfig {
    workspace: WorkspacesSchema | null;
}
