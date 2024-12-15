import {ProjectEntity} from '@/entities/project.entity';
import {ProjectsService} from '@/projects/services/projects.service';
import {BadRequestException, Inject, Injectable, Scope} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import {Request} from 'express';

function isNumeric(value: string): boolean {
    return !isNaN(parseInt(value, 10));
}

@Injectable({
    scope: Scope.REQUEST
})
export class ProjectEntityService {
    public constructor(
        @Inject(REQUEST)
        private readonly request: Request<{
            projectId?: string;
        }>,
        private readonly projects: ProjectsService
    ) {}

    public getProjectId(): number | null {
        const param = this.request.params.projectId;
        return param && isNumeric(param) ? parseInt(param, 10) : null;
    }

    public async getProjectOrThrow(): Promise<ProjectEntity> {
        const projectId = this.getProjectId();
        if (projectId) {
            return await this.projects.scaGet(projectId);
        }
        throw new BadRequestException('Project ID is required');
    }
}
