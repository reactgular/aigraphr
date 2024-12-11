import {Request} from 'express';

export type ProjectId = {projectId?: string};

export interface ProjectContext {
    projectId: number;
}

export interface ProjectRequest extends Request<ProjectId> {
    context: ProjectContext;
}
