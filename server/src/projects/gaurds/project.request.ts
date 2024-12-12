import {ProjectEntity} from '@/entities/project.entity';
import {Request} from 'express';

export type ProjectId = {projectId?: string};

export interface ProjectContext {
    projectId: number;

    project: ProjectEntity;
}

export interface ProjectRequest extends Request<ProjectId> {
    context: ProjectContext;
}
