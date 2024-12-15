import {NodeEntity} from '@/projects/entities/node.entity';
import {WorkspaceEntity} from '@/projects/entities/workspace.entity';
import {ProjectDataSourcesService} from '@/projects/services/project-data-sources.service';
import {ProjectParamService} from '@/projects/services/project-param.service';
import {Injectable, Logger, Scope} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {EntityTarget} from 'typeorm/common/EntityTarget';
import {ObjectLiteral} from 'typeorm/common/ObjectLiteral';

@Injectable({
    scope: Scope.REQUEST
})
export class ProjectReposService {
    private dataSource?: DataSource;

    private readonly log = new Logger('ProjectReposService');

    public constructor(
        private readonly projectParam: ProjectParamService,
        private readonly projectDataSources: ProjectDataSourcesService
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
            this.dataSource = await this.projectDataSources.open(project.name);
        }
        return this.dataSource!;
    }
}
