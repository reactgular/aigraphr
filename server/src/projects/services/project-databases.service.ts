import {WorkspaceEntity} from '@/projects/entities/workspace.entity';
import {ProjectsService} from '@/projects/services/projects.service';
import {Inject, Injectable, Logger, Scope} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import {Request} from 'express';
import {Repository} from 'typeorm';

@Injectable({
    scope: Scope.REQUEST
})
export class ProjectDatabasesService {
    private readonly log = new Logger('ProjectDatabasesService');

    public constructor(
        @Inject(REQUEST) private readonly request: Request<{projectId: string}>,
        private readonly projects: ProjectsService
    ) {
        // Empty
        this.log.debug(request.params);
    }

    public workspaces(): Repository<WorkspaceEntity> {
        throw new Error('Not implemented');
    }
}
