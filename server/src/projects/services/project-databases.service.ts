import {ProjectEntity} from '@/entities/project.entity';
import {WorkspaceEntity} from '@/projects/entities/workspace.entity';
import {ProjectRequest} from '@/projects/gaurds/project.request';
import {ProjectsStorageService} from '@/projects/services/projects-storage.service';
import {Inject, Injectable, Logger, Scope} from '@nestjs/common';
import {REQUEST} from '@nestjs/core';
import {DataSource, Repository} from 'typeorm';

@Injectable({
    scope: Scope.REQUEST
})
export class ProjectDatabasesService {
    private readonly log = new Logger('ProjectDatabasesService');

    private dataSource?: DataSource;

    private readonly project: ProjectEntity;

    public constructor(
        @Inject(REQUEST) request: ProjectRequest,
        private readonly projectsStorage: ProjectsStorageService
    ) {
        this.project = request.context.project;
    }

    public async workspaces(): Promise<Repository<WorkspaceEntity>> {
        return (await this.connection()).getRepository(WorkspaceEntity);
    }

    protected async connection(): Promise<DataSource> {
        if (!this.dataSource) {
            this.log.warn(__dirname);
            throw new Error('debugging');

            this.dataSource = new DataSource({
                type: 'sqlite',
                database: await this.projectsStorage.project(this.project),
                // TODO: is this __dirname correct?
                entities: [`${__dirname}/entities/*.entity{.ts,.js}`],
                subscribers: [`${__dirname}/subscribers/*.subscriber{.ts,.js}`],
                migrationsRun: true,
                migrations: [`${__dirname}/migrations/*{.ts,.js}`]
            });
        }
        return this.dataSource!;
    }
}
