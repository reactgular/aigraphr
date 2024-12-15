import {NodeEntity} from '@/projects/entities/node.entity';
import {WorkspaceEntity} from '@/projects/entities/workspace.entity';
import {ProjectParamService} from '@/projects/services/project-param.service';
import {ProjectsStorageService} from '@/projects/services/projects-storage.service';
import {Injectable, Logger, Scope} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {EntityTarget} from 'typeorm/common/EntityTarget';
import {ObjectLiteral} from 'typeorm/common/ObjectLiteral';

@Injectable({
    scope: Scope.REQUEST
})
export class ProjectDatabasesService {
    private dataSource?: DataSource;
    private readonly log = new Logger('ProjectDatabasesService');

    public constructor(
        private readonly projectsStorage: ProjectsStorageService,
        private readonly projectParam: ProjectParamService
    ) {}

    public async nodes(): Promise<Repository<NodeEntity> | null> {
        return (await this.connection()).getRepository(NodeEntity);
    }

    public async repository<Entity extends ObjectLiteral>(
        target: EntityTarget<Entity>
    ): Promise<Repository<Entity> | null> {
        return (await this.connection()).getRepository(target);
    }

    public async workspaces(): Promise<Repository<WorkspaceEntity> | null> {
        return (await this.connection()).getRepository(WorkspaceEntity);
    }

    protected async connection(): Promise<DataSource> {
        if (!this.dataSource) {
            const project = await this.projectParam.getProjectOrThrow();
            this.dataSource = new DataSource({
                type: 'sqlite',
                database: await this.projectsStorage.projectDatabase(
                    project.name
                ),
                entities: [`${__dirname}/../entities/*.entity{.ts,.js}`],
                subscribers: [
                    `${__dirname}/../subscribers/*.subscriber{.ts,.js}`
                ],
                migrationsRun: true,
                migrations: [`${__dirname}/../migrations/*{.ts,.js}`]
            });
        }
        return this.dataSource!;
    }
}
