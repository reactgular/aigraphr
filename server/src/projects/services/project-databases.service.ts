import {ProjectsService} from '@/projects/services/projects.service';
import {Inject, Injectable, Scope} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import {Request} from 'express';

@Injectable({
    scope: Scope.REQUEST
})
export class ProjectDatabasesService {
    public constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly projects: ProjectsService
    ) {
        // Empty
    }
}
