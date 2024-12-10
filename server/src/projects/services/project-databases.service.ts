import {ProjectsService} from '@/projects/services/projects.service';
import {Inject, Injectable, Logger, Scope} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import {Request} from 'express';

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
}
